import React from "react";
import { useNavigate } from "react-router-dom";
import style from "../../style/userheader.module.css";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className={style.OverlayHeader}>
      <div className={style.HeaderMain}>
        <div className={style.HeaderPart1}>
          <div className={style.HeaderPart1_Left}>
            <button
              className={style.HeaderPart1_LeftButton}
              onClick={() => navigate("/")}
            >
              <span className={style.HeaderPart1_LeftButton_Span1}>⬅</span>
              <span className={style.HeaderPart1_LeftButton_Span2}>Back</span>
            </button>
          </div>
          <div className={style.HeaderPart1_Mid}></div>
          <div className={style.HeaderPart1_Right}>
            <button className={style.HeaderPart1_Right_Button}>
              <span className={style.HeaderPart1_Right_Button_Span}>
                Update person
              </span>
            </button>
          </div>
        </div>
        <div className={style.HeaderPart2}>
          <div className={style.HeaderPart2_Inside}>
            <h1 className={style.HeaderPart2_H1}>Rajan's Page</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;