import { firestoreDb } from "../../firebase/";
const handler = async (req, res) => {
	try {
		const { symbol, type } = req.body?.params || {};

		const assetData = {
			symbol,
			type,
		};

		await firestoreDb.collection("assets").add(assetData);

		return res.status(200).json(assetData);
	} catch (error) {
		return res.status(500).send(error.message);
	}
};

export default handler;
