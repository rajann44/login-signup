import React, { useEffect, useState } from "react";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";
import { usersReference } from "../firebase/FireApp";
import { addDoc, getDocs, query, where } from "firebase/firestore";

const Signup = () => {
  const navigate = useNavigate();

  const [signupForm, setSignupForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    console.log(signupForm);
  }, [signupForm]);

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
            setSignupForm({ ...signupForm, email: event.target.value })
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
            setSignupForm({ ...signupForm, password: event.target.value })
          }
        />
      </div>
      <button type="button" className="btn btn-success" onClick={handleSignup}>
        Signup
      </button>
    </div>
  );
};

export default Signup;
