import React from "react";
import style from "../../style/button/button.module.css";

const WideButton = ({ buttonLogoSrc, buttonText, handleClick }) => {
  return (
    <div className="buttonMainDiv">
      <button onClick={handleClick} className={style.buttonOuter}>
        <img className={style.logo} src={buttonLogoSrc}></img>
        {buttonText}
      </button>
    </div>
  );
};

export default WideButton;
