export const postUserAssetsEdit = async ({ client, cancelToken, assets }) =>
	await client.post(`api/user-assets-edit`, {
		cancelToken,
		params: {
			assets,
		},
	});

postUserAssetsEdit.key = "userassetsedit";
