export const getCoinmarketcapHost = () => process.env.COINMARKETCAP_HOST;
export const getCoinmarketcapApiKey = () => process.env.COINMARKETCAP_API_KEY;

export const decorateClient = (client) => {
	client.defaults.headers["X-CMC_PRO_API_KEY"] = getCoinmarketcapApiKey();
	client.defaults.baseURL = getCoinmarketcapHost();
	return client;
};

export const decorateErrorResponse = (res, err) => {
	return res.status(err.response.status).json({ status: err.response.status, message: err.response?.data?.status?.error_message });
};

export const decorateSuccessResponse = (res, data, decorator) => {
	return res.status(data.status).json(decorator ? decorator(data.data.data) : data.data.data);
};

export const getToolsPriceConversion = async ({ client, cancelToken, amount, symbol, time, convert }) =>
	await client.get(`/v1/tools/price-conversion`, {
		cancelToken,
		params: {
			amount,
			symbol,
			time,
			convert,
		},
	});

export const getCryptocurrencyInfo = async ({ client, cancelToken, symbol }) =>
	await client.get(`/v1/cryptocurrency/info`, {
		cancelToken,
		params: {
			symbol,
		},
	});

export const getCryptocurrencyMap = async ({ client, cancelToken }) =>
	await client.get(`/v1/cryptocurrency/map`, {
		cancelToken,
		params: {},
	});
