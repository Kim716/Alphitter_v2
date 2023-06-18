import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { getUserTweets } from 'api/userAuth';
import { TweetContext } from 'contexts/TweetContext';
import { InfoContext } from 'contexts/InfoContext';

// Component
import Header from 'components/Header';
import SwitchBar from 'components/SwitchBar';
import UserInfo from 'components/UserInfo';
import { UserTweetItem } from 'components/TweetItem';

function UserMainPage() {
  const [currentPage, setCurrentPage] = useState('tweets');

  const { tweets, setTweets } = useContext(TweetContext);
  const { isUserLogin, loginAlert, pageUserInfo, loginUserInfo } =
    useContext(InfoContext);

  const navigate = useNavigate();
  const location = useLocation();

  const pageUserId = Number(location.pathname.split('/')[2]);

  const handlePageChange = (changePage) => {
    if (changePage !== 'tweets') {
      setCurrentPage(changePage);
      navigate(`/user/${pageUserId}/${changePage}`);
    }
  };

  // useEffect
  // 驗證登入
  useEffect(() => {
    if (!isUserLogin) {
      loginAlert();
      navigate('/login');
    }
  }, [isUserLogin, loginAlert, navigate]);

  // 取得當前頁面使用者發過的推文
  useEffect(() => {
    const getUserTweetsAsync = async () => {
      try {
        const userTweetsData = await getUserTweets(pageUserId);
        setTweets(userTweetsData);
      } catch (error) {
        console.error(error);
      }
    };

    getUserTweetsAsync();
  }, [pageUserId, setTweets, loginUserInfo]);

  return (
    <>
      <Header backIcon={true}>
        <h1>{pageUserInfo.name}</h1>
        <span>{tweets.length} 則推文</span>
      </Header>
      <UserInfo pageUserId={pageUserId} />
      <SwitchBar
        value="info"
        onPageChange={handlePageChange}
        currentPage={currentPage}
      />
      <div>
        {tweets.map((tweet) => (
          <UserTweetItem
            key={tweet.id}
            tweetId={tweet.id}
            avatar={tweet.User.avatar}
            userId={tweet.User.id}
            name={tweet.User.name}
            account={tweet.User.account}
            createdAt={tweet.createdAt}
            description={tweet.description}
            replyCount={tweet.replyCount}
            likeCount={tweet.likeCount}
            isLiked={tweet.isLiked}
          />
        ))}
      </div>
    </>
  );
}

export default UserMainPage;
