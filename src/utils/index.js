export const isServerSide = () => typeof window === "undefined";
export const isClientSide = () => typeof window !== "undefined";

export const formatResponseError = (error) => {
	const responseError = error?.response?.data?.error;

	if (responseError) {
		const formattedError = new Error(responseError?.message);
		Object.keys(responseError).forEach((prop) => {
			formattedError[prop] = responseError[prop];
		});
		return formattedError;
	}
	const unexpectedError = new Error("Unexpected Error");
	return unexpectedError;
};

export const formatPrice = (price) =>
	new Intl.NumberFormat("en-US", {
		maximumFractionDigits: 2,
	}).format(price);

export const formatAssetAmount = (amount) =>
	new Intl.NumberFormat("en-US", {
		maximumFractionDigits: 10,
	}).format(amount);


export const sleep = (ms) => {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
};