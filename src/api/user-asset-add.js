export const postUserAssetAdd = async ({ client, cancelToken, symbol, amount }) =>
	await client.post(`api/user-asset-add`, {
		cancelToken,
		params: {
			symbol,
			amount,
		},
	});

postUserAssetAdd.key = "userassetadd";
