export const getSyncData = async ({ client, cancelToken, symbols, symbolsTo }) =>
	await client.get(`api/sync-data`, {
		cancelToken,
		params: {
			symbols,
			symbolsTo,
		},
	});
