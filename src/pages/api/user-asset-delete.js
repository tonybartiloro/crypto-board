import { firestoreDb, firestoreFieldPath } from "../../firebase/";
const handler = async (req, res) => {
	try {
		const { symbol } = req.query || {};

		const userId = req.headers.userid;
		const userDocRef = firestoreDb.collection("users").doc(userId);
		const assetDocSnapshot = (await firestoreDb.collection("assets").where("symbol", "==", symbol).get()).docs[0];

		const userAssetSnapshot = (
			await firestoreDb.collection("users_assets").where("assetId", "==", assetDocSnapshot.ref).where("userId", "==", userDocRef).get()
		).docs[0];

		const deletedData = userAssetSnapshot.data();

		await userAssetSnapshot.ref.delete();

		return res.status(200).json(deletedData);
	} catch (error) {
		return res.status(500).send(error.message);
	}
};

export default handler;
