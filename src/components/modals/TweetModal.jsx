import styled from "styled-components";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { postTweet } from "api/tweetAuth";
import { TweetContext } from "contexts/TweetContext";
import { InfoContext } from "contexts/InfoContext";

// Components
import { ReactComponent as CrossFocus } from "assets/icons/cross_focus.svg";
import ActButton from "components/ActButton";

const StyledDiv = styled.div`
  width: 600px;
  height: 300px;
  border-radius: 20px;
  background-color: var(--white);

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }

  // 共同CSS設定
  .cross-box,
  .content {
    padding: 16px;
  }

  .cross-box {
    border-bottom: 1px solid #e6ecf0;

    svg {
      cursor: pointer;

      &:hover {
        path {
          fill: var(--grey9);
        }
      }
    }
  }

  .content {
    textarea {
      margin: 10px;
      height: 150px;
      resize: none; // 禁止拖動改變框的大小
      border: none; // 隱藏邊框
      outline: none; // 輸入過程中不顯示邊框

      font-size: 17px;
    }
  }

  .footer {
    p {
      margin-right: 20px;
      color: var(--grey7);
      font-size: 15px;

      span {
        margin-right: 20px;
        color: var(--error);
      }
    }

    button {
      width: 80px;
      margin-top: auto;
      padding: 8px 16px;
    }
  }
`;

const TweetModal = () => {
  const [description, setDescription] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const { handleTweetClick, tweets, setTweets } = useContext(TweetContext);
  const { loginUserInfo } = useContext(InfoContext);

  const handleAddTweetClick = async () => {
    // 內容空白，或是全為空白格會先被擋掉
    if (description.trim().length === 0) {
      setIsEmpty(true);
      return;
    }

    try {
      const tweetData = await postTweet({ description });

      // 發送失敗就 return，基本上會通過，除非打到一半token效期過了
      if (tweetData.status === "error") {
        return;
      }

      // 伺服器有誤
      if (tweetData.message === "伺服器出現問題，請稍後再使用") {
        Swal.fire({
          position: "top",
          icon: "warning",
          title: tweetData.message,
          timer: 1500,
          showConfirmButton: false,
          customClass: {
            icon: "swalIcon right",
            title: "swalTitle",
          },
        });
        return;
      }

      // 推文成功
      // 清空內容，回歸初始狀態
      setDescription("");
      // 關閉 modal
      handleTweetClick();
      // 跳出成功通知
      Swal.fire({
        position: "top",
        icon: "success",
        title: "推文成功",
        timer: 1500,
        showConfirmButton: false,
        customClass: {
          icon: "swalIcon right",
          title: "swalTitle",
        },
      });

      // 更新畫面 要塞前面
      setTweets([
        {
          ...tweetData,
          likeCount: 0,
          replyCount: 0,
          User: {
            id: loginUserInfo.id,
            account: loginUserInfo.account,
            name: loginUserInfo.name,
            avatar: loginUserInfo.avatar,
          },
          isLiked: false,
        },
        ...tweets,
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <StyledDiv className="d-flex flex-column">
      <div className="cross-box">
        <CrossFocus onClick={handleTweetClick} />
      </div>
      <div className="content flex-grow-1">
        <div className="d-flex">
          <img src={loginUserInfo.avatar} alt="" />
          <textarea
            className="flex-grow-1"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setIsEmpty(false);
            }}
            placeholder="有什麼新鮮事？"
            maxLength="140"
          />
        </div>
        <div className="footer d-flex justify-content-end align-items-center">
          <p>
            {isEmpty && <span>內容不可全為空白</span>}
            {description.length === 140 && <span>字數不可超過140字</span>}
            {description.length}/140
          </p>
          <ActButton buttonName={"推文"} onClick={handleAddTweetClick} />
        </div>
      </div>
    </StyledDiv>
  );
};

export default TweetModal;
