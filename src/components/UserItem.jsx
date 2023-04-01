import styled from "styled-components";

// Components
import StatusButton from "./StatusButton";

const StyledDiv = styled.div`
  padding: 16px 24px;
  border-bottom: 1px solid #e6ecf0;
  img,
  span,
  p,
  svg {
    cursor: pointer;
  }

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
  return (
    <StyledDiv className="d-flex">
      <img src={avatar} alt="" />
      <div className="text-box d-flex flex-column flex-wrap">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <span className="user-name">{name}</span>
            <span className="grey">@{account}</span>
          </div>
          <StatusButton
            id={id}
            isFollowed={isFollowed}
            onFollowClick={({ id, isFollowed }) =>
              onFollowClick?.({ id, isFollowed })
            }
          />
        </div>
        <p className="content">{introduction}</p>
      </div>
    </StyledDiv>
  );
}

export default UserItem;
