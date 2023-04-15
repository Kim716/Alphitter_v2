import styled from "styled-components";
import { useContext, useEffect } from "react";
import { getTopUsers } from "api/tweetAuth";
import { InfoContext } from "contexts/InfoContext";

// components
import Button from "./Button";
import AvatarLink from "./AvatarLink";

const StyledDiv = styled.div`
  height: 100vh;
  padding: 10px 25px;
`;

const StyledPopular = styled.div`
  background-color: var(--grey1);
  width: 270px;

  .header {
    padding: 24px;
    border-bottom: 1px solid var(--grey3);
    h1 {
      width: 96px;
      height: 26px;
      font-weight: 700;
      font-size: 24px;
    }
  }
`;

const StyledPopularItem = styled.div`
  height: 60px;
  padding: 10px;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }

  .user-title {
    margin: 0 10px;
    width: 80px;

    p {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      line-height: 1.3;
    }

    .user-name {
      font-weight: bold;
    }
  }
`;

function PopularCard({ id, name, account, avatar, isFollowed, onFollowClick }) {
  return (
    <StyledPopularItem className="flex">
      <AvatarLink avatar={avatar} userId={id} />
      <div className="user-title flex flex-col">
        <p className="user-name">{name}</p>
        <p>@{account}</p>
      </div>
      <Button
        primary
        rounded
        className="text-base ml-auto px-3"
        outline={!isFollowed}
        onClick={() => onFollowClick?.({ id, isFollowed })}
      >
        {isFollowed ? "正在跟隨" : "跟隨"}
      </Button>
    </StyledPopularItem>
  );
}

function SideBar() {
  const { topUsers, setTopUsers, handleFollowClick } = useContext(InfoContext);

  // useEffect
  useEffect(() => {
    const getTopUsersAsync = async () => {
      try {
        const topUsers = await getTopUsers();
        setTopUsers(topUsers.map((topUser) => ({ ...topUser })));
      } catch (error) {
        console.error(error);
      }
    };
    getTopUsersAsync();
  }, [setTopUsers]);

  return (
    <StyledDiv className="col-span-1">
      <StyledPopular>
        <div className="header">
          <h1>推薦跟隨</h1>
        </div>
        {topUsers.map((topUser) => {
          return (
            <PopularCard
              key={topUser.id}
              id={topUser.id}
              name={topUser.name}
              account={topUser.account}
              avatar={topUser.avatar}
              isFollowed={topUser.isFollowed}
              onFollowClick={handleFollowClick}
            />
          );
        })}
      </StyledPopular>
    </StyledDiv>
  );
}

export default SideBar;
