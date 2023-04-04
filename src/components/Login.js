import { getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";
import { usersReference } from "../firebase/FireApp";

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
    <div className="container my-3">
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="name@example.com"
          onChange={(event) =>
            setLoginForm({ ...loginForm, email: event.target.value })
          }
        />
      </div>
      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea2" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          placeholder="secret"
          onChange={(event) =>
            setLoginForm({ ...loginForm, password: event.target.value })
          }
        />
      </div>
      <button type="button" className="btn btn-success" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default Login;
