export const getSyncData = async ({ client, cancelToken, assets, symbolsTo }) =>
	await client.get(`api/sync-data`, {
		cancelToken,
		params: {
			assets,
			symbolsTo,
		},
	});

getSyncData.key = "syncdata";
