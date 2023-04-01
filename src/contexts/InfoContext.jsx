import { deleteFollowships, postFollowships } from "api/followerAuth";
import { getUserInfo } from "api/userAuth";
import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const InfoContext = createContext("");

export function InfoContextProvider({ children }) {
  const loginUserId = Number(localStorage.getItem("userId"));
  const token = localStorage.getItem("token");
  // !!! 驗證登入狀態，目前寫法可能會有使用者一直沒登出，但 token 效期過了的後患
  const [isUserLogin, setIsUserLogin] = useState(token && loginUserId);
  const [loginUserInfo, setLoginUserInfo] = useState({});
  const [pageUserInfo, setPageUserInfo] = useState({});
  const [isInfoModalShow, setIsInfoModalShow] = useState(false);
  const [topUsers, setTopUsers] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [followers, setFollowers] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const isUserPages = location.pathname.split("/")[1] === "user";
  const pageUserId = Number(location.pathname.split("/")[2]);

  const handleInfoEditClick = () => {
    setIsInfoModalShow(!isInfoModalShow);
  };

  const loginAlert = () => {
    Swal.fire({
      position: "top",
      icon: "warning",
      title: "請先登入",
      timer: 1500,
      showConfirmButton: false,
      customClass: {
        icon: "swalIcon right",
        title: "swalTitle",
      },
    });
  };

  // 追隨狀態事件
  const handleFollowClick = async ({ id, isFollowed }) => {
    try {
      if (isFollowed) {
        await deleteFollowships({ id });
      } else {
        await postFollowships({ id });
      }

      setPageUserInfo((pageUserInfo) => {
        if(pageUserInfo.id === id) {
          return {
            ...pageUserInfo,
            followerCount: isFollowed
              ? pageUserInfo.followerCount - 1
              : pageUserInfo.followerCount + 1,
            isFollowed: !pageUserInfo.isFollowed,
          }
        }
        if (pageUserInfo.id !== id) {
          return {
            ...pageUserInfo,
            followingCount: isFollowed
              ? pageUserInfo.followingCount - 1
              : pageUserInfo.followingCount + 1,
            isFollowed: !pageUserInfo.isFollowed,
          }
        }
      });

      setTopUsers((topUsers) => {
        return topUsers.map((topUser) => {
          if (topUser.id === id) {
            return {
              ...topUser,
              isFollowed: !topUser.isFollowed,
            };
          }
          return topUser;
        });
      });

      setFollowings((followings) => {
        if (pageUserId === loginUserId) {
          return followings.filter((following) => following.followingId !== id);
        }
        return followings.map((following) => {
          if (following.followingId === id) {
            return {
              ...following,
              Followings: {
                ...following.Followings,
                isFollowed: !following.Followings.isFollowed,
              },
            };
          }
          return following;
        });
      })

      setFollowers((followers) => {
        return followers.map((follower) => {
          if (follower.followerId === id) {
            return {
              ...follower,
              Followers: {
                ...follower.Followers,
                isFollowed: !follower.Followers.isFollowed,
              },
            };
          }
          return follower;
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect
  // 打當前頁面的使用者資料
  useEffect(() => {
    // 有進入 UserPages 系列，並且抓到 id 才打資料
    if (isUserPages && pageUserId) {
      const getUserInfoAsync = async () => {
        try {
          const userInfoData = await getUserInfo(pageUserId);

          // 如果為 error 就會跳通知轉到首頁
          if (userInfoData.status === "error") {
            // 跳通知
            Swal.fire({
              position: "top",
              icon: "error",
              title: userInfoData.message,
              timer: 1500,
              showConfirmButton: false,
              customClass: {
                icon: "swalIcon right",
                title: "swalTitle",
              },
            });

            navigate("/main");
            return;
          }

          setPageUserInfo(userInfoData);
        } catch (error) {
          console.error(error);
        }
      };

      getUserInfoAsync();
    }
    //eslint-disable-next-line
  }, [isUserPages, pageUserId]);

  // 打登入者的資料
  useEffect(() => {
    // 是登入狀態就先打使用者資料
    if (isUserLogin) {
      const getUserInfoAsync = async () => {
        try {
          const userInfoData = await getUserInfo(loginUserId);
          setLoginUserInfo(userInfoData);
        } catch (error) {
          console.error(error);
        }
      };

      getUserInfoAsync();
    }
  }, [isUserLogin, loginUserId, token]);

  return (
    <InfoContext.Provider
      value={{
        isUserLogin,
        setIsUserLogin,
        loginAlert,
        loginUserId,
        isInfoModalShow,
        handleInfoEditClick,
        pageUserInfo,
        setPageUserInfo,
        loginUserInfo,
        setLoginUserInfo,
        handleFollowClick,
        topUsers,
        setTopUsers,
        followings,
        setFollowings,
        followers,
        setFollowers,
      }}
    >
      {children}
    </InfoContext.Provider>
  );
}
