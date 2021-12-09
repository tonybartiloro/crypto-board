import { useUserContext } from "../../contexts";

const RequireAuthAdmin = ({ children }) => {
	const { role } = useUserContext();
	return role === "admin" ? children : null;
};

export default RequireAuthAdmin;
