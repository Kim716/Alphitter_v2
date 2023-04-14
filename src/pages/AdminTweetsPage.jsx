import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { deleteTweet, getAdminTweets } from "api/adminAuth";
import { AdminContext } from "contexts/AdminContext";

// components
import NavBar from "components/NavBar";
import Header from "components/Header";
import { AdminTweetItem } from "components/TweetItem";
import PageContainer from "components/containers/PageContainer";

const StyledTweetsDiv = styled.div`
  border-right: 1px solid #e6ecf0;
`;

const StyledTweetsCollection = styled.div`
  width: 100%;
  height: calc(100vh - 75px);
  overflow: auto;
`;

function AdminTweetsPage() {
  const [tweets, setTweets] = useState([]);

  const { isAdminLogin, loginAlert } = useContext(AdminContext);
  const navigate = useNavigate();

  const handleDeleteClick = (id) => {
    // 跳是否確認刪除的提示
    Swal.fire({
      title: "確定要刪除嗎？",
      showDenyButton: true,
      confirmButtonText: "確定",
      denyButtonText: "取消",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // 確認刪除就進到後端
        try {
          const { status, message } = await deleteTweet(id);

          if (status === "success") {
            // 更新推文資料
            setTweets((prevTweets) =>
              prevTweets.filter((tweet) => tweet.id !== id)
            );

            // 跳通知
            Swal.fire({
              position: "top",
              icon: "success",
              title: message,
              timer: 1500,
              showConfirmButton: false,
              customClass: {
                icon: "swalIcon right",
                title: "swalTitle",
              },
            });
            return;
          }

          // 失敗通知
          Swal.fire({
            position: "top",
            icon: "error",
            title: message,
            timer: 1500,
            showConfirmButton: false,
            customClass: {
              icon: "swalIcon right",
              title: "swalTitle",
            },
          });
        } catch (error) {
          console.error(error);
        }
      }
    });
  };

  // useEffect
  // 驗證登入
  useEffect(() => {
    if (!isAdminLogin) {
      loginAlert();
      navigate("/admin");
    }
  }, [isAdminLogin, loginAlert, navigate]);

  // 管理者取得所有推文
  useEffect(() => {
    const showTweets = async () => {
      const tweetItems = await getAdminTweets();
      setTweets(tweetItems);
    };

    showTweets();
  }, []);

  return (
    <PageContainer>
      <NavBar isUser={false} status="推文清單" />
      <StyledTweetsDiv className="col-span-2">
        <Header>
          <h1>推文清單</h1>
        </Header>
        <StyledTweetsCollection>
          {/* 使用 map 跑陣列 */}
          {tweets.map((tweet) => (
            <AdminTweetItem
              key={tweet.id}
              tweetId={tweet.id}
              avatar={tweet.User.avatar}
              name={tweet.User.name}
              account={tweet.User.account}
              createdAt={tweet.createdAt}
              description={tweet.description}
              onClick={handleDeleteClick}
            />
          ))}
        </StyledTweetsCollection>
      </StyledTweetsDiv>
    </PageContainer>
  );
}

export default AdminTweetsPage;
