export const getCurrencies = async ({ client, cancelToken }) =>
	await client.get(`api/currencies`, {
		cancelToken,
		params: {},
	});

getCurrencies.key = "currencies";
