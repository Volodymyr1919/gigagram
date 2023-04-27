import React from "react";

export default function NotFound() {

    const svgContainer = document.getElementById('svgContainer');
    const animItem = bodymovin.loadAnimation({
        wrapper: svgContainer,
        animType: 'svg',
        loop: true,
        animationData: JSON.parse(animationData)
        });

    return(
        <div className="NFPage">
            {/* <p>Sorry, page not found</p> */}
            <div id="svgContainer">{animItem}</div>
        </div>
    );
}