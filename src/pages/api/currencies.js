import { firestoreDb } from "../../firebase/";
const handler = async (req, res) => {
	try {
		// get all currencies
		const currencies = (await firestoreDb.collection("currencies").get()).docs.map((doc) => {
			return doc.data();
		});

		return res.status(200).json(currencies);
	} catch (error) {
		return res.status(500).send(error.message);
	}
};

export default handler;
