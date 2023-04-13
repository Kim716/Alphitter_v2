import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { postReply } from "api/tweetAuth";
import { TweetContext } from "contexts/TweetContext";
import { InfoContext } from "contexts/InfoContext";

// Components
import { ReactComponent as CrossFocus } from "assets/icons/cross_focus.svg";
import Button from "components/Button";

const StyledDiv = styled.div`
  width: 600px;
  height: 500px;
  position: relative;
  z-index: 3;
  border-radius: 20px;
  background-color: var(--white);

  .cross-box {
    padding: 15px;
    border-bottom: 1px solid #e6ecf0;
    cursor: pointer;

    &:hover {
      path {
        fill: var(--grey9);
      }
    }
  }
`;

const StyledContent = styled.div`
  padding: 25px;
  line-height: 1.5;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }

  .side-line {
    margin: 15px 25px;
    width: 2px;
    height: 115px;
    background-color: var(--grey5);
  }

  .content-area {
    .title {
      .user-name {
        margin-right: 5px;
        font-weight: bold;
        font-size: 20px;
      }

      span {
        color: var(--secondary);
        font-size: 14px;
      }
    }

    .tweet-text {
      font-size: 16px;
      line-height: 26px;
      min-height: 130px;
    }

    .reply-to {
      margin-top: 5px;
      color: var(--secondary);
      font-size: 14px;

      .account {
        margin-left: 5px;
        color: var(--brand-color);
      }
    }
  }

  textarea {
    margin-top: 10px;
    width: 100%;
    height: 150px;
    padding: 10px;
    resize: none; //禁止拖動改變框的大小
    border: none;
    outline: none;
    font-size: 17px;
  }

  .hint {
    color: var(--grey7);
  }

  .error {
    color: var(--error);
  }
`;

function ReplyModal() {
  const [comment, setComment] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const {
    handleReplyClick,
    getSingleTweetAsync,
    tweet,
    setTweet,
    tweetId,
    tweetReplies,
    setTweetReplies,
    tweets,
    setTweets,
  } = useContext(TweetContext);
  const { loginUserInfo, userLikedTweets, setUserLikedTweets } =
    useContext(InfoContext);

  const handleAddReplyClick = async () => {
    // 內容空白，或是全為空白格會先被擋掉
    if (comment.trim().length === 0) {
      setIsEmpty(true);
      return;
    }

    try {
      const replyData = await postReply({ tweetId, comment });

      // 發送失敗就 return，基本上會通過，除非打到一半token效期過了
      if (replyData.status === "error") {
        return;
      }

      // 伺服器有誤
      if (replyData.message === "伺服器出現問題，請稍後再使用") {
        Swal.fire({
          position: "top",
          icon: "warning",
          title: replyData.message,
          timer: 1500,
          showConfirmButton: false,
          customClass: {
            icon: "swalIcon right",
            title: "swalTitle",
          },
        });
        return;
      }

      // 回覆成功
      // 清空內容，回歸初始狀態
      setComment("");
      // 關閉 modal
      handleReplyClick();
      // 跳出成功通知
      Swal.fire({
        position: "top",
        icon: "success",
        title: "回覆成功",
        timer: 1500,
        showConfirmButton: false,
        customClass: {
          icon: "swalIcon right",
          title: "swalTitle",
        },
      });

      // 更新單一推文畫面，塞前面
      setTweetReplies([replyData, ...tweetReplies]);
      setTweet({ ...tweet, replyCount: tweet.replyCount + 1 });
      // 更新瀏覽全部 tweets 的回覆數字
      setTweets(
        tweets.map((tweet) => {
          if (tweet.id === tweetId) {
            return { ...tweet, replyCount: tweet.replyCount + 1 };
          }
          return tweet;
        })
      );

      // 更新瀏覽喜愛 tweets 的回覆數字
      setUserLikedTweets(
        userLikedTweets.map((tweet) => {
          if (tweet.TweetId === tweetId) {
            return {
              ...tweet,
              Tweet: { ...tweet.Tweet, replyCount: tweet.Tweet.replyCount + 1 },
            };
          }
          return tweet;
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSingleTweetAsync(tweetId);
    //eslint-disable-next-line
  }, []);

  return (
    <StyledDiv>
      <div className="cross-box">
        <CrossFocus onClick={handleReplyClick} />
      </div>
      <StyledContent className="d-flex">
        <div className="d-flex flex-column me-3">
          <img src={tweet.User?.avatar} alt="avatar" />
          <div className="side-line d-flex justify-content-center align-items-center"></div>
          <img src={loginUserInfo.avatar} alt="" />
        </div>
        <div className="content-area flex-grow-1">
          <div className="d-flex align-items-center title">
            <p className="user-name">{tweet.User?.name}</p>
            <span className="grey">
              @ {tweet.User?.account} · {tweet.createdAt}
            </span>
          </div>
          <p className="tweet-text">{tweet.description}</p>
          <p className="reply-to">
            回覆給
            <span className="account">@{tweet.User?.account}</span>
          </p>
          <textarea
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
              setIsEmpty(false);
            }}
            placeholder="推你的回覆"
            maxLength="140"
          />
          <div className="d-flex justify-content-end align-items-center">
            <p className="hint me-3">
              {isEmpty && <span className="error me-3">內容不可全為空白</span>}
              {comment.length === 140 && (
                <span className="error me-3">字數不可超過140字</span>
              )}
              {comment.length}/140
            </p>
            <Button
              primary
              rounded
              onClick={handleAddReplyClick}
              className="px-4 text-base"
            >
              回覆
            </Button>
          </div>
        </div>
      </StyledContent>
    </StyledDiv>
  );
}

export default ReplyModal;
