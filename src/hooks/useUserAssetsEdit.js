import { useApiAction } from "./";
import { postUserAssetsEdit } from "../api/user-assets-edit";

const useUserAssetsEdit = ({ options = {} } = {}) => {
	const { action, loading, error } = useApiAction({
		method: postUserAssetsEdit,
	});

	return {
		action,
		loading,
		error,
	};
};

export default useUserAssetsEdit;
