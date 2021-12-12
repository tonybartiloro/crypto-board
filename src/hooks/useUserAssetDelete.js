import { useApiAction } from "./";
import { deleteUserAssetDelete } from "../api/user-asset-delete";

const useUserAssetDelete = ({ options = {} } = {}) => {
	const { action, loading, error } = useApiAction({
		method: deleteUserAssetDelete,
	});

	return {
		action,
		loading,
		error,
	};
};

export default useUserAssetDelete;
