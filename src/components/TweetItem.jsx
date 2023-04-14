import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { TweetContext } from "contexts/TweetContext";

// Components
import { ReactComponent as ReplyUnfocus } from "assets/icons/reply_unfocus.svg";
import { ReactComponent as CrossUnfocus } from "assets/icons/cross_unfocus.svg";
import AvatarLink from "./AvatarLink";
import LikeIcon from "./LikeIcon";

const StyledDiv = styled.div`
  padding: 16px 24px;
  border-bottom: 1px solid #e6ecf0;
  cursor: pointer;

  // 管理者頁面不需要點擊
  &:has(.delete-btn) {
    cursor: default;
  }

  img {
    width: 50px;
    height: 50px;
    margin-right: 8px;
    border-radius: 50%;
    object-fit: cover;
  }

  .grey {
    font-size: 14px;
    color: var(--secondary);
  }

  // 文字區塊的排版
  .text-box {
    width: calc(${100 % -50}px);

    .user-name {
      font-weight: bold;
      font-size: 16px;
      margin-right: 5px;
    }

    .description {
      overflow-wrap: anywhere;
      padding-top: 8px;
      line-height: 1.6;
    }
  }

  // 使用者頁面，調整3欄式icon排版
  .icon-box {
    margin-top: 10px;
    height: 20px;

    span {
      margin-right: 20px;
      color: var(--secondary);
      font-family: var(--number);
      font-weight: 600;
    }

    svg {
      width: 20px;
      height: 20px;
      margin-right: 5px;

      &:hover {
        path {
          pointer-events: none;
          fill: var(--brand-color);
        }
      }
    }
  }

  // 管理者頁面
  .delete-btn {
    cursor: pointer;

    &:hover {
      path {
        fill: var(--brand-color);
      }
    }
  }
`;

// 前台使用的樣式
function UserTweetItem({
  tweetId,
  avatar,
  userId,
  name,
  account,
  createdAt,
  description,
  replyCount,
  likeCount,
  isLiked,
}) {
  const { handleReplyClick } = useContext(TweetContext);
  const navigate = useNavigate();

  const handleTweetItemClick = () => {
    navigate(`/tweet/${tweetId}`);
  };

  return (
    <StyledDiv
      className="flex"
      data-id={tweetId}
      onClick={handleTweetItemClick}
    >
      <AvatarLink avatar={avatar} userId={userId} />
      <div className="text-box grow">
        <div>
          <span className="user-name">{name}</span>
          <span className="grey">
            @{account}・{createdAt}
          </span>
        </div>
        {/* 最大顯示字數140字 */}
        <p className="description">{description}</p>
        <div className="icon-box flex">
          <div className="flex items-center">
            <ReplyUnfocus onClick={handleReplyClick} data-id={tweetId} />
            <span>{replyCount}</span>
          </div>
          <div className="flex items-center">
            <LikeIcon isLiked={isLiked} tweetId={tweetId} />
            <span>{likeCount}</span>
          </div>
        </div>
      </div>
    </StyledDiv>
  );
}

// 後台使用的樣式
function AdminTweetItem({
  tweetId,
  avatar,
  name,
  account,
  createdAt,
  description,
  onClick,
}) {
  return (
    <StyledDiv className="flex" data-id={tweetId}>
      <img src={avatar} alt="" />
      <div className="flex flex-col flex-wrap grow text-box">
        <div>
          <span className="user-name">{name}</span>
          <span className="grey">
            @{account}・{createdAt}
          </span>
        </div>
        {/* 最大顯示字數140字 */}
        <p className="description">{description}</p>
      </div>
      <CrossUnfocus className="delete-btn" onClick={() => onClick(tweetId)} />
    </StyledDiv>
  );
}

export { UserTweetItem, AdminTweetItem };
