import styled from "styled-components";
import { useContext } from "react";
import { InfoContext } from "contexts/InfoContext";

// Components
import Button from "./Button";
import AvatarLink from "./AvatarLink";

const StyledDiv = styled.div`
  padding: 16px 24px;
  border-bottom: 1px solid #e6ecf0;

  .grey {
    color: var(--secondary);
  }

  img {
    width: 50px;
    height: 50px;
    float: left;
    margin-right: 8px;
    border-radius: 50%;
    object-fit: cover;
  }

  // 文字區塊的排版
  .text-box {
    width: 100%;
    .user-name {
      font-weight: bold;
      font-size: 20px;
      margin-right: 5px;
    }

    .content {
      margin-top: 5px;
      overflow-wrap: break-word;
      line-height: 1.6;
    }
  }
`;

function UserItem({
  id,
  name,
  account,
  introduction,
  avatar,
  isFollowed,
  onFollowClick,
}) {
  const { loginUserId } = useContext(InfoContext);

  return (
    <StyledDiv className="flex">
      <AvatarLink avatar={avatar} userId={id} />
      <div className="text-box flex flex-col flex-wrap">
        <div className="flex justify-between items-center">
          <div>
            <span className="user-name">{name}</span>
            <span className="grey">@{account}</span>
          </div>
          {loginUserId !== id && (
            <Button
              primary
              rounded
              className="text-base px-3"
              outline={!isFollowed}
              onClick={() => onFollowClick?.({ id, isFollowed })}
            >
              {isFollowed ? "正在跟隨" : "跟隨"}
            </Button>
          )}
        </div>
        <p className="content">{introduction}</p>
      </div>
    </StyledDiv>
  );
}

export default UserItem;
