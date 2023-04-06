import React from "react";
import { Outlet } from "react-router-dom";
import PrivateHeader from "../partial/PrivateHeader";

const PrivateLayout = () => {
    return(
        <>
            <PrivateHeader />
            <Outlet />
        </>
    );
};

export default PrivateLayout;