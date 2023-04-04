import React, { useEffect, useState } from "react";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";
import { usersReference } from "../firebase/FireApp";
import { addDoc, getDocs, query, where } from "firebase/firestore";
import formstyle from "../style/form.module.css";
import signupLogo from "../assets/signupLogo.gif";

const Signup = () => {
  const navigate = useNavigate();

  const [signupForm, setSignupForm] = useState({
    email: "",
    password: "",
  });

  const handleSignup = async () => {
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
            style={{ borderRadius: "10px" }}
            className={formstyle.header_img}
          />
          <h1 className={formstyle.header_h1}>
            Sign up <br /> Now
          </h1>
        </header>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className={formstyle.label}>
            {/* Email address*/}
          </label>
          <input
            type="email"
            className={formstyle.input}
            id="email"
            placeholder="name@example.com"
            onChange={(event) =>
              setSignupForm({ ...signupForm, email: event.target.value })
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
            placeholder="secret"
            onChange={(event) =>
              setSignupForm({ ...signupForm, password: event.target.value })
            }
          />
        </div>
        <div class="terms">
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
