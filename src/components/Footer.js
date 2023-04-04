import React from "react";
import footerstyle from "../style/footer.module.css";

const Footer = () => {
  return (
    <div>
      <footer className={"fixed-bottom " + footerstyle.footer}>
        <div className={"container " + footerstyle.container}>
          <p>Created using React | Bootstrap &copy; 2023</p>
          <nav className={footerstyle.nav}></nav>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
