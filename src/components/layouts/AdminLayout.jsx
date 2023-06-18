import { Outlet } from 'react-router-dom';

import NavBar from 'components/NavBar';
import PageContainer from 'components/containers/PageContainer';

function AdminLayout() {
  return (
    <PageContainer>
      <NavBar isUser={false} status="使用者列表" />
      <Outlet />
    </PageContainer>
  );
}

export default AdminLayout;
