import { useApi } from "./";
import { getCurrencies } from "../api/currencies";

const useCurrencies = ({ options = {} } = {}) => {
	const {
		data = [],
		error,
		isValidating,
		mutate,
		cancel,
		cancelled,
	} = useApi({
		method: getCurrencies,
		options,
	});

	return {
		currencies: data,
		loading: isValidating,
		error,
		mutate,
		cancel,
		cancelled,
	};
};

export default useCurrencies;
