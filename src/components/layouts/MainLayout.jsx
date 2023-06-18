import { useContext } from 'react';
import { Outlet } from 'react-router-dom';

import { TweetContext } from 'contexts/TweetContext';

import NavBar from 'components/NavBar';
import SideBar from 'components/SideBar';
import MainContainer from 'components/containers/MainContainer';
import ModalContainer from 'components/containers/ModalContainer';
import PageContainer from 'components/containers/PageContainer';

function MainLayout() {
  const { isTweetModalShow, handleTweetClick, isReplyModalShow } =
    useContext(TweetContext);

  <PageContainer>
    {isTweetModalShow && <ModalContainer value="推文" />}
    {isReplyModalShow && <ModalContainer value="回覆" />}
    <NavBar isUser={true} onTweetClick={handleTweetClick} status="首頁" />
    <MainContainer>
      {/* 放入會更動的頁面內容 */}
      <Outlet />
    </MainContainer>
    <SideBar />
  </PageContainer>;
}

export default MainLayout;
