import { createClient } from "../../api/client";
import { decorateClient, getCryptocurrencyMap } from "../../api/coinmarketcap";

const handler = async (req, res) => {
	const client = decorateClient(createClient());

	const infoData = (
		await getCryptocurrencyMap({
			client,
		})
	).data.data;

	return res.status(200).json(infoData);
};

export default handler;
