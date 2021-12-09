import { useUserContext } from "../../contexts";

const RequireAuth = ({ children }) => {
	const { userId } = useUserContext();
	return userId ? children : null;
};

export default RequireAuth;
