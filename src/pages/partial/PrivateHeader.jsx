import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Tooltip,
  MenuItem,
} from "@mui/material/";
import headerStyle from "./headermain.scss";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteAcc from "./modal/DeleteAcc";
import logoH from "../../assets/img/logoWhite.png";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import { useStores } from "../../stores/MainStore";
import SearchModal from "./modal/SearchModal";
import SearchIcon from '@mui/icons-material/Search';

const PrivateHeader = observer(() => {
  const { RequestsStore, ConfigStore } = useStores();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  React.useEffect(() => {
    new Promise((resolve, rejects) => {
      resolve();
    })
      .then(() => {
        return RequestsStore.doGet(ConfigStore.url + "/me");
      })
      .then((me) => {
        if (me === "Forbidden") {
          ConfigStore.setErr("Token has been burned");
          ConfigStore.setIsShow(true);
        } else {
          ConfigStore.setMe(me);
        }
      });
  }, []);


  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate();

  const logout = () => {
    handleCloseUserMenu();
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <AppBar
      className="header"
      position="static"
      sx={{ backgroundColor: "white" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <figure className="header__logo" onClick={() => navigate("/feed")}>
            <img src={logoH} alt="" />
          </figure>

          <Box sx={{ flexGrow: 0 }}>
            <span className="search" onClick={() => ConfigStore.setIsShowSearchModal(true)}>
              <SearchIcon />
            </span>
            <SearchModal />
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt=""
                  src={ConfigStore.me.avatar}
                  style={{ background: "#D9D9D9" }}
                />
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem
                component={NavLink}
                to="/my-page"
                onClick={handleCloseUserMenu}
              >
                <Typography textAlign="center">
                  Account{" "}
                  <span style={{ marginLeft: "10px" }}>
                    <AccountCircleIcon />
                  </span>
                </Typography>
              </MenuItem>
              <MenuItem onClick={logout}>
                <Typography textAlign="center">
                  Logout{" "}
                  <span style={{ marginLeft: "21px" }}>
                    <LogoutIcon />
                  </span>{" "}
                </Typography>
              </MenuItem>
              <MenuItem>
                <Typography textAlign="center" style={{ color: "red" }}>
                  <DeleteAcc sx={{ m: 2 }} />
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
});
export default PrivateHeader;
