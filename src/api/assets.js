export const getAssets = async ({ client, cancelToken }) =>
	await client.get(`api/assets`, {
		cancelToken,
		params: {},
	});

getAssets.key = "assets";
