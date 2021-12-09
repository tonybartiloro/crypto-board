import { useApi } from "./";
import { getAssets } from "../api/assets";

const useAssets = ({ options = {} } = {}) => {
	const {
		data = [],
		error,
		isValidating,
		mutate,
		cancel,
		cancelled,
	} = useApi({
		method: getAssets,
		options,
	});

	return {
		assets: data,
		loading: isValidating,
		error,
		mutate,
		cancel,
		cancelled,
	};
};

export default useAssets;
