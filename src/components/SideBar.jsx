import styled from "styled-components";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTopUsers } from "api/tweetAuth";
import { InfoContext } from "contexts/InfoContext";

// components
import StatusButton from "components/StatusButton";

const StyledDiv = styled.div`
  height: 100vh;
  border-left: 1px solid var(--grey3);
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
    cursor: pointer;
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

  button {
    margin-left: auto;
  }
`;

function PopularCard({ id, name, account, avatar, isFollowed, onFollowClick }) {
  const navigate = useNavigate();

  const handleAvatarClick = (e) => {
    navigate(`/user/${e.target.dataset.id}`);
  };

  return (
    <StyledPopularItem className="d-flex">
      <img src={avatar} data-id={id} alt="avatar" onClick={handleAvatarClick} />
      <div className="user-title d-flex flex-column">
        <p className="user-name">{name}</p>
        <p>@{account}</p>
      </div>
      <StatusButton
        id={id}
        isFollowed={isFollowed}
        onFollowClick={({ id, isFollowed }) =>
          onFollowClick?.({ id, isFollowed })
        }
      />
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
    // eslint-disable-next-line
  }, []);

  return (
    <StyledDiv className="col-4">
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
