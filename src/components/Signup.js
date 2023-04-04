import React, { useEffect, useState } from "react";

const Signup = () => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    console.log(loginForm);
  }, [loginForm]);

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
          Example textarea
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
      <button type="button" className="btn btn-success">
        Success
      </button>
    </div>
  );
};

export default Signup;
