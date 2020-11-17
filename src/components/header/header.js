import React, {useContext, useState} from "react";
import "./header.scss";
import UserContext from "../../contexts/context";
import {firebaseAppAuth} from "../../services/firebase";
import { useCookies } from 'react-cookie';
import {useHistory} from "react-router-dom";

function Header() {
    const userCtx = useContext(UserContext);
    const userState = userCtx[0];
    const [dropDown, setDropDown] = useState("hide");
    const [cookies, setCookie, removeCookie] = useCookies()
    const history = useHistory();
    const handleDropDown = () => {
        setDropDown(dropDown === "show" ? "hide" : "show")
    }

    const signOut = () => {
        firebaseAppAuth.signOut();
        removeCookie("tk");
        window.location.href="/login"
    } 

    return (
        <div className="header">
            <div className="user_info">
                <h1>{userState.email}</h1>
                <div className="drop_down">
                    <div className={`avt ${dropDown}`} style={{backgroundImage: `url(${userState.photoUrl})`}} onClick={() => {
                        handleDropDown()
                    }}></div>
                    <ul className={`ul_action ${dropDown}`}>
                        <li onClick={() => {signOut()}}>Sign out</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Header