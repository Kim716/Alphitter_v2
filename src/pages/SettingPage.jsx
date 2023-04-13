import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import { putUserSettingInfo } from "api/userAuth";
import { TweetContext } from "contexts/TweetContext";
import { InfoContext } from "contexts/InfoContext";

// components
import MainContainer from "components/containers/MainContainer";
import Header from "components/Header";
import NavBar from "components/NavBar";
import Input from "components/Input";
import ModalContainer from "components/containers/ModalContainer";
import Button from "components/Button";

const StyledDiv = styled.div`
  height: 100vh;
  border-right: 1px solid var(--grey3);
  overflow: auto;
`;

const StyledFormDiv = styled.div`
  padding: 24px;
`;

function SettingPage() {
  const { isTweetModalShow, handleTweetClick } = useContext(TweetContext);
  const {
    isUserLogin,
    loginAlert,
    loginUserId,
    loginUserInfo,
    setLoginUserInfo,
  } = useContext(InfoContext);

  const [account, setAccount] = useState(loginUserInfo.account);
  const [name, setName] = useState(loginUserInfo.name);
  const [email, setEmail] = useState(loginUserInfo.email);
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [whichError, setWhichError] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleAccountChange = (e) => {
    setAccount(e.target.value);
  };

  const handleNameChange = (e) => {
    // 清除前一次提醒
    setWhichError([]);
    setErrorMessage("");

    //  超過 50 字的提醒
    if (e.target.value.length > 50) {
      setWhichError(["name"]);
      setErrorMessage("您已輸入超過 50 字");
    }

    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleCheckPasswordChange = (e) => {
    setCheckPassword(e.target.value);
  };

  const handleSaveClick = async (e) => {
    // 清除前一次錯誤訊息
    setWhichError([]);
    setErrorMessage("");

    // 欄位不得為空系列
    if (
      [account, name, email, password, checkPassword].some(
        (value) => value.length === 0
      )
    ) {
      if (account.length === 0) {
        setWhichError((we) => [...we, "account"]);
      }

      if (name.length === 0) {
        setWhichError((we) => [...we, "name"]);
      }

      if (email.length === 0) {
        setWhichError((we) => [...we, "email"]);
      }

      if (password.length === 0) {
        setWhichError((we) => [...we, "password"]);
      }

      if (checkPassword.length === 0) {
        setWhichError((we) => [...we, "checkPassword"]);
      }
      setErrorMessage("欄位不得為空");
      // 有任何一個為空就會先阻擋掉
      return;
    }

    // 帳號、名字不得全為空白系列
    if ([account, name].some((value) => value.trim().length === 0)) {
      if (account.trim().length === 0) {
        setWhichError((we) => [...we, "account"]);
      }
      if (name.trim().length === 0) {
        setWhichError((we) => [...we, "name"]);
      }

      setErrorMessage("帳號、名稱不得全為空白格");
      // 有任何一個為空就會先阻擋掉
      return;
    }

    // 名字超過 50 字
    if (name.length > 50) {
      setWhichError(["name"]);
      setErrorMessage("名稱不能超過 50 個字");
      return;
    }

    // 前端簡易驗證完，跳是否確認儲存的通知，確定才到後端
    Swal.fire({
      title: "確定要儲存嗎？",
      showDenyButton: true,
      confirmButtonText: "確定",
      denyButtonText: "取消",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // 確認儲存就進到後端
        try {
          const { message } = await putUserSettingInfo({
            id: loginUserId,
            account,
            name,
            email,
            password,
            checkPassword,
          });

          // 帳號註冊過
          if (message === "Account 重複註冊") {
            setWhichError(["account"]);
            setErrorMessage(message);
            return;
          }

          // name 超過 50 字
          if (message === "名稱不能超過 50 個字") {
            setWhichError(["account"]);
            setErrorMessage(message);
            return;
          }

          // 信箱格式錯誤
          if (message === "Email 格式有誤") {
            setWhichError(["email"]);
            setErrorMessage(message);
            return;
          }

          // 信箱註冊過
          if (message === "Email 重複註冊") {
            setWhichError(["email"]);
            setErrorMessage(message);
            return;
          }

          // 兩次輸入的密碼不同
          if (message === "兩次輸入的密碼不相同") {
            setWhichError(["password", "checkPassword"]);
            setErrorMessage(message);
            return;
          }

          // 伺服器有誤
          if (message === "伺服器出現問題，請稍後再使用") {
            Swal.fire({
              position: "top",
              icon: "warning",
              title: message,
              timer: 1500,
              showConfirmButton: false,
              customClass: {
                icon: "swalIcon right",
                title: "swalTitle",
              },
            });
            return;
          }

          // 儲存成功跳通知
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

          // 清空密碼欄位
          setPassword("");
          setCheckPassword("");

          // 更新使用者資料
          setLoginUserInfo({
            ...loginUserInfo,
            account,
            name,
            email,
          });
        } catch (error) {
          console.error(error);
        }
      }
    });
  };

  // useEffect
  // 驗證登入
  useEffect(() => {
    if (!isUserLogin) {
      loginAlert();
      navigate("/login");
    }
  }, [isUserLogin, loginAlert, navigate]);

  return (
    <div className="d-flex">
      {isTweetModalShow && <ModalContainer value="推文" />}
      <NavBar isUser={true} onTweetClick={handleTweetClick} status="設定" />
      <MainContainer>
        <StyledDiv className="col-8">
          <Header>
            <h1>帳戶設定</h1>
          </Header>
          <StyledFormDiv>
            <Input
              id="input_account"
              label="帳號"
              type="text"
              placeholder="重新設定帳號"
              value={account}
              onChange={handleAccountChange}
              isError={whichError.some((which) => which === "account")}
              errorMessage={errorMessage}
            />
            <Input
              id="input_name"
              label="名稱"
              type="text"
              placeholder="請設定使用者名稱，不可超過50字"
              value={name}
              onChange={handleNameChange}
              isError={whichError.some((which) => which === "name")}
              errorMessage={errorMessage}
            />
            <Input
              id="input_email"
              label="Email"
              type="text"
              placeholder="請輸入 Email"
              value={email}
              onChange={handleEmailChange}
              isError={whichError.some((which) => which === "email")}
              errorMessage={errorMessage}
            />
            <Input
              id="input_password"
              label="密碼"
              type="password"
              placeholder="請設定密碼"
              value={password}
              onChange={handlePasswordChange}
              isError={whichError.some((which) => which === "password")}
              errorMessage={errorMessage}
            />
            <Input
              id="input_checkPassword"
              label="密碼確認"
              type="password"
              placeholder="請再次輸入密碼"
              value={checkPassword}
              onChange={handleCheckPasswordChange}
              isError={whichError.some((which) => which === "checkPassword")}
              errorMessage={errorMessage}
            />
            <Button
              primary
              rounded
              onClick={handleSaveClick}
              className="px-4 text-base block ml-auto"
            >
              儲存
            </Button>
          </StyledFormDiv>
        </StyledDiv>
      </MainContainer>
    </div>
  );
}

export default SettingPage;
