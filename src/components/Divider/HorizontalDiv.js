import React from "react";
import style from "../../style/divider/horizontaldiv.module.css";

const HorizontalDiv = () => {
  return (
    <div className={style.details_container}>
      <span className={style.leftSpace}></span>
      <p className={style.text}>Or</p>
      <span className={style.leftSpace}></span>
    </div>
  );
};

export default HorizontalDiv;
