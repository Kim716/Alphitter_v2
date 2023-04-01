import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { login } from "api/userAuth";
import { InfoContext } from "contexts/InfoContext";

// components
import AuthContainer from "components/containers/AuthContainer";
import Logo from "components/Logo";
import Title from "components/Title";
import Input from "components/Input";
import ActButton from "components/ActButton";

function LoginPage() {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [whichError, setWhichError] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const { isUserLogin, setIsUserLogin } = useContext(InfoContext);

  const navigate = useNavigate();

  const handleAccountChange = (e) => {
    setAccount(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 清除前一次錯誤訊息
    setWhichError([]);
    setErrorMessage("");

    // 欄位不得為空系列
    if ([account, password].some((value) => value.length === 0)) {
      if (account.length === 0) {
        setWhichError((we) => [...we, "account"]);
      }

      if (password.length === 0) {
        setWhichError((we) => [...we, "password"]);
      }

      setErrorMessage("欄位不得為空");
      // 有任何一個為空就會先阻擋掉
      return;
    }

    try {
      const { message, token, id } = await login({ account, password });

      // 帳號或密碼有誤
      if (!token) {
        setWhichError(["account", "password"]);
        setErrorMessage(message);
        return;
      }

      // 如果 token 存在代表登入成功
      if (token) {
        // 儲存 token ,id
        localStorage.setItem("token", token);
        localStorage.setItem("userId", id);

        // 跳通知
        Swal.fire({
          position: "top",
          icon: "success",
          title: message,
          timer: 1500,
          showConfirmButton: false,
          customClass: {
            icon: "swalIcon right",
            title: "swalTitle",
          },
        });

        // 更新使用者登入狀態
        setIsUserLogin(true);
        // 跳轉頁面
        navigate("/main");

        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 驗證登入
  useEffect(() => {
    if (isUserLogin) {
      navigate("/main");
    }
  }, [isUserLogin, navigate]);

  return (
    <AuthContainer>
      <Logo />
      <Title>登入 Alphitter</Title>
      <form onSubmit={handleSubmit}>
        <Input
          id="login_account"
          label="帳號"
          type="text"
          placeholder="請輸入帳號"
          value={account}
          onChange={handleAccountChange}
          isError={whichError.some((which) => which === "account")}
          errorMessage={errorMessage}
        />
        <Input
          id="login_password"
          label="密碼"
          type="password"
          placeholder="請輸入密碼"
          value={password}
          onChange={handlePasswordChange}
          isError={whichError.some((which) => which === "password")}
          errorMessage={errorMessage}
        />
        <ActButton buttonName="登入" />
      </form>
      <div className="d-flex justify-content-end mt-3 p-2">
        <Link to="/register">註冊</Link>
        <span className="mx-2">・</span>
        <Link to="/admin">後台登入</Link>
      </div>
    </AuthContainer>
  );
}

export default LoginPage;
