import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import Link from "next/link";

const Navigation = () => {
	return (
		<List>
			<Link href="/" passHref>
				<ListItem button>
					<ListItemIcon>
						<DashboardIcon />
					</ListItemIcon>
					<ListItemText primary="Dashboard" />
				</ListItem>
			</Link>
			<Link href="/wallet" passHref>
				<ListItem button>
					<ListItemIcon>
						<AccountBalanceWalletIcon />
					</ListItemIcon>
					<ListItemText primary="Wallet" />
				</ListItem>
			</Link>
		</List>
	);
};

export default Navigation;
