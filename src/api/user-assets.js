export const getUserAssets = async ({ client, cancelToken }) =>
	await client.get(`api/user-assets`, {
		cancelToken,
		params: {},
	});
