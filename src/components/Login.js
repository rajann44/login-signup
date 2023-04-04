import { getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";
import { usersReference } from "../firebase/FireApp";
import formstyle from "../style/form.module.css";
import loginLogo from "../assets/login.gif";

const Login = () => {
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    console.log(loginForm);
  }, [loginForm]);

  const handleLogin = async () => {
    const queryResult = query(
      usersReference,
      where("email", "==", loginForm.email)
    );
    const userDocument = await getDocs(queryResult);
    if (userDocument.size == 1) {
      console.log(userDocument.size);
      userDocument.forEach((singleUserDoc) => {
        const dataFromDoc = singleUserDoc.data();
        const isUser = bcrypt.compareSync(
          loginForm.password,
          dataFromDoc.password
        );
        if (isUser) {
          navigate("/");
          console.log("Login Success");
        } else {
          console.log("Invalid creds");
        }
      });
    } else {
      console.log("Invalid creds");
    }
  };

  return (
    <div className={"container my-3 " + formstyle.outerFrame}>
      <div className={formstyle.outerFrame_2}>
        <header className={formstyle.header}>
          <img
            width="100"
            height="100"
            src={loginLogo}
            role="presentation"
            className={formstyle.header_img}
          />
          <h1 className={formstyle.header_h1}>Login up Now</h1>
        </header>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className={formstyle.label}>
            {/* Email address*/}
          </label>
          <input
            type="email"
            className={formstyle.input}
            id="email"
            placeholder="Work email"
            onChange={(event) =>
              setLoginForm({ ...loginForm, email: event.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="exampleFormControlTextarea2"
            className={formstyle.label}
          >
            {/* Password*/}
          </label>
          <input
            type="password"
            className={formstyle.input}
            id="password"
            placeholder="Password"
            onChange={(event) =>
              setLoginForm({ ...loginForm, password: event.target.value })
            }
          />
        </div>
        <div class="terms">
          By signing in you agree to our{" "}
          <a href="https://google.com" target="_blank" rel="noopener">
            Terms of Service
          </a>
        </div>
        <button
          type="button"
          className={"btn btn-success my-3 " + formstyle.loginBtn}
          onClick={handleLogin}
        >
          <span className={formstyle.loginBtnTxt}>Login</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
