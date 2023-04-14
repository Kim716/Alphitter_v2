import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { TweetContext } from "contexts/TweetContext";

// Components
import { ReactComponent as ReplyIcon } from "assets/icons/reply_unfocus.svg";
import LikeIcon from "./LikeIcon";

const StyledDiv = styled.div`
  background: var(--white);
  padding: 16px;
  border-bottom: 1px solid var(--grey3);

  .card_content,
  .card_info {
    border-bottom: 1px solid var(--grey3);
  }

  .card_content {
    & > * {
      margin-bottom: 8px;
    }

    .content_head {
      img {
        width: 50px;
        height: 50px;
        margin-right: 8px;
        border-radius: 50%;
        object-fit: cover;
        cursor: pointer;
      }

      .name {
        margin-bottom: 8px;
        color: var(--grey9);
        font-weight: 700;
      }

      .account {
        color: var(--secondary);
        font-size: 14px;
      }
    }

    .description {
      font-weight: 300;
      font-size: 24px;
      line-height: 36px;
    }

    .createdAt {
      color: var(--secondary);
      font-weight: 500;
      font-size: 14px;
      line-height: 22px;
    }
  }

  .card_info {
    padding: 16px 0;

    p {
      margin-right: 24px;
      color: var(--secondary);

      span {
        margin-right: 4px;
        font-family: var(--number);
        color: #000000;
        font-weight: 700;
        font-size: 18px;
      }
    }
  }

  .card_action {
    padding-top 18px;

    svg {
      margin-right: 130px;
      width: 30px;
      height: 30px;
      cursor: pointer;      

      &:hover {
      path {
        pointer-events: none;
        fill: var(--brand-color);
      }
    }
    }
  }
`;

function TweetCard() {
  const navigate = useNavigate();

  const { handleReplyClick, tweet } = useContext(TweetContext);

  const handleAvatarClick = (e) => {
    navigate(`/user/${e.target.dataset.id}`);
  };

  return (
    <StyledDiv>
      <div className="card_content">
        <div className="content_head flex items-center">
          <img
            src={tweet.User?.avatar}
            alt="avatar"
            data-id={tweet.User?.id}
            onClick={handleAvatarClick}
          />
          <div>
            <p className="name">{tweet.User?.name}</p>
            <p className="account">@{tweet.User?.account}</p>
          </div>
        </div>
        <p className="description">{tweet.description}</p>
        <p className="createdAt">
          {tweet.createdAt?.split(" ").splice(0, 2).join(" ")}
          {tweet.createdAt?.split(" ")[2] && "・"}
          {tweet.createdAt?.split(" ").splice(2)}
        </p>
      </div>
      <div className="card_info">
        <div className="flex">
          <p>
            <span>{tweet.replyCount}</span>回覆
          </p>
          <p>
            <span>{tweet.likeCount}</span>喜歡
          </p>
        </div>
      </div>
      <div className="card_action flex">
        <ReplyIcon onClick={handleReplyClick} data-id={tweet.id} />
        <LikeIcon isLiked={tweet.isLiked} tweetId={tweet.id} />
      </div>
    </StyledDiv>
  );
}

export default TweetCard;
