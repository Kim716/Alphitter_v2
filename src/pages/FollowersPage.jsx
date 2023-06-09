import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { getFollowers } from 'api/userAuth';
import { InfoContext } from 'contexts/InfoContext';

// Components
import Header from 'components/Header';
import SwitchBar from 'components/SwitchBar';
import UserItem from 'components/UserItem';

function FollowersPage() {
  const [currentPage, setCurrentPage] = useState('followers');

  const {
    isUserLogin,
    loginAlert,
    pageUserInfo,
    followers,
    setFollowers,
    handleFollowClick,
  } = useContext(InfoContext);

  const navigate = useNavigate();
  const location = useLocation();
  const pageUserId = Number(location.pathname.split('/')[2]);

  // 換頁
  const handlePageChange = (changePage) => {
    if (changePage !== 'followers') {
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
  }, [pageUserId, setFollowers]);

  return (
    <>
      <Header backIcon={true}>
        <h1>{pageUserInfo.name}</h1>
        <span>{followers.length} 個跟隨者</span>
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
    </>
  );
}

export default FollowersPage;
