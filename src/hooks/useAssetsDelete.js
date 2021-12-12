import { useApiAction } from "./";
import { deleteAssetsDelete } from "../api/assets-delete";

const useAssetsDelete = ({ options = {} } = {}) => {
	const { action, loading, error } = useApiAction({
		method: deleteAssetsDelete,
	});

	return {
		action,
		loading,
		error,
	};
};

export default useAssetsDelete;
