import { createClient } from "../../api/client";
import { decorateClient, getCryptocurrencyInfo, getToolsPriceConversion } from "../../api/coinmarketcap";
import { firestoreDb, firestoreTimestamp } from "../../firebase/";

const decorateCryptocurrencyInfoResponse = (data) =>
	Object.keys(data).map((key) => ({
		symbol: key,
		logo: data[key].logo,
		name: data[key].name,
		coinmarketcapId: data[key].id,
	}));

/* .reduce((obj, item) => {
			return {
				...obj,
				[item["symbol"]]: { logo: item.logo, name: item.name },
			};
		}, {}); */

const decorateToolsPriceConversionResponse = ({ last_updated, quote }) => ({
	lastUpdated: last_updated,
	currency: Object.keys(quote)[0],
	price: quote[Object.keys(quote)[0]].price,
});
/* .reduce((obj, item) => {
					return {
						...obj,
						[item["symbol"]]: item.price,
					};
				}, {}), */

const handler = async (req, res) => {
	try {
		const assets = req.query["assets[]"].map((item) => JSON.parse(item)); // TODO: check with 1 assets
		const assetSymbols = assets.filter(({ coinmarketcapId }) => !coinmarketcapId);
		const assetCoinmarketcapIds = assets.filter(({ coinmarketcapId }) => coinmarketcapId > 0);

		const symbolsTo = Array.isArray(req.query["symbolsTo[]"]) ? req.query["symbolsTo[]"] : [req.query["symbolsTo[]"]];

		const client = decorateClient(createClient());

		const infoDataSymbols =
			assetSymbols.length > 0
				? decorateCryptocurrencyInfoResponse(
						(
							await getCryptocurrencyInfo({
								client,
								symbols: assetSymbols.map(({ symbol }) => symbol),
							})
						).data.data
				  )
				: [];

		const infoDataCoinmarketcapIds =
			assetCoinmarketcapIds.length > 0
				? decorateCryptocurrencyInfoResponse(
						(
							await getCryptocurrencyInfo({
								client,
								ids: assetCoinmarketcapIds.map(({ coinmarketcapId }) => coinmarketcapId),
							})
						).data.data
				  )
				: [];

		const infoData = [...infoDataSymbols, ...infoDataCoinmarketcapIds];

		const syncedData = [];

		for (const asset of infoData) {
			const pricesData = [];
			for (const indexSymboslTo in symbolsTo) {
				// avoid Your plan is limited to 1 convert options
				try {
					const priceData = decorateToolsPriceConversionResponse(
						(
							await getToolsPriceConversion({
								client,
								amount: 1,
								//symbol: asset.symbol,
								id: asset.coinmarketcapId,
								convert: symbolsTo[indexSymboslTo],
							})
						).data.data
					);

					pricesData.push(priceData);
				} catch (error) {
					prices.push({
						lastUpdated: null,
						currency: symbolsTo[indexSymboslTo],
						price: null,
					});
				}

			}

			syncedData.push({
				symbol: assets.find(({ coinmarketcapId }) => coinmarketcapId === asset.coinmarketcapId)?.symbol || asset.symbol,
				name: asset.name,
				logo: asset.logo,
				prices: pricesData,
			});
		}

		for (const indexAssetInfo in syncedData) {
			// update assets info
			let assetDocSnapshot = (await firestoreDb.collection("assets").where("symbol", "==", syncedData[indexAssetInfo].symbol).get()).docs[0];

			const { name, logo, symbol } = syncedData[indexAssetInfo];
			const type = "crypto";
			const updatedInfoData = {
				symbol,
				name,
				logo,
				type,
			};
			if (assetDocSnapshot) {
				// document exists
				await assetDocSnapshot.ref.update(updatedInfoData);
			} else {
				assetDocSnapshot = await firestoreDb.collection("assets").add(updatedInfoData);
			}

			for (const indexPriceInfo in syncedData[indexAssetInfo].prices) {
				try {
					const { currency, lastUpdated, price } = syncedData[indexAssetInfo].prices[indexPriceInfo];

					const priceDocSnapshot = (
						await firestoreDb
							.collection("assets_prices")
							.where("assetId", "==", assetDocSnapshot.ref)
							.where("currency", "==", currency)
							.get()
					).docs[0];

					const updatedPriceData = {
						price,
						currency,
						lastUpdated: firestoreTimestamp.fromDate(new Date(lastUpdated)),
						assetId: assetDocSnapshot.ref,
					};

					if (priceDocSnapshot) {
						// document exists

						await priceDocSnapshot.ref.update(updatedPriceData);
					} else {
						await firestoreDb.collection("assets_prices").add(updatedPriceData);
					}
				} catch (error) {
					console.log(error);
				}
			}
		}

		return res.status(200).json(syncedData);
	} catch (error) {
		return res.status(500).send(error.message);
	}
};

export default handler;
