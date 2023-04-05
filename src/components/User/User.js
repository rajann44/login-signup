import React from "react";
import style from "../../style/user.module.css";
import Header from "./Header";

const User = () => {
  return (
    <>
      <Header></Header>
      <div className={style.MainContainer}>
        <div className={style.ContainerContent}>
          <div className={style.ContentFrame}>
            <div className={style.FormSection}>
              <div className={style.FormSectionDetails}>
                <h3 className={style.FormDetailH1}>Basic Info</h3>
                <p className={style.FormDetailPara}>
                  Enter the users details. (Note: the user name must not include
                  numerals).
                </p>
              </div>
              <div className={style.FormSectionGrid}>
                <div className={style.FormSectionGridRow}>
                  <div className={style.FormSectionGridColumn}>
                    <label className={style.InputLabel}></label>
                    <input
                      className={style.InputField}
                      placeholder="Email"
                    ></input>
                  </div>
                </div>
                <div className={style.FormSectionGridRow}>
                  <div className={style.FormSectionGridColumn}>
                    <label className={style.InputLabel}></label>
                    <input
                      className={style.InputField}
                      placeholder="Password"
                    ></input>
                  </div>
                </div>
                <div className={style.FormSectionGridRow}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
