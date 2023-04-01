import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "contexts/AdminContext";
import { InfoContext } from "contexts/InfoContext";

function NoMatch() {
  const { isUserLogin, loginAlert } = useContext(InfoContext);
  const { isAdminLogin } = useContext(AdminContext);

  const navigate = useNavigate();

  // !!! 重新導引
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

  return <p>There's nothing here: 404! Redirecting...</p>;
}

export default NoMatch;
