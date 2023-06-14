import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "contexts/AdminContext";
import { InfoContext } from "contexts/InfoContext";

function NoMatch() {
  const { isUserLogin, loginAlert } = useContext(InfoContext);
  const { isAdminLogin } = useContext(AdminContext);
  const mounted = useRef(false);

  const navigate = useNavigate();

  // 重新導引
  useEffect(() => {
    if (isUserLogin) {
      navigate("/main");
    } else if (isAdminLogin) {
      navigate("/admin/tweets");
    } else {
      loginAlert();
      navigate("/login");
    }
  }, [isAdminLogin, isUserLogin, loginAlert, navigate]);

  // 用來立初始 render 的 flag
  // !!! 後來想想，加上去好像也不太對，如果我是直接在其他網站輸入了首頁，雖然是 initial render，但還是需要跳通知擋掉
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  return <p>There's nothing here: 404! Redirecting...</p>;
}

export default NoMatch;
