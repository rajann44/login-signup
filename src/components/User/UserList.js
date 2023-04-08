import React, { useEffect, useState } from "react";
import style from "../../style/user/userlist.module.css";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import { getUsersInfoFromDb } from "../../firebase/UserFirebase";

const UserList = () => {
  const navigate = useNavigate();
  const [userListInfo, setUserListInfo] = useState([
    {
      email: "",
    },
  ]);

  useEffect(() => {
    async function getUserListData() {
      setUserListInfo([]); //I have explicitly set it empty, so that there is no previous state stored (to avoid duplicate cards on screen)
      const userData = await getUsersInfoFromDb();
      userData.forEach((user) => {
        setUserListInfo((prv) => [...prv, { ...user.data(), id: user.id }]);
      });
    }
    getUserListData();
  }, []);

  const updateUser = async () => {
    navigate("/signup");
  };

  return (
    <>
      <Header
        backButtonLink="/"
        headerTitle="All Users List"
        actionButtonText="Add User"
        handleOnClick={updateUser}
      ></Header>
      <div className={style.userDashboard}>
        <div className={style.MainDiv}>
          <div className={style.divWithTitle}>
            <div className={style.divWithName}>Name</div>
            <div className={style.divWithWeek}>Details</div>
          </div>
          {userListInfo.map((user, index) => {
            return (
              <div className={style.divWithList} key={index}>
                <div className={style.divWithListMain}>
                  <div className={style.divWithListRow}>
                    <div className={style.divWithUserName}>
                      <div className={style.divWithUserNameTooltipContainer}>
                        <div
                          className={
                            style.divWithUserNameTooltipContainerInside
                          }
                        >
                          <a className={style.divWithUserNameAvatar}>
                            <div className={style.divWithUserNameTooltip}>
                              <div className={style.divWithUserNameAvatarTitle}>
                                R
                              </div>
                            </div>
                          </a>
                          <div className={style.divWithUserNameColumn}>
                            <Link
                              to={"/user/" + user.id}
                              className={style.divWithUserNameColumnUserName}
                            >
                              {user.email}
                            </Link>
                            <div
                              className={style.divWithUserNameColumnUserDetail}
                            >
                              <span
                                className={
                                  style.divWithUserNameColumnUserDetailText
                                }
                              >
                                Head Admin
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={style.divWithWeekly}>
                      <div className={style.divWithWeeklyContent}>
                        Long Text For Seeing the UI Okay?
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default UserList;
