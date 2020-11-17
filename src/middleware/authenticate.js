import React, {useContext, useEffect, useState} from "react";
import { Route, Redirect } from "react-router-dom";
import LoginPage from "../pages/login/index"
import { useCookies } from 'react-cookie';
import UserContext from "../contexts/context";
import {firebaseAppAuth} from "../services/firebase";

// const RequireAuth = ({children}) => {
//     const userCtx = useContext(UserContext);
//     const userState = userCtx[0];
//     if(!userState.token) {
//         console.log("helo")
//         return <Route exact path="/login" component={LoginPage}/>
//     }
//     console.log(children)
//     return <Route exact path={children.props.path} component={children.props.component}/>
// }

// const withAuth = Component => props => {
//     return <Component />
// }

const PrivateRoute = ({ component: Component, ...rest }) => {
    const userCtx = useContext(UserContext);
    const userState = userCtx[0];
    const setUser = userCtx[1];
    const [user, setUserTest] = useState({displayName: null, email: null, photoUrl: ""})
    useEffect(() => {
        firebaseAppAuth.onAuthStateChanged((user) => {
            const result = user
            setUserTest({displayName: result.displayName, email: result.email, photoUrl: result.photoURL});
          })
    }, [])
    return (
        <Route {...rest}>
            {
                user.email ? (
                    <Component />
                ) : (
                    <Redirect to='/login'/>
                )
            }
        </Route>
    );
  };
  export default PrivateRoute;

//export default withAuth