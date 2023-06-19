import { Outlet } from 'react-router-dom';

import NavBar from 'components/NavBar';
import PageContainer from 'components/containers/PageContainer';
import { useState } from 'react';

function AdminLayout() {
  const [activeTitle, setActiveTitle] = useState('推文清單');

  return (
    <PageContainer>
      <NavBar
        isUser={false}
        activeTitle={activeTitle}
        setActiveTitle={setActiveTitle}
      />
      <Outlet />
    </PageContainer>
  );
}

export default AdminLayout;
