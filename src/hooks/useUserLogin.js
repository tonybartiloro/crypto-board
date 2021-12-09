import { useApiAction } from "./";
import { postUserLogin } from "../api/user-login";

const useUserLogin = ({ options = {} } = {}) => {
	const { action, loading, error } = useApiAction({
		method: postUserLogin,
	});

	return {
		action,
		loading,
		error,
	};
};

export default useUserLogin;
