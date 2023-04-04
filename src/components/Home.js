import React from "react";
import homestyle from "../style/home.module.css";

const Home = () => {
  return (
    <div>
      <div class={"container " + homestyle.container}>
        <h1 class={homestyle.h1}>Welcome to my Login/Signup Web</h1>
        <p class={homestyle.p}>
          This is a simple homepage with a navbar and footer.
        </p>
        <p>Homepage CSS is being rendered using style modules</p>
      </div>
    </div>
  );
};

export default Home;
