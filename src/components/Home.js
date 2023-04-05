import React from "react";
import homestyle from "../style/home.module.css";
import Footer from "./Footer";

const Home = () => {
  return (
    <div>
      <div className={"container " + homestyle.container}>
        <h1 className={homestyle.h1}>Welcome to my Login/Signup Web</h1>
        <p className={homestyle.p}>
          This is a simple homepage with a navbar and footer.
        </p>
        <p>Homepage CSS is being rendered using style modules</p>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Home;
