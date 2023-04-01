import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { getFollowers } from "api/userAuth";
import { deleteFollowships, postFollowships } from "api/followerAuth";
import { TweetContext } from "contexts/TweetContext";
import { InfoContext } from "contexts/InfoContext";

// Components
import MainContainer from "components/containers/MainContainer";
import ModalContainer from "components/containers/ModalContainer";
import ViewContainer from "components/containers/ViewContainer";
import Header from "components/Header";
import NavBar from "components/NavBar";
import SideBar from "components/SideBar";
import SwitchBar from "components/SwitchBar";
import UserItem from "components/UserItem";

function FollowersPage() {
  const [currentPage, setCurrentPage] = useState("followers");
  const [followers, setFollowers] = useState([]);

  const { tweets, isTweetModalShow, handleTweetClick } =
    useContext(TweetContext);
  const { isUserLogin, loginAlert, pageUserInfo } = useContext(InfoContext);

  const navigate = useNavigate();
  const location = useLocation();
  const pageUserId = Number(location.pathname.split("/")[2]);

  // 換頁
  const handlePageChange = (changePage) => {
    if (changePage !== "followers") {
      setCurrentPage(changePage);
      navigate(`/user/${pageUserId}/${changePage}`);
    }
  };

  // 點擊更改跟隨狀態
  const handleFollowClick = async ({ id, isFollowed }) => {
    try {
      if (isFollowed === true) {
        await deleteFollowships({ id });
      } else {
        await postFollowships({ id });
      }
      setFollowers((prvefollowers) => {
        return prvefollowers.map((follower) => {
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
  // 驗證登入
  useEffect(() => {
    if (!isUserLogin) {
      loginAlert();
      navigate("/login");
    }
  }, [isUserLogin, loginAlert, navigate]);

  // 取得當前使用者的追隨者列表
  useEffect(() => {
    const getFollowersAsync = async () => {
      try {
        const getFollower = await getFollowers(pageUserId);
        setFollowers(getFollower);
      } catch (error) {
        console.error(error);
      }
    };
    getFollowersAsync();
  }, [pageUserId]);

  return (
    <div className="d-flex">
      {isTweetModalShow && <ModalContainer value="推文" />}
      <NavBar isUser={true} onTweetClick={handleTweetClick} />
      <MainContainer>
        <ViewContainer>
          <Header backIcon={true}>
            <h1>{pageUserInfo.name}</h1>
            <span>{tweets.length} 則推文</span>
          </Header>
          <SwitchBar
            value="follow"
            onPageChange={handlePageChange}
            currentPage={currentPage}
          />
          <div>
            {followers.map((follower) => {
              return (
                <UserItem
                  key={follower.followerId}
                  id={follower.followerId}
                  name={follower.Followers.name}
                  account={follower.Followers.account}
                  introduction={follower.Followers.introduction}
                  avatar={follower.Followers.avatar}
                  isFollowed={follower.Followers.isFollowed}
                  onFollowClick={handleFollowClick}
                />
              );
            })}
          </div>
        </ViewContainer>
        <SideBar />
      </MainContainer>
    </div>
  );
}

export default FollowersPage;
