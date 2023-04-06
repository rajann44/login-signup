import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "../../style/user.module.css";
import Header from "./Header";
import { db } from "../../firebase/FireApp";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Toast from "./Toast";

const User = () => {
  const { id } = useParams();
  const [showToast, setShowToast] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    async function getData() {
      const reqInfo = doc(db, "users", id);
      const user = await getDoc(reqInfo);
      setUserInfo(user.data());
    }
    getData();
  }, []);

  const updateUser = async () => {
    try {
      const docRef = doc(db, "users", id);
      await updateDoc(docRef, userInfo);
      console.log("Data Updated");
      setShowToast(true);
      resetToast();
    } catch (error) {
      console.log("Error while updating Updated");
    }
  };

  function resetToast() {
    setTimeout(function () {
      setShowToast(false);
    }, 4000);
  }

  return (
    <>
      <Toast showToast={showToast}></Toast>
      <Header
        backButtonLink="/user"
        headerTitle={`User ${userInfo.email.toUpperCase()}`}
        buttonText="Update User"
        handleOnClick={updateUser}
      ></Header>
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
                      value={userInfo.email}
                      onChange={(event) =>
                        setUserInfo({ ...userInfo, email: event.target.value })
                      }
                    ></input>
                  </div>
                </div>
                <div className={style.FormSectionGridRow}>
                  <div className={style.FormSectionGridColumn}>
                    <label className={style.InputLabel}></label>
                    <input
                      className={style.InputField}
                      placeholder="Password"
                      value={userInfo.password}
                      type="password"
                      onChange={(event) =>
                        setUserInfo({
                          ...userInfo,
                          password: event.target.value,
                        })
                      }
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
