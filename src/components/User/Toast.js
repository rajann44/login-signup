import React from "react";
import style from "../../style/toast.module.css";

const Toast = ({ showToast, toastMessage }) => {
  return (
    <>
      {showToast && (
        <div className={style.toastOverlay}>
          <div className={style.toastMain}>
            <div className={style.toastText}>{toastMessage}</div>
            <button className={style.toastButton}>x</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Toast;
