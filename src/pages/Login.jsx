import React from "react";
import Template from "../components/loginsignup/Template";
import loginImg from "../assets/Images/login.webp";

const Login = ({ setLoggedIn }) => {
  return (
    <Template
      title="Welcome Back"
      desc1="Build skills for today, tomorrow and beyond."
      desc2="Education to future-proof your career."
      image={loginImg}
      formType="login"
      setLoggedIn={setLoggedIn}
    />
  );
};

export default Login;
