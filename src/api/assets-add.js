export const postAssetsAdd = async ({ client, cancelToken, symbol, type }) =>
	await client.post(`api/assets-add`, {
		cancelToken,
		params: {
			symbol,
			type,
		},
	});

postAssetsAdd.key = "assetadd";
