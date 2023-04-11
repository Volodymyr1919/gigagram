import * as React       from "react";
// import logo from '../../../../assets/img/logo.png'
import { NavLink } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: '#F8B819',
      darker: '#053e85',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});

function Navigation() {
  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="static" theme={theme}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Gigagram
          </Typography>
          <Button component={NavLink} to="/signin" color="inherit">Sign In</Button>
          <Button component={NavLink} to="/signup" color="inherit">Sign Up</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navigation;

