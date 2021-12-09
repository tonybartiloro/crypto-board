import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MuiAppBar from "@mui/material/AppBar";
import CurrencySelect from "../misc/currencySelect";
import SyncData from "../misc/syncData";
import { styled } from "@mui/material/styles";

const drawerWidth = 240;

const StyledAppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(["width", "margin"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const AppBar = ({ open, onOpenDrawer }) => {
	return (
		<StyledAppBar position="absolute" open={open}>
			<Toolbar
				sx={{
					pr: "24px",
				}}
			>
				<IconButton
					edge="start"
					color="inherit"
					onClick={onOpenDrawer}
					sx={{
						marginRight: "36px",
						...(open && { display: "none" }),
					}}
				>
					<MenuIcon />
				</IconButton>
				<Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
					Crypto Board
				</Typography>
				<CurrencySelect />
				<SyncData />
			</Toolbar>
		</StyledAppBar>
	);
};

export default AppBar;
