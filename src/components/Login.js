import { getDocs, query, where } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";
import { usersReference } from "../firebase/FireApp";
import formstyle from "../style/form.module.css";
import loginLogo from "../assets/login.gif";
import { Appstate } from "../App";
import Google from "./Button/Google";
import HorizontalDiv from "./Divider/HorizontalDiv";

const Login = () => {
  const navigate = useNavigate();
  const useAppstate = useContext(Appstate);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    isInvalid: {
      emailOrPassword: false,
    },
  });

  useEffect(() => {
    console.log(loginForm);
  }, [loginForm]);

  const handleLogin = async () => {
    let userId;
    const queryResult = query(
      usersReference,
      where("email", "==", loginForm.email)
    );
    const userDocument = await getDocs(queryResult);
    if (userDocument.size == 1) {
      userDocument.forEach((singleUserDoc) => {
        const dataFromDoc = singleUserDoc.data();
        userId = singleUserDoc.id;
        const isUser = bcrypt.compareSync(
          loginForm.password,
          dataFromDoc.password
        );
        if (isUser) {
          //navigate("/user/" + userId);
          useAppstate.setLogin(true);
          navigate("/user/");
          console.log("Login Success");
        } else {
          setLoginForm((prevState) => ({
            ...prevState,
            isInvalid: {
              ...prevState.isInvalid,
              emailOrPassword: true,
            },
          }));
          console.log("Invalid creds");
        }
      });
    } else {
      setLoginForm((prevState) => ({
        ...prevState,
        isInvalid: {
          ...prevState.isInvalid,
          emailOrPassword: true,
        },
      }));
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
          <h1 className={formstyle.header_h1}>Login Now</h1>
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
          {loginForm.isInvalid.emailOrPassword && (
            <span style={{ color: "red" }}>Enter Valid Credentials 😓</span>
          )}
        </div>
        <div className="terms">
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
        <HorizontalDiv />
        <Google
          buttonLogoSrc="https://d1luwo5u9zpc4i.cloudfront.net/assets/google_signin-f3c9ed21a2b2cb641cd72c0c1ab811e3ad589cb0abfe0f4f37dce575492d29de.svg"
          buttonText="Sign in with Google"
        ></Google>
      </div>
    </div>
  );
};

export default Login;
