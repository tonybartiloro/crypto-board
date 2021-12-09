import { useMemo } from "react";
import { createClient } from "../api/client";
import { useUserContext } from "../contexts";

const useClient = () => {
	const { userId } = useUserContext();

	const client = useMemo(() => {
		const client = createClient({
			headers: { userId },
			baseURL: process.env.NEXT_PUBLIC_BH_PROXY_API_PATH_TO_EXPOSE,
		});

		return client;
	}, [userId]);

	return client;
};

export default useClient;
