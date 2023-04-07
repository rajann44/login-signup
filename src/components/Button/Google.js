import React from "react";
import style from "../../style/button/button.module.css";

const Google = ({ buttonLogoSrc, buttonText }) => {
  return (
    <div className="buttonMainDiv">
      <button className={style.buttonOuter}>
        <img className={style.logo} src={buttonLogoSrc}></img>
        {buttonText}
      </button>
    </div>
  );
};

export default Google;
