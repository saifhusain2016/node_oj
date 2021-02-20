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

  const handleSubmit = (event) => {
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

    const login = async () => {
      const response = await fetch("http://localhost:8000/auth/login", req);
      return {
        status: response.status,
        body: await response.json(),
      };
    };

    login().then((res) => {
      if (res.status === 200) {
        alert("Access Granted.. !!!");
        auth.login();
      } else {
        const message = `Invalid Credentials : ${res.body["message"]}`;
        alert(message);
        resetInputs();
      }
    });
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
