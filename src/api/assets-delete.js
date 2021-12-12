export const deleteAssetsDelete = async ({ client, cancelToken, symbol }) =>
	await client.delete(`api/assets-delete`, {
		cancelToken,
		params: {
			symbol,
		},
	});

deleteAssetsDelete.key = "assetsdelete";
