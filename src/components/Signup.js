import React, { useState } from "react";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";
import { usersReference } from "../firebase/FireApp";
import { addDoc, getDocs, query, where } from "firebase/firestore";
import formstyle from "../style/form.module.css";
import signupLogo from "../assets/signupLogo.gif";
import { isEmailInvalid, isPasswordInvalid } from "../utils/FormValidation";

const Signup = () => {
  const navigate = useNavigate();

  const [signupForm, setSignupForm] = useState({
    email: "",
    password: "",
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
      try {
        const queryResult = query(
          usersReference,
          where("email", "==", signupForm.email)
        );
        const userDocument = await getDocs(queryResult);
        if (userDocument.size === 0) {
          const salt = bcrypt.genSaltSync(10);
          var hash = bcrypt.hashSync(signupForm.password, salt);
          await addDoc(usersReference, {
            email: signupForm.email,
            password: hash,
          });
          console.log("User signup successful");
          navigate("/login");
        } else {
          console.log("User signup failed, Email already exists");
        }
      } catch (error) {
        console.log("User signup failed " + error);
      }
    }
  };

  return (
    <div className={"container my-3 " + formstyle.outerFrame}>
      <div className={formstyle.outerFrame_2}>
        <header className={formstyle.header}>
          <img
            width="100"
            height="100"
            src={signupLogo}
            role="presentation"
            className={formstyle.header_img}
          />
          <h1 className={formstyle.header_h1}>Sign up Now</h1>
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
              setSignupForm({ ...signupForm, email: event.target.value })
            }
          />
          {signupForm.isInvalid.email && (
            <span style={{ color: "red" }}>Enter Valid 📧 Email 😓</span>
          )}
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
          className={"btn btn-success my-3 " + formstyle.loginBtn}
          onClick={handleSignup}
        >
          <span className={formstyle.loginBtnTxt}>Signup</span>
        </button>
      </div>
    </div>
  );
};

export default Signup;
