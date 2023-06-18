import { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getSingleTweetReplies } from 'api/tweetAuth';
import { TweetContext } from 'contexts/TweetContext';
import { InfoContext } from 'contexts/InfoContext';

// Components
import Header from 'components/Header';

import ReplyItem from 'components/ReplyItem';
import TweetCard from 'components/TweetCard';

function TweetPage() {
  const { tweetReplies, setTweetReplies, getSingleTweetAsync } =
    useContext(TweetContext);
  const { isUserLogin, loginAlert } = useContext(InfoContext);

  const navigate = useNavigate();
  const location = useLocation();
  const tweetId = Number(location.pathname.split('/')[2]);

  // useEffect
  // 驗證登入
  useEffect(() => {
    if (!isUserLogin) {
      loginAlert();
      navigate('/login');
    }
  }, [isUserLogin, loginAlert, navigate]);

  // 取得單一推文資訊
  useEffect(() => {
    const getSingleTweetRepliesAsync = async () => {
      try {
        const singleTweetReplies = await getSingleTweetReplies(tweetId);
        setTweetReplies(singleTweetReplies);
      } catch (error) {
        console.error(error);
      }
    };

    getSingleTweetAsync(tweetId);
    getSingleTweetRepliesAsync();
  }, [getSingleTweetAsync, setTweetReplies, tweetId]);

  return (
    <>
      <Header backIcon="true">
        <h1>推文</h1>
      </Header>
      <TweetCard />
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
    </>
  );
}

export default TweetPage;
