import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { getUserReplies } from 'api/userAuth';
import { InfoContext } from 'contexts/InfoContext';

// Components
import Header from 'components/Header';
import ReplyItem from 'components/ReplyItem';
import SwitchBar from 'components/SwitchBar';
import UserInfo from 'components/UserInfo';

function UserReplysPage() {
  const [userReplies, setUserReplies] = useState([]);
  const [currentPage, setCurrentPage] = useState('replys');

  const { isUserLogin, loginAlert, pageUserInfo, loginUserInfo } =
    useContext(InfoContext);

  const navigate = useNavigate();
  const location = useLocation();

  const pageUserId = Number(location.pathname.split('/')[2]);

  const handlePageChange = (changePage) => {
    if (changePage !== 'replys') {
      setCurrentPage(changePage);
      navigate(`/user/${pageUserId}/${changePage}`);
    }
    if (changePage === 'tweets') {
      setCurrentPage(changePage);
      navigate(`/user/${pageUserId}`);
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

  // 取得當前使用者的回覆
  useEffect(() => {
    const getUserRepliesAsync = async () => {
      try {
        const userRepliesData = await getUserReplies(pageUserId);
        setUserReplies(userRepliesData);
      } catch (error) {
        console.error(error);
      }
    };

    getUserRepliesAsync();
  }, [pageUserId, loginUserInfo]);

  return (
    <>
      <Header backIcon={true}>
        <h1>{pageUserInfo.name}</h1>
        <span>{userReplies.length} 則回覆</span>
      </Header>
      <UserInfo pageUserId={pageUserId} />
      <SwitchBar
        value="info"
        onPageChange={handlePageChange}
        currentPage={currentPage}
      />
      <div>
        {userReplies.map((reply) => (
          <ReplyItem
            key={reply.id}
            userId={reply.UserId}
            avatar={reply.User.avatar}
            name={reply.User.name}
            account={reply.User.account}
            createdAt={reply.createdAt}
            replyToAccount={reply.Tweet.User.account}
            comment={reply.comment}
          />
        ))}
      </div>
    </>
  );
}

export default UserReplysPage;
