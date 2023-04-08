import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "../style/form.module.css";
import signupLogo from "../assets/signupLogo.gif";
import { isEmailInvalid, isPasswordInvalid } from "../utils/FormValidation";
import { signupAndUploadUserInfoToDb } from "../firebase/UserFirebase";

const Signup = () => {
  const navigate = useNavigate();

  const [signupForm, setSignupForm] = useState({
    email: "",
    password: "",
    username: "",
    isInvalid: {
      email: "",
      password: "",
    },
  });

  const validateSignupRequirement = () => {
    setSignupForm((prevState) => ({
      ...prevState,
      isInvalid: {
        ...prevState.isInvalid,
        email: isEmailInvalid(signupForm.email),
      },
    }));
    setSignupForm((prevState) => ({
      ...prevState,
      isInvalid: {
        ...prevState.isInvalid,
        password: isPasswordInvalid(signupForm.password),
      },
    }));
  };

  const handleSignup = async () => {
    validateSignupRequirement();
    if (
      !isEmailInvalid(signupForm.email) &&
      !isPasswordInvalid(signupForm.password)
    ) {
      // Call the function like this:
      (async () => {
        const result = await signupAndUploadUserInfoToDb(signupForm);
        console.log(result);
        if (result) {
          navigate("/login");
          console.log("User signup successful");
        } else {
          console.log("User signup failed");
        }
      })();
    }
  };

  return (
    <div className={"container my-3 " + style.outerFrame}>
      <div className={style.outerFrame_2}>
        <header className={style.header}>
          <img
            width="100"
            height="100"
            src={signupLogo}
            role="presentation"
            className={style.header_img}
          />
          <h1 className={style.header_h1}>Sign up Now</h1>
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
              setSignupForm({ ...signupForm, email: event.target.value })
            }
          />
          {signupForm.isInvalid.email && (
            <span style={{ color: "red" }}>Enter Valid 📧 Email 😓</span>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput2" className={style.label}>
            {/* Username*/}
          </label>
          <input
            type="text"
            className={style.input}
            id="username"
            placeholder="Username"
            onChange={(event) =>
              setSignupForm({ ...signupForm, username: event.target.value })
            }
          />
          {signupForm.isInvalid.email && (
            <span style={{ color: "red" }}>Enter Valid 📧 Username 😓</span>
          )}
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
              setSignupForm({ ...signupForm, password: event.target.value })
            }
          />
          {signupForm.isInvalid.password && (
            <span style={{ color: "red" }}>Enter Valid 🔑 Password 😓</span>
          )}
        </div>
        <div className="terms">
          By signing up you agree to our{" "}
          <a href="https://google.com" target="_blank" rel="noopener">
            Terms of Service
          </a>
        </div>
        <button
          type="button"
          className={"btn btn-success my-3 " + style.loginBtn}
          onClick={handleSignup}
        >
          <span className={style.loginBtnTxt}>Signup</span>
        </button>
      </div>
    </div>
  );
};

export default Signup;
