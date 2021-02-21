import { AuthContext } from "../context/auth-context";
import { useContext, useState } from "react";

function HomePage() {
  const auth = useContext(AuthContext);

  const logout = () => {
    auth.logout();
  };

  return (
    <div className="div2">
      <h1> Welcome to Home Page </h1>
      <button> button 1</button>
      <button> button 2 </button>
      <button onClick={(e) => logout()}> Signout </button>
    </div>
  );
}

export default HomePage;
