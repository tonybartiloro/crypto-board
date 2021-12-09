import { useApiAction } from "./";
import { getSyncData } from "../api/sync-data";

const useSyncData = () => {
	const { action, loading, error } = useApiAction({
		method: getSyncData,
	});

	return {
		action,
		loading,
		error,
	};
};

export default useSyncData;
