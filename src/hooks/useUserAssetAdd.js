import { useApiAction } from "./";
import { postUserAssetAdd } from "../api/user-asset-add";

const useUserAssetAdd = ({ options = {} } = {}) => {
	const { action, loading, error } = useApiAction({
		method: postUserAssetAdd,
	});

	return {
		action,
		loading,
		error,
	};
};

export default useUserAssetAdd;
