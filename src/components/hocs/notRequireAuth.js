import { useUserContext } from "../../contexts";

const NotRequireAuth = ({ children }) => {
	const { userId } = useUserContext();
	return userId ? null : children;
};

export default NotRequireAuth;
