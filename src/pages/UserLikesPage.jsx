import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { getUserLikedTweets } from "api/userAuth";
import { TweetContext } from "contexts/TweetContext";
import { InfoContext } from "contexts/InfoContext";

// Components
import MainContainer from "components/containers/MainContainer";
import ModalContainer from "components/containers/ModalContainer";
import Header from "components/Header";
import NavBar from "components/NavBar";
import SideBar from "components/SideBar";
import SwitchBar from "components/SwitchBar";
import UserInfo from "components/UserInfo";
import { UserTweetItem } from "components/TweetItem";
import PageContainer from "components/containers/PageContainer";

function UserLikesPage() {
  const [userLikedTweets, setUserLikedTweets] = useState([]);
  const [currentPage, setCurrentPage] = useState("likes");

  const { isTweetModalShow, handleTweetClick, isReplyModalShow } =
    useContext(TweetContext);
  const { isUserLogin, loginAlert, pageUserInfo, loginUserInfo } =
    useContext(InfoContext);

  const navigate = useNavigate();
  const location = useLocation();

  const pageUserId = Number(location.pathname.split("/")[2]);

  const handlePageChange = (changePage) => {
    if (changePage !== "likes") {
      setCurrentPage(changePage);
      navigate(`/user/${pageUserId}/${changePage}`);
    }
    if (changePage === "tweets") {
      setCurrentPage(changePage);
      navigate(`/user/${pageUserId}`);
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

  // 取得使用者喜歡的推文
  useEffect(() => {
    const getUserLikedTweetsAsync = async () => {
      try {
        const userLikedTweetsData = await getUserLikedTweets(pageUserId);
        setUserLikedTweets(userLikedTweetsData);
      } catch (error) {
        console.error(error);
      }
    };

    getUserLikedTweetsAsync();
  }, [pageUserId, loginUserInfo]);

  return (
    <PageContainer>
      {isTweetModalShow && <ModalContainer value="推文" />}
      {isReplyModalShow && <ModalContainer value="回覆" />}
      <NavBar isUser={true} onTweetClick={handleTweetClick} status="個人資料" />
      <MainContainer>
        <Header backIcon={true}>
          <h1>{pageUserInfo.name}</h1>
          <span>{userLikedTweets.length} 則喜歡的推文</span>
        </Header>
        <UserInfo pageUserId={pageUserId} />
        <SwitchBar
          value="info"
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
        <div>
          {userLikedTweets.map((tweet) => (
            <UserTweetItem
              key={tweet.TweetId}
              tweetId={tweet.TweetId}
              avatar={tweet.Tweet.User.avatar}
              userId={tweet.Tweet.User.id}
              name={tweet.Tweet.User.name}
              account={tweet.Tweet.User.account}
              createdAt={tweet.Tweet.createdAt}
              description={tweet.Tweet.description}
              replyCount={tweet.Tweet.replyCount}
              likeCount={tweet.Tweet.likeCount}
              isLiked={tweet.Tweet.isLiked}
            />
          ))}
        </div>
      </MainContainer>
      <SideBar />
    </PageContainer>
  );
}

export default UserLikesPage;
