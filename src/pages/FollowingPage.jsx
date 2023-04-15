import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { getFollowings } from "api/userAuth";
import { TweetContext } from "contexts/TweetContext";
import { InfoContext } from "contexts/InfoContext";

// Components
import MainContainer from "components/containers/MainContainer";
import ModalContainer from "components/containers/ModalContainer";
import Header from "components/Header";
import NavBar from "components/NavBar";
import SideBar from "components/SideBar";
import SwitchBar from "components/SwitchBar";
import UserItem from "components/UserItem";
import PageContainer from "components/containers/PageContainer";

function FollowingPage() {
  const [currentPage, setCurrentPage] = useState("following");

  const { isTweetModalShow, handleTweetClick } = useContext(TweetContext);
  const {
    isUserLogin,
    loginAlert,
    pageUserInfo,
    followings,
    setFollowings,
    handleFollowClick,
  } = useContext(InfoContext);

  const navigate = useNavigate();
  const location = useLocation();
  const pageUserId = Number(location.pathname.split("/")[2]);

  // 換頁
  const handlePageChange = (changePage) => {
    if (changePage !== "following") {
      setCurrentPage(changePage);
      navigate(`/user/${pageUserId}/${changePage}`);
    }
  };

  // useEffect
  // 驗證登入
  useEffect(() => {
    if (!isUserLogin) {
      loginAlert();
      navigate("/login");
    }
  }, [isUserLogin, loginAlert, navigate]);

  // 取得當前使用者的跟隨者列表
  useEffect(() => {
    const getFollowingsAsync = async () => {
      try {
        const getFollowing = await getFollowings(pageUserId);
        setFollowings(getFollowing);
      } catch (error) {
        console.error(error);
      }
    };
    getFollowingsAsync();
  }, [pageUserId, setFollowings]);

  return (
    <PageContainer>
      {isTweetModalShow && <ModalContainer value="推文" />}
      <NavBar isUser={true} onTweetClick={handleTweetClick} status="個人資料" />
      <MainContainer>
        <Header backIcon={true}>
          <h1>{pageUserInfo.name}</h1>
          <span>{followings.length} 個正在跟隨</span>
        </Header>
        <SwitchBar
          value="follow"
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
        <div>
          {followings.map((following) => {
            return (
              <UserItem
                key={following.followingId}
                id={following.followingId}
                name={following.Followings.name}
                account={following.Followings.account}
                introduction={following.Followings.introduction}
                avatar={following.Followings.avatar}
                isFollowed={following.Followings.isFollowed}
                onFollowClick={handleFollowClick}
              />
            );
          })}
        </div>
      </MainContainer>
      <SideBar />
    </PageContainer>
  );
}

export default FollowingPage;
