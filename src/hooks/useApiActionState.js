import { useState } from "react";
import { useClient } from "./";

const useApiActionState = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState();
	const client = useClient();

	return { loading, setLoading, error, setError, client };
};

export default useApiActionState;
