import { getDocs, query, where } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";
import { usersReference } from "../firebase/FireApp";
import style from "../style/form.module.css";
import loginLogo from "../assets/login.gif";
import { Appstate } from "../App";
import HorizontalDiv from "./Divider/HorizontalDiv";
import GoogleAuthButton from "./Button/GoogleAuthButton";

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
    <div className={"container my-3 " + style.outerFrame}>
      <div className={style.outerFrame_2}>
        <header className={style.header}>
          <img
            width="100"
            height="100"
            src={loginLogo}
            role="presentation"
            className={style.header_img}
          />
          <h1 className={style.header_h1}>Login Now</h1>
        </header>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className={style.label}>
            {/* Email address*/}
          </label>
          <input
            type="email"
            className={style.input}
            id="email"
            placeholder="Work email"
            onChange={(event) =>
              setLoginForm({ ...loginForm, email: event.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea2" className={style.label}>
            {/* Password*/}
          </label>
          <input
            type="password"
            className={style.input}
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
          className={"btn btn-success my-3 " + style.loginBtn}
          onClick={handleLogin}
        >
          <span className={style.loginBtnTxt}>Login</span>
        </button>
        <HorizontalDiv />
        <GoogleAuthButton></GoogleAuthButton>
      </div>
    </div>
  );
};

export default Login;
