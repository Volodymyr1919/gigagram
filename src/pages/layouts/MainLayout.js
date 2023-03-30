import React from "react";
import { Outlet } from "react-router-dom";
import HeaderMain from "../partial/Header";

const Layout = () => {
    return(
        <>
            <HeaderMain />
            <Outlet />
        </>
    );
};

export default Layout;