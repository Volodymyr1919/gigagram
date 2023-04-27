import React from "react";
import notFoundStyle from './notFound.scss';
import logoH from "../../../assets/img/logoWhite.png";

export default function NotFound() {
    return(
        <div className="nfmain">
            <figure className="nf-figure">
                <img src={logoH} alt="" />
                <p className="not-found"> page not found </p>
            </figure>
            <div className="tipsiz">
                <div className="tipsiz-body">
                    <div className="left-arm arm"></div>
                    <div className="face">
                        <div className="upper-face">
                            <div className="element">4</div>
                            <div className="element" style={{color: "red"}}>0</div>
                            <div className="element">4</div>
                        </div>
                        <div className="mouth"></div>
                    </div>
                    <div className="right-arm arm"></div>
                </div>
            </div>
            <p className="goBack"> maybe you want to go <a href='/' className="aNF">back? </a></p>
        </div>
    );
}