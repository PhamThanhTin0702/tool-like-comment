import React, { useContext, useEffect } from "react";
//import {signInWithGoogle} from "../../services/firebase";
import { signInWithGoogle } from "../../services/firebase";
import UserContext from "../../contexts/context";
import { useCookies } from "react-cookie";
import "./login.scss";
import Welcome from "../../components/welcome/welcome";

function LoginPage() {
  const userCtx = useContext(UserContext);
  const setStateUser = userCtx[1];
  const userState = userCtx[0];
  const [cookies, setCookie] = useCookies();

  const login = () => {
    signInWithGoogle()
      .then((result) => {
        if (result.credential) {
          setCookie("tk", result.credential.accessToken);
        }
        setStateUser({
          displayName: result.user.displayName,
          email: result.user.email,
          photoUrl: result.user.photoURL,
        });
      })
      .catch((err) => {
        setStateUser({ displayName: null, email: null, photoURL: null });
      });
  };

  return (
    <div className="login_page">
      {userState.email ? (
        <Welcome displayName={userState.email} />
      ) : (
          <React.Fragment>
            <div
            className="bt_login_gg"
            onClick={() => {
                login();
            }}
            >
            <p>Sign in with</p>
            <div>
                <span>G</span>
                <span>o</span>
                <span>o</span>
                <span>g</span>
                <span>l</span>
                <span>e</span>
            </div>
            
            </div>
        </React.Fragment>
      )}
    </div>
  );
}

export default LoginPage;
