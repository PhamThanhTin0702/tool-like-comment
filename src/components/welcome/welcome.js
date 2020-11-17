import React from "react";
import "./welcome.scss";
function Welcome({displayName}) {
    return (
        <div className="welcome">
            <h2>Welcome!</h2>
            <h1>{displayName}</h1>
            <a href="/">Go Home</a>
        </div>
    )
}

export default Welcome