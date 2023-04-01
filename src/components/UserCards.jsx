import styled from "styled-components";

// Components
import { ReactComponent as TweetsIcon } from "assets/icons/tweets_unfocus.svg";
import { ReactComponent as HeartIcon } from "assets/icons/heart_unfocus.svg";
import Header from "components/Header";

const StyledCardCollection = styled.div`
  width: 100%;
  height: calc(100vh - 75px);
  padding: 16px;
  overflow: scroll;
`;

const StyledUserCard = styled.div`
  background: #f6f7f8;
  height: 314px;
  width: 210px;
  border-radius: 10px;
  margin: 0 16px 16px 0;

  .head {
    position: relative;
    width: 100%;

    .cover {
      width: 100%;
      height: 140px;
      object-fit: cover;
      border-radius: 10px 10px 0 0;
    }

    .avatar {
      position: absolute;
      width: 100px;
      height: 100px;
      border: 4px solid var(--white);
      border-radius: 50%;
      left: 50%;
      top: 45%;
      transform: translateX(-50%);
      object-fit: cover;
    }
  }

  .name {
    margin-top: 32px;
    font-weight: 700;
  }

  .account {
    margin-top: 8px;
    font-size: 14px;
    color: var(--secondary);
  }

  .user-data {
    width: 80%;
    margin-top: 16px;
    color: var(--grey9);

    span {
      margin-left: 4px;
    }
  }

  .follow-data {
    width: 100%;
    margin-top: 14px;
    color: var(--secondary);
    font-size: 14px;

    p:first-child {
      margin-right: 8px;
    }

    span {
      color: var(--grey9);
    }
  }
`;

function UserCard({
  cover,
  avatar,
  account,
  name,
  tweetCount,
  likeCount,
  followingCount,
  followerCount,
}) {
  return (
    <StyledUserCard>
      <div className="head">
        <img src={cover} alt="cover" className="cover" />
        <img src={avatar} alt="avatar" className="avatar" />
      </div>
      <div className="d-flex flex-column align-items-center">
        <h2 className="name">{name}</h2>
        <p className="account">@{account}</p>
        <div className="user-data d-flex justify-content-evenly">
          <p className="d-flex align-items-center justify-content-between">
            <TweetsIcon />
            <span>{tweetCount}</span>
          </p>
          <p className="d-flex align-items-center justify-content-between">
            <HeartIcon />
            <span>{likeCount}</span>
          </p>
        </div>
        <div className="follow-data d-flex justify-content-center">
          <p>
            <span>{followingCount} 個</span>跟隨中
          </p>
          <p>
            <span>{followerCount} 位</span>跟隨者
          </p>
        </div>
      </div>
    </StyledUserCard>
  );
}

function UserCards({ users }) {
  return (
    <div className="col-9">
      <Header>
        <h1>使用者列表</h1>
      </Header>

      <StyledCardCollection className="d-flex flex-wrap">
        {users.map((user) => (
          <UserCard {...user} key={user.id} />
        ))}
      </StyledCardCollection>
    </div>
  );
}

export default UserCards;
