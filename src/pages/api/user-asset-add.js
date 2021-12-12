import { firestoreDb, firestoreFieldPath } from "../../firebase/";
const handler = async (req, res) => {
	try {
		const { symbol, amount } = req.body?.params || {};

		const userId = req.headers.userid;
		const userDocRef = firestoreDb.collection("users").doc(userId);
		const assetDocSnapshot = (await firestoreDb.collection("assets").where("symbol", "==", symbol).get()).docs[0];

		const userAssetData = {
			userId: userDocRef,
			assetId: assetDocSnapshot.ref,
			amount: amount,
		};

		await firestoreDb.collection("users_assets").add(userAssetData);

		return res.status(200).json(userAssetData);
	} catch (error) {
		return res.status(500).send(error.message);
	}
};

export default handler;
