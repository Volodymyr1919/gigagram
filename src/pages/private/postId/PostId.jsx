import React from "react";
import { useParams } from "react-router-dom";

export default function PostId() {

    let { id } = useParams();

    return(
        <>
            <p>Post:{id}</p>
        </>
    );
}