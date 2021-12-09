import { firestoreDb, firestoreFieldPath } from "../../firebase/";
const handler = async (req, res) => {
	try {
		const userId = req.headers.userid;
		const userDocRef = firestoreDb.collection("users").doc(userId);

		// get user assets
		const userAssets = (await firestoreDb.collection("users_assets").where("userId", "==", userDocRef).get()).docs.map((doc) => {
			return doc.data();
		});

		// decorate with asset data and price
		const assets = [];
		for (const userAsset of userAssets) {
			const assetDocSnapshot = (await firestoreDb.collection("assets").where(firestoreFieldPath.documentId(), "==", userAsset.assetId).get())
				.docs[0];

			const assetData = {
				assetDoc: assetDocSnapshot.ref,
				amount: userAsset.amount,
				...assetDocSnapshot.data(),
				hex: `#${(Math.random() * 0xfffff * 1000000).toString(16).slice(0, 6)}`,
			};

			const assetPrices = (await firestoreDb.collection("assets_prices").where("assetId", "==", assetData.assetDoc).get()).docs.map((doc) => {
				return { ...doc.data(), ...{ lastUpdated: doc.data().lastUpdated.toDate() } };
			});

			assets.push({ ...assetData, ...{ prices: assetPrices } });
		}

		return res.status(200).json(assets);
	} catch (error) {
		return res.status(500).send(error.message);
	}
};

export default handler;
