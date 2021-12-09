import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PersonIcon from "@mui/icons-material/Person";
import IconButton from "@mui/material/IconButton";
import { useUserContext } from "../../contexts";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Logout from "@mui/icons-material/Logout";
import { useState } from "react";
import RequireAuth from "../hocs/requireAuth";
import NotRequireAuth from "../hocs/notRequireAuth";
import LoginForm from "./loginForm";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

const ContextMenu = () => {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = !!anchorEl;
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const { userId, username, onLogout } = useUserContext();

	return (
		<>
			<IconButton onClick={handleClick} color="inherit">
				{userId ? <PersonIcon /> : <PersonOutlineIcon />}
			</IconButton>
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				//onClick={handleClose}
				PaperProps={{
					elevation: 0,
					sx: {
						overflow: "visible",
						filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
						mt: 1.5,
						"& .MuiAvatar-root": {
							width: 32,
							height: 32,
							ml: -0.5,
							mr: 1,
						},
						"&:before": {
							content: '""',
							display: "block",
							position: "absolute",
							top: 0,
							right: 14,
							width: 10,
							height: 10,
							bgcolor: "background.paper",
							transform: "translateY(-50%) rotate(45deg)",
							zIndex: 0,
						},
					},
				}}
				transformOrigin={{ horizontal: "right", vertical: "top" }}
				anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
			>
				<NotRequireAuth>
					<LoginForm afterLogin={handleClose} />
				</NotRequireAuth>
				<RequireAuth>
					<Typography component="p" variant="body1" p={2}>
						{username}
					</Typography>
					<Divider />
					<MenuItem
						onClick={() => {
							onLogout();
							handleClose();
						}}
					>
						<ListItemIcon>
							<Logout fontSize="small" />
						</ListItemIcon>
						Logout
					</MenuItem>
				</RequireAuth>
			</Menu>
		</>
	);
};

export default ContextMenu;
