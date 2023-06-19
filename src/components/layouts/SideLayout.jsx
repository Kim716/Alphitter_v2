import { Outlet } from 'react-router-dom';
import SideBar from 'components/SideBar';
import MainContainer from 'components/containers/MainContainer';

function SideLayout() {
  return (
    <>
      <MainContainer>
        <Outlet />
      </MainContainer>
      <SideBar />
    </>
  );
}

export default SideLayout;
