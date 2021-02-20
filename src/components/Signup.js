import "./Signup.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const Signup = () => {
  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function clearInputs() {
    setName("");
    setEmail("");
    setPassword("");
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const url = "http://localhost:8000/auth/signup";

    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    };

    fetch(url, request)
      .then((res) => {
        if (res.status !== 200) {
          alert("User Registration Failed");
        } else {
          alert("User Successfully Registered !");
          history.push("/login");
        }
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  };

  return (
    <div className="App">
      <h1>Sign up Registration Page</h1>
      <div className="flexbox">
        <div>
          <form onSubmit={handleSubmit} action="/login" noValidate>
            <h1>Sign Up</h1>
            <div>
              <label htmlFor="inputName">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="inputEmail">Email Address</label>
              <input
                type="email"
                id="inputEmail"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="inputPassword">Password</label>
              <input
                type="password"
                id="inputPassword"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
