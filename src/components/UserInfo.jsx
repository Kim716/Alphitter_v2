import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// Components
import { ReactComponent as EmailIcon } from "assets/icons/mail_unfocus.svg";
import { ReactComponent as NotiFocus } from "assets/icons/noti_focus.svg";
import { ReactComponent as NotiUnfocus } from "assets/icons/noti_unfocus.svg";
import { InfoContext } from "contexts/InfoContext";
import ModalContainer from "./containers/ModalContainer";
import Button from "./Button";

const StyledDiv = styled.div`
  .image-box {
    position: relative;

    & .cover {
      width: 100%;
      height: 150px;
      object-fit: cover;
    }

    & .avatar {
      width: 120px;
      height: 120px;
      position: absolute;
      left: 5%;
      top: 40%;

      border-radius: 50%;
      border: 5px solid var(--white);
      object-fit: cover;
    }
  }

  .text-box {
    margin: 0 30px;

    p,
    h1,
    div {
      margin: 5px 0;
    }

    & h1 {
      font-weight: 700;
      font-size: 18px;
    }

    & .grey {
      color: var(--secondary);
      font-size: 14px;
    }

    & p {
      font-weight: 400;
      font-size: 14px;
      line-height: 1.5;
    }

    & .follow-box {
      span {
        font-weight: bold;
        cursor: pointer;
      }

      p {
        margin-right: 20px;
      }
    }
  }
`;

const StyledIcon = styled.div`
  margin: 20px 20px 20px auto;
  svg {
    width: 40px;
    height: 40px;
    margin-right: 10px;
    cursor: pointer;
  }
`;

const StyledActButton = styled.div`
  margin: 20px 20px 20px auto;
  }
`;

function EditInfoButton({ onClick }) {
  return (
    <StyledActButton>
      <Button
        primary
        rounded
        outline
        onClick={onClick}
        className="px-4 text-base"
      >
        編輯個人資料
      </Button>
    </StyledActButton>
  );
}

function OtherInfoButton({ pageUserInfo, handleFollowClick }) {
  const [isNoti, setIsNoto] = useState(false);

  const handleNotiChange = () => {
    setIsNoto(!isNoti);
  };

  return (
    <StyledIcon className="flex justify-end">
      <EmailIcon />
      <div onClick={handleNotiChange}>
        {isNoti ? <NotiFocus /> : <NotiUnfocus />}
      </div>
      <Button
        primary
        rounded
        className="text-base px-3"
        outline={!pageUserInfo.isFollowed}
        onClick={() => {
          handleFollowClick({
            id: pageUserInfo.id,
            isFollowed: pageUserInfo.isFollowed,
          });
        }}
      >
        {pageUserInfo.isFollowed ? "正在跟隨" : "跟隨"}
      </Button>
    </StyledIcon>
  );
}

function UserInfo({ pageUserId }) {
  const {
    isInfoModalShow,
    handleInfoEditClick,
    pageUserInfo,
    handleFollowClick,
  } = useContext(InfoContext);

  const loginUserId = Number(localStorage.getItem("userId"));

  const navigate = useNavigate();

  return (
    <StyledDiv>
      {isInfoModalShow && <ModalContainer value="編輯個人資料" />}
      <div className="image-box flex flex-col">
        <img className="cover" src={pageUserInfo.cover} alt="" />
        <img className="avatar" src={pageUserInfo.avatar} alt="" />
        {pageUserId === loginUserId ? (
          <EditInfoButton onClick={handleInfoEditClick} />
        ) : (
          <OtherInfoButton
            pageUserInfo={pageUserInfo}
            handleFollowClick={handleFollowClick}
          />
        )}
      </div>
      <div className="text-box">
        <h1>{pageUserInfo.name}</h1>
        <span className="grey">@{pageUserInfo.account}</span>
        <p>{pageUserInfo.introduction}</p>
        <div className="follow-box flex">
          <p onClick={() => navigate(`/user/${pageUserId}/followers`)}>
            <span>{pageUserInfo.followerCount} 個</span>
            <span className="grey">跟隨者</span>
          </p>
          <p onClick={() => navigate(`/user/${pageUserId}/following`)}>
            <span>{pageUserInfo.followingCount} 個</span>
            <span className="grey">正在跟隨</span>
          </p>
        </div>
      </div>
    </StyledDiv>
  );
}

export default UserInfo;
