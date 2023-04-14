import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdminUsers } from "api/adminAuth";
import { AdminContext } from "contexts/AdminContext";

// Components
import NavBar from "components/NavBar";
import UserCards from "components/UserCards";
import PageContainer from "components/containers/PageContainer";

function AdminUsersPage() {
  const [users, setUsers] = useState([]);

  const { isAdminLogin, loginAlert } = useContext(AdminContext);
  const navigate = useNavigate();

  // useEffect
  // 驗證登入
  useEffect(() => {
    if (!isAdminLogin) {
      loginAlert();
      navigate("/admin");
    }
  }, [isAdminLogin, loginAlert, navigate]);

  // 取得使用者資料
  useEffect(() => {
    const showUsers = async () => {
      const userItems = await getAdminUsers();
      setUsers(userItems.filter((user) => user.account !== "root"));
    };
    showUsers();
  }, []);

  return (
    <PageContainer>
      <NavBar isUser={false} status="使用者列表" />
      <UserCards users={users} />
    </PageContainer>
  );
}

export default AdminUsersPage;
