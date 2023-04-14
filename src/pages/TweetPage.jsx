import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getSingleTweet, getSingleTweetReplies } from "api/tweetAuth";
import { TweetContext } from "contexts/TweetContext";
import { InfoContext } from "contexts/InfoContext";

// Components
import MainContainer from "components/containers/MainContainer";
import ModalContainer from "components/containers/ModalContainer";
import Header from "components/Header";
import NavBar from "components/NavBar";
import ReplyItem from "components/ReplyItem";
import SideBar from "components/SideBar";
import TweetCard from "components/TweetCard";
import PageContainer from "components/containers/PageContainer";

function TweetPage() {
  const [tweet, setTweet] = useState({});
  const [isTweetLike, setIsTweetLike] = useState(0);
  const [currentLikeCount, setCurrentLikeCount] = useState(0);

  const {
    isTweetModalShow,
    handleTweetClick,
    isReplyModalShow,
    tweetReplies,
    setTweetReplies,
  } = useContext(TweetContext);
  const { isUserLogin, loginAlert } = useContext(InfoContext);

  const navigate = useNavigate();
  const location = useLocation();
  const tweetId = Number(location.pathname.split("/")[2]);

  // useEffect
  // 驗證登入
  useEffect(() => {
    if (!isUserLogin) {
      loginAlert();
      navigate("/login");
    }
  }, [isUserLogin, loginAlert, navigate]);

  // 取得單一推文資訊
  useEffect(() => {
    const getSingleTweetAsync = async () => {
      try {
        const singleTweet = await getSingleTweet(tweetId);
        setTweet(singleTweet);
        setIsTweetLike(singleTweet.isLiked);
        setCurrentLikeCount(singleTweet.likeCount);
      } catch (error) {
        console.error(error);
      }
    };

    const getSingleTweetRepliesAsync = async () => {
      try {
        const singleTweetReplies = await getSingleTweetReplies(tweetId);
        setTweetReplies(singleTweetReplies);
      } catch (error) {
        console.error(error);
      }
    };

    getSingleTweetAsync();
    getSingleTweetRepliesAsync();
    //eslint-disable-next-line
  }, [tweetId]);

  return (
    <PageContainer>
      {isTweetModalShow && <ModalContainer value="推文" />}
      {isReplyModalShow && <ModalContainer value="回覆" />}
      <NavBar isUser={true} onTweetClick={handleTweetClick} status="首頁" />
      <MainContainer>
        <Header backIcon="true">
          <h1>推文</h1>
        </Header>
        <TweetCard
          tweet={tweet}
          tweetId={tweetId}
          isTweetLike={isTweetLike}
          setIsTweetLike={setIsTweetLike}
          currentLikeCount={currentLikeCount}
          setCurrentLikeCount={setCurrentLikeCount}
        />
        {tweetReplies.map((reply) => (
          <ReplyItem
            key={reply.id}
            userId={reply.UserId}
            avatar={reply.User?.avatar}
            name={reply.User?.name}
            account={reply.User?.account}
            createdAt={reply.createdAt}
            replyToAccount={reply.Tweet?.User?.account}
            comment={reply.comment}
          />
        ))}
      </MainContainer>
      <SideBar />
    </PageContainer>
  );
}

export default TweetPage;
