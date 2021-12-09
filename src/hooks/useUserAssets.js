import { useApi } from "./";
import { getUserAssets } from "../api/user-assets";

const useUserAssets = ({ options = {} } = {}) => {
	const {
		data = [],
		error,
		isValidating,
		mutate,
		cancel,
		cancelled,
	} = useApi({
		method: getUserAssets,
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

export default useUserAssets;
