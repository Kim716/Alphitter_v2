import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { postTweetLike, postTweetUnLike } from "api/tweetAuth";
import { TweetContext } from "contexts/TweetContext";

// Components
import { ReactComponent as ReplyIcon } from "assets/icons/reply_unfocus.svg";
import { ReactComponent as UnLikeIcon } from "assets/icons/heart_unfocus.svg";
import { ReactComponent as LikeIcon } from "assets/icons/heart_focus.svg";

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

function TweetCard({
  tweetId,
  isTweetLike,
  setIsTweetLike,
  currentLikeCount,
  setCurrentLikeCount,
}) {
  const navigate = useNavigate();

  const { handleReplyClick, getSingleTweetAsync, tweet } =
    useContext(TweetContext);

  const handleLikeClick = async (e) => {
    e.stopPropagation();
    try {
      if (isTweetLike) {
        await postTweetUnLike(tweet.id);
        setCurrentLikeCount(currentLikeCount - 1);
      } else {
        await postTweetLike(tweet.id);
        setCurrentLikeCount(currentLikeCount + 1);
      }
      setIsTweetLike(!isTweetLike);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAvatarClick = (e) => {
    navigate(`/user/${e.target.dataset.id}`);
  };

  useEffect(() => {
    getSingleTweetAsync(tweetId);
    //eslint-disable-next-line
  }, []);

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
            <span>{currentLikeCount}</span>喜歡
          </p>
        </div>
      </div>
      <div className="card_action flex">
        <ReplyIcon onClick={handleReplyClick} data-id={tweet.id} />
        {isTweetLike ? (
          <LikeIcon onClick={handleLikeClick} />
        ) : (
          <UnLikeIcon onClick={handleLikeClick} />
        )}
      </div>
    </StyledDiv>
  );
}

export default TweetCard;
