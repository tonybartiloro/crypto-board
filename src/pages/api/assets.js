import { firestoreDb } from "../../firebase/";
const handler = async (req, res) => {
	try {
		// get all assets
		const assets = (await firestoreDb.collection("assets").get()).docs.map((doc) => {
			return doc.data();
		});

		return res.status(200).json(assets);
	} catch (error) {
		return res.status(500).send(error.message);
	}
};

export default handler;
