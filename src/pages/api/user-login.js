import { firestoreDb, firestoreFieldPath } from "../../firebase/";
const handler = async (req, res) => {
	try {
		const username = req.body?.params?.username;
		let userDocSnapshot = (await firestoreDb.collection("users").where("username", "==", username).get()).docs[0];

		let userData = { userId: null };

		if (userDocSnapshot) {
			userData = {
				userId: userDocSnapshot.id,
				...userDocSnapshot.data(),
			};
		}
		return res.status(200).json(userData);
	} catch (error) {
		return res.status(500).send(error.message);
	}
};

export default handler;
