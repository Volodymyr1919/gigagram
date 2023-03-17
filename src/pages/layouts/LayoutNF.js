import React from "react";
import { Outlet } from "react-router-dom";

const LayoutNF = () => {
    return(
        <>
            <Outlet />
        </>
    );
};

export default LayoutNF;