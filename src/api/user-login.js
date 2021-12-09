export const postUserLogin = async ({ client, cancelToken, username }) =>
	await client.post(`api/user-login`, {
		cancelToken,
		params: {
			username,
		},
	});

postUserLogin.key = "userlogin";
