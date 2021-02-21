import Login from "./components/Login.js";
import Signup from "./components/Signup.js";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import HomePage from "./components/HomePage.js";
import { AuthContext } from "./context/auth-context";
import { useState } from "react";
import { getNodeText } from "@testing-library/react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSession, setIsSession] = useState(false);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setIsSession(false);
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
  };

  async function getSession() {
    const tokenValue = await ("Bearer " + localStorage.getItem("token"));
    const request = {
      method: "GET",
      headers: {
        Authorization: tokenValue,
      },
    };

    const response = await fetch("http://localhost:8000/auth/session", request);
    const res = await response.json();

    console.log("response: ", res);
    console.log("response status: ", response.status);

    if (response.status === 200) {
      console.log("status code is 200");
      login();
      return true;
    } else {
      console.log("status code is 500");
      logout();
      return false;
    }
  }

  getSession().then((result) => setIsSession(result));

  let routes;
  if (isSession || isLoggedIn) {
    console.log("session : ", isSession);
    console.log("isloggedin : ", isLoggedIn);
    routes = (
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/signup" exact>
          <Signup />
        </Route>
        <Redirect to="/login" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      {console.log("value of login", isLoggedIn)}
      <Router>
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
