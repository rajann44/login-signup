import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { validateIfUserPresentInDBAndSendUserDetails } from "../firebase/UserFirebase";
import style from "../style/form.module.css";
import signinLogo from "../assets/login.gif";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const handleSignInAndSetUserInfoContext = () => {
    validateIfUserPresentInDBAndSendUserDetails(loginForm).then((result) => {
      if (result) {
        login({ ...result, loginStatus: true });
        navigate("/user");
      } else {
        login({ loginStatus: false });
      }
    });
  };

  return (
    <div>
      <div className={"container my-3 " + style.outerFrame}>
        <div className={style.outerFrame_2}>
          <header className={style.header}>
            <img
              width="100"
              height="100"
              role="presentation"
              className={style.header_img}
              src={signinLogo}
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
            <label
              htmlFor="exampleFormControlTextarea2"
              className={style.label}
            >
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
            onClick={handleSignInAndSetUserInfoContext}
          >
            <span className={style.loginBtnTxt}>Login</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
