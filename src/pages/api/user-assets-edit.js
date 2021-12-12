import { firestoreDb } from "../../firebase/";
const handler = async (req, res) => {
	try {
		const { assets } = req?.body?.params;

		const userId = req.headers.userid;
		const userDocRef = firestoreDb.collection("users").doc(userId);

		const assetSymbols = Object.keys(assets);

		for (const assetKeyIndex in assetSymbols) {
			const symbol = assetSymbols[assetKeyIndex];

			const assetDocSnapshot = (await firestoreDb.collection("assets").where("symbol", "==", symbol).get()).docs[0];

			const userAssetSnapshot = (
				await firestoreDb.collection("users_assets").where("assetId", "==", assetDocSnapshot.ref).where("userId", "==", userDocRef).get()
			).docs[0];

			const updatedData = {
				amount: assets[symbol],
			};

			await userAssetSnapshot.ref.update(updatedData);
		}

		return res.status(200).json(assets);
	} catch (error) {
		return res.status(500).send(error.message);
	}
};

export default handler;
