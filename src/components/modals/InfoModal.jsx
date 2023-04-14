import { useState, useContext } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { putUserInfo } from "api/userAuth";
import { InfoContext } from "contexts/InfoContext";

// Components
import Input from "components/Input";
import { ReactComponent as AddImg } from "assets/icons/addimg_unfocus.svg";
import { ReactComponent as CrossWhite } from "assets/icons/cross_white.svg";
import { ReactComponent as CrossFocus } from "assets/icons/cross_focus.svg";
import Button from "components/Button";

const StyledDiv = styled.div`
  width: 600px;
  height: 600px;
  border-radius: 20px;
  background-color: var(--white);

  // header的CSS設定
  .cross-box {
    padding: 15px 20px;

    .cross-icon {
      margin-right: 30px;
      padding: 0;
      width: 25px;
      border: none;
      outline: none;
      background-color: transparent;
      cursor: pointer;

      &:hover {
        path {
          fill: var(--grey9);
        }
      }
    }

    h1 {
      font-weight: 700;
      font-size: 18px;
    }
  }
`;

const StyledEditImg = styled.div`
  position: relative;

  svg {
    cursor: pointer;
  }

  .input-file {
    display: none;
  }

  .cover {
    position: relative;
    height: 200px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 200px;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.3);
    }

    // 編輯背景的icon
    .edit-img-item {
      position: absolute;
      z-index: 4;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      svg {
        margin: 20px;

        &:hover {
          path {
            fill: var(--grey9);
          }
        }
      }
    }
  }

  .avatar {
    background-color: var(--success);
    width: 140px;
    height: 140px;
    border-radius: 50%;
    position: absolute;
    z-index: 2;
    left: 5%;
    top: 60%;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }

    &::after {
      content: "";
      position: absolute;
      z-index: 3;
      top: 0;
      left: 0;

      width: 100%;
      height: 100%;
      border: 5px solid var(--white);
      border-radius: 50%;

      background-color: rgba(0, 0, 0, 0.3);
    }

    // 編輯頭像的icon
    .avatar-item {
      position: absolute;
      z-index: 4;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      &:hover {
        path {
          fill: var(--grey9);
        }
      }
    }
  }
`;

const StyledEditText = styled.div`
  position: relative;
  width: 100%;
  margin-top: 60px;
  padding: 15px 20px;

  div {
    margin: 0;
  }

  p {
    margin: 5px;
    color: var(--secondary);
    text-align: end;

    span {
      margin-right: 20px;
      color: var(--error);
    }
  }
`;

function InfoModal() {
  const {
    handleInfoEditClick,
    loginUserId,
    pageUserInfo,
    setPageUserInfo,
    loginUserInfo,
    setLoginUserInfo,
  } = useContext(InfoContext);

  const [cover, setCover] = useState(loginUserInfo.cover);
  const [avatar, setAvatar] = useState(loginUserInfo.avatar);
  const [name, setName] = useState(loginUserInfo.name);
  const [introduction, setIntroduction] = useState(
    loginUserInfo.introduction || ""
  );
  const [isNameEmpty, setIsNameEmpty] = useState(false);
  const [coverFile, setCoverFile] = useState("");
  const [avatarFile, setAvatarFile] = useState("");

  const handleChangeImg = (event) => {
    const fileMaxSize = 1024 * 1024 * 20; // 20MB
    const file = event.target.files[0];

    // 超過檔案大小就先擋
    if (file.size > fileMaxSize) {
      // 跳通知
      Swal.fire({
        icon: "error",
        text: "檔案超過 20MB",
      });

      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener(
      "load",
      function () {
        if (event.target.name === "cover") {
          setCover(reader.result);
          setCoverFile(file);
        }
        if (event.target.name === "avatar") {
          setAvatar(reader.result);
          setAvatarFile(file);
        }
      },
      false
    );
  };

  const handleDeleteImg = () => {
    setCover(pageUserInfo.cover);
  };

  const handleNameChange = (e) => {
    setIsNameEmpty(false);
    setName(e.target.value);
  };

  const handleIntroductionChange = (e) => {
    setIntroduction(e.target.value);
  };

  const handleSaveClick = async (e) => {
    // name 內容空白，或是全為空白格會先被擋掉
    if (name.trim().length === 0) {
      setIsNameEmpty(true);
      return;
    }

    try {
      const { status } = await putUserInfo({
        loginUserId,
        name,
        introduction,
        avatar: avatarFile,
        cover: coverFile,
      });

      // 成功
      if (status === "success") {
        // 跳通知
        Swal.fire({
          position: "top",
          icon: "success",
          title: "儲存成功",
          timer: 1500,
          showConfirmButton: false,
          customClass: {
            icon: "swalIcon right",
            title: "swalTitle",
          },
        });
        // 關 modal
        handleInfoEditClick();
        // 更新畫面資訊
        setPageUserInfo((preInfo) => {
          return { ...preInfo, name, introduction, avatar, cover };
        });
        // 更新目前登入者資訊
        setLoginUserInfo({
          ...loginUserInfo,
          name,
          introduction,
          avatar,
          cover,
        });

        return;
      }

      // 失敗通知
      Swal.fire({
        icon: "error",
        text: "儲存失敗",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <StyledDiv>
      <header className="cross-box flex justify-between">
        <div className="flex items-center">
          <button className="cross-icon">
            <CrossFocus onClick={handleInfoEditClick} />
          </button>
          <h1>編輯個人資料</h1>
        </div>
        <Button
          primary
          rounded
          onClick={handleSaveClick}
          className="px-4 text-base"
        >
          儲存
        </Button>
      </header>

      {/* 圖片區 */}
      <StyledEditImg>
        <div className="cover">
          <img src={cover} alt="cover" />
          <div className="edit-img-item flex">
            <label htmlFor="addCover">
              <AddImg />
              <input
                className="input-file"
                id="addCover"
                name="cover"
                type="file"
                accept="image/.jpg, .jpeg, .png"
                onChange={handleChangeImg}
              />
            </label>
            <label onClick={handleDeleteImg}>
              <CrossWhite />
            </label>
          </div>
        </div>

        <div className="avatar">
          <img src={avatar} alt="avatar" />
          <div className="avatar-item">
            <label htmlFor="addAvatar">
              <AddImg />
              <input
                className="input-file"
                id="addAvatar"
                name="avatar"
                type="file"
                accept="image/.jpg, .jpeg, .png"
                onChange={handleChangeImg}
              />
            </label>
          </div>
        </div>
      </StyledEditImg>

      {/* 文字區 */}
      <StyledEditText>
        <Input
          className="input-text"
          id="user_name"
          label="名稱"
          type="text"
          maxLength="50"
          value={name}
          onChange={handleNameChange}
          isError={isNameEmpty || name.length === 50}
        />
        <p>
          {isNameEmpty && <span>內容不可全為空白</span>}
          {name.length === 50 && <span>字數不可超過50字</span>}
          {name.length}/50
        </p>
        <Input
          className="input-text"
          id="user_introduce"
          label="自我介紹"
          placeholder="介紹一下你自己吧"
          type="text"
          maxLength="160"
          value={introduction}
          onChange={handleIntroductionChange}
          isTextarea={true}
          isError={introduction?.length === 160}
        />
        <p>
          {introduction?.length === 160 && <span>字數不可超過160字</span>}
          {introduction?.length}/160
        </p>
      </StyledEditText>
    </StyledDiv>
  );
}

export default InfoModal;
