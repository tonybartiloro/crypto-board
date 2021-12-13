import { firestoreDb } from "../../firebase/";
const handler = async (req, res) => {
	try {
		const assetsPrices = [];
		// get all assets
		const assets = (await firestoreDb.collection("assets").get()).docs.map((doc) => {
			return { assetDoc: doc.ref, ...doc.data() };
		});

		for (const asset of assets) {
			const assetPrices = (await firestoreDb.collection("assets_prices").where("assetId", "==", asset.assetDoc).get()).docs.map((doc) => {
				return { ...doc.data(), ...{ lastUpdated: doc.data().lastUpdated.toDate() } };
			});

			assetsPrices.push({ ...asset, ...{ prices: assetPrices } });
		}

		return res.status(200).json(assetsPrices);
	} catch (error) {
		return res.status(500).send(error.message);
	}
};

export default handler;
