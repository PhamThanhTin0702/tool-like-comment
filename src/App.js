import React, { useState, useEffect } from "react";
import { UserProvider } from "./contexts/context";
import "./App.css";
import HomePage from "./pages/home/index";
import LoginPage from "./pages/login/index";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { CookiesProvider } from 'react-cookie';
import {firebaseAppAuth} from "./services/firebase";

function App() {
  const [user, setUser] = useState({displayName: null, email: null, photoUrl: ""});

  useEffect(() => {
    firebaseAppAuth.onAuthStateChanged((user) => {
      const result = user
      setUser({displayName: result.displayName, email: result.email, photoUrl: result.photoURL});
    })
  }, [])

  return (
    <CookiesProvider>
      <UserProvider value={[user, setUser]}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/login">
              <LoginPage/>
            </Route>
            <Route exact path="/">
              <HomePage/>
            </Route>
          </Switch>
        </BrowserRouter>
      </UserProvider>
    </CookiesProvider>
  );
}

export default App;
