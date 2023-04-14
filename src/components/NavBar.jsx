import { useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { InfoContext } from "contexts/InfoContext";
import { AdminContext } from "contexts/AdminContext";

// Components
import Logo from "./Logo";
import LinkItem from "./LinkItem";
import Button from "./Button";

const StyledNav = styled.div`
  height: 100vh;
  border-right: 1px solid var(--grey3);
  padding: 20px;

  & .nav {
    width: 178px;
  }

  & .logout {
    margin-top: auto;
  }
`;

function NavBarLinks({ isUser, onTweetClick, status }) {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  if (isUser) {
    return (
      <>
        <LinkItem
          title="首頁"
          isClick={status === "首頁"}
          onClick={() => navigate("/main")}
        />
        <LinkItem
          title="個人資料"
          isClick={status === "個人資料"}
          onClick={() => navigate(`/user/${userId}`)}
        />
        <LinkItem
          title="設定"
          isClick={status === "設定"}
          onClick={() => navigate("/setting")}
        />

        <Button primary rounded className="w-full" onClick={onTweetClick}>
          推文
        </Button>
      </>
    );
  }

  return (
    <>
      <LinkItem
        title="推文清單"
        isClick={status === "推文清單"}
        onClick={() => navigate("/admin/tweets")}
      />
      <LinkItem
        title="使用者列表"
        isClick={status === "使用者列表"}
        onClick={() => navigate("/admin/users")}
      />
    </>
  );
}

function NavBar({ isUser, onTweetClick, status }) {
  const { setIsUserLogin } = useContext(InfoContext);
  const { setIsAdminLogin } = useContext(AdminContext);

  const navigate = useNavigate();

  const handleLogoutClick = () => {
    // 跳通知
    Swal.fire({
      position: "top",
      icon: "success",
      title: "登出成功",
      timer: 1500,
      showConfirmButton: false,
      customClass: {
        icon: "swalIcon right",
        title: "swalTitle",
      },
    });

    // 後台登出回後台登入頁
    if (localStorage.getItem("adminToken")) {
      setIsAdminLogin(false);
      navigate("/admin");
      localStorage.removeItem("adminToken");
      return;
    }

    // 前台登出回前台登入頁
    if (localStorage.getItem("token")) {
      setIsUserLogin(false);
      navigate("/login");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
    }
  };

  return (
    <StyledNav className="col-span-1 flex flex-col items-end">
      <div className="nav flex flex-col grow ">
        <Logo />
        <div className="navLinks flex flex-col justify-between grow">
          <div>
            <NavBarLinks
              isUser={isUser}
              onTweetClick={onTweetClick}
              status={status}
            />
          </div>
          <div className="logout">
            <LinkItem title="登出" onClick={handleLogoutClick} />
          </div>
        </div>
      </div>
    </StyledNav>
  );
}

export default NavBar;
