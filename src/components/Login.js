import React, { useRef, useState } from "react";
import Header from "./Header";
import { NETFLIX_BG } from "../utils/constants";

const Login = () => {
  const [inputField, setInputField] = useState({ email: "", password: "" });
  //   const email = useRef();
  //   const password = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputField((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div>
      <div className="absolute">
        <img className="h-screen w-screen" src={NETFLIX_BG} />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      <Header />
      <form
        className=" w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white"
        onSubmit={(e) => e.preventDefault()}
      >
        <h1>Sign In</h1>
        <input
          type="text"
          name="email"
          placeholder="Email Address"
          value={inputField.email}
          className="p-2 m-2"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={inputField.password}
          className="p-2 m-2"
          onChange={handleChange}
        />
      </form>
    </div>
  );
};

export default Login;
