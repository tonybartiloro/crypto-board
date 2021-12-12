import { useApiAction } from "./";
import { postAssetsAdd } from "../api/assets-add";

const useAssetsAdd = ({ options = {} } = {}) => {
	const { action, loading, error } = useApiAction({
		method: postAssetsAdd,
	});

	return {
		action,
		loading,
		error,
	};
};

export default useAssetsAdd;
