import { useCallback } from "react";
import { formatResponseError } from "../utils";
import { useApiActionState } from "./";

// TODO: manage swrCacheKeysToBeInvalidated
// eslint-disable-next-line no-unused-vars
const useApiAction = ({ method, swrCacheKeysToBeInvalidated = [] }) => {
	const { loading, setLoading, error, setError, client } = useApiActionState();

	const action = useCallback(
		async (args = {}) => {
			setLoading(true);

			try {
				const { data } = await method({ client, ...args });
				setError(undefined);
				setLoading(false);
				return data;
			} catch (err) {
				setError(formatResponseError(err));
				setLoading(false);
				return false;
			}
		},
		[client, method, setLoading, setError]
	);

	return { action, loading, error };
};

export default useApiAction;
