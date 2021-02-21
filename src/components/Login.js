import "./Login.css";
import { AuthContext } from "../context/auth-context";
import { useContext, useState } from "react";

const Login = () => {
  const auth = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function resetInputs() {
    setEmail("");
    setPassword("");
  }

  function validate() {
    if (!email || !password) {
      alert("Email Or Password Cannot be Empty");
      return false;
    }
    return true;
  }

  const handleSignout = (event) => {
    event.preventDefault();
    auth.logout();
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) return;

    const req = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };

    const response = await fetch("http://localhost:8000/auth/login", req);
    const res = await response.json();
    console.log("response : " + response);
    console.log("res: ", res);
    const tokenValue = res["token"];
    console.log(tokenValue);

    if (response.status === 200) {
      alert("Access Granted.. !!!");

      const remainingMilliseconds = 60 * 60 * 1000;
      const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
      localStorage.setItem("token", tokenValue);
      localStorage.setItem("expiryDate", expiryDate.toISOString());

      setTimeout(() => {
        handleSignout();
      }, remainingMilliseconds);

      resetInputs();
      auth.login();
    } else {
      const message = "Invalid Credentials";
      alert(message);
    }
  };

  return (
    <div className="App div2">
      <h1>Login Page</h1>
      <div className="flexbox">
        <div>
          <form onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="inputEmail">Email Address </label>
              <input
                type="email"
                id="inputEmail"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="inputPassword">Password </label>
              <input
                type="password"
                id="inputPassword"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="login">
              Sign In
            </button>
          </form>

          <form action="/signup">
            <button type="submit" className="signup">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
