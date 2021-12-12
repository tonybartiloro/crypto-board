import { firestoreDb } from "../../firebase/";
const handler = async (req, res) => {
	try {
		const { symbol } = req.query || {};

		const assetDocSnapshot = (await firestoreDb.collection("assets").where("symbol", "==", symbol).get()).docs[0];

		const deletedData = assetDocSnapshot.data();

		await assetDocSnapshot.ref.delete();

		return res.status(200).json(deletedData);
	} catch (error) {
		return res.status(500).send(error.message);
	}
};

export default handler;
