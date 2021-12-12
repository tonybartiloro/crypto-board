export const deleteUserAssetDelete = async ({ client, cancelToken, symbol }) =>
	await client.delete(`api/user-asset-delete`, {
		cancelToken,
		params: {
			symbol,
		},
	});

deleteUserAssetDelete.key = "userassetdelete";
