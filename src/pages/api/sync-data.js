import { createClient } from "../../api/client";
import { decorateClient, decorateSuccessResponse, getCryptocurrencyInfo, getToolsPriceConversion } from "../../api/coinmarketcap";
import { firestoreDb, firestoreFieldPath, firestoreTimestamp } from "../../firebase/";

const decorateCryptocurrencyInfoResponse = (data) =>
	Object.keys(data).map((key) => ({
		symbol: key,
		logo: data[key].logo,
		name: data[key].name,
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
		const symbols = req.query["symbols[]"];
		const symbolsTo = Array.isArray(req.query["symbolsTo[]"]) ? req.query["symbolsTo[]"] : [req.query["symbolsTo[]"]];

		const client = decorateClient(createClient());

		const infoData = decorateCryptocurrencyInfoResponse(
			(
				await getCryptocurrencyInfo({
					client,
					symbol: Array.isArray(symbols) ? symbols?.join(",") : symbols,
				})
			).data.data
		);

		const syncedData = [];

		for (const asset of infoData) {
			const pricesData = [];
			for (const indexSymboslTo in symbolsTo) {
				// avoid Your plan is limited to 1 convert options
				const priceData = decorateToolsPriceConversionResponse(
					(
						await getToolsPriceConversion({
							client,
							amount: 1,
							symbol: asset.symbol,
							convert: symbolsTo[indexSymboslTo],
						})
					).data.data
				);

				pricesData.push(priceData);
			}

			syncedData.push({
				symbol: asset.symbol,
				name: asset.name,
				logo: asset.logo,
				prices: pricesData,
			});
		}

		/* const syncedData = [
			{
				symbol: "ADA",
				name: "Cardano",
				logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/2010.png",
				prices: [
					{ lastUpdated: "2021-12-08T17:08:12.000Z", currency: "USD", price: 1.391892103251679 },
					{ lastUpdated: "2021-12-08T17:08:12.000Z", currency: "EUR", price: 1.22854521358247 },
				],
			},
			{
				symbol: "BNB",
				name: "Binance Coin",
				logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png",
				prices: [
					{ lastUpdated: "2021-12-08T17:08:10.000Z", currency: "USD", price: 591.6605953228694 },
					{ lastUpdated: "2021-12-08T17:08:10.000Z", currency: "EUR", price: 522.2256744981566 },
				],
			},
			{
				symbol: "BTC",
				name: "Bitcoin",
				logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
				prices: [
					{ lastUpdated: "2021-12-08T17:08:02.000Z", currency: "USD", price: 77495.58073460581 },
					{ lastUpdated: "2021-12-08T17:09:02.000Z", currency: "EUR", price: 44540.78667965182 },
				],
			},
			{
				symbol: "EOS",
				name: "EOS",
				logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/1765.png",
				prices: [
					{ lastUpdated: "2021-12-08T17:09:18.000Z", currency: "USD", price: 3.7263626360366304 },
					{ lastUpdated: "2021-12-08T17:09:18.000Z", currency: "EUR", price: 3.2881423900387245 },
				],
			},
			{
				symbol: "ETH",
				name: "Ethereum",
				logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
				prices: [
					{ lastUpdated: "2021-12-08T17:09:02.000Z", currency: "USD", price: 4408.182654801116 },
					{ lastUpdated: "2021-12-08T17:09:02.000Z", currency: "EUR", price: 3889.780374596507 },
				],
			},
			{
				symbol: "LUNA",
				name: "Terra",
				logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/4172.png",
				prices: [
					{ lastUpdated: "2021-12-08T17:09:03.000Z", currency: "USD", price: 70.67009850078585 },
					{ lastUpdated: "2021-12-08T17:09:03.000Z", currency: "EUR", price: 62.35929491709348 },
				],
			},
			{
				symbol: "MATIC",
				name: "Polygon",
				logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png",
				prices: [
					{ lastUpdated: "2021-12-08T17:09:17.000Z", currency: "USD", price: 2.496828434443888 },
					{ lastUpdated: "2021-12-08T17:09:17.000Z", currency: "EUR", price: 2.2032014105532878 },
				],
			},
		]; */

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
					console.log("symbol", symbol);
					console.log("currency", currency);
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
