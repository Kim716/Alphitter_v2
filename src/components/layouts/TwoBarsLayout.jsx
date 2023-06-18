import { useContext, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { TweetContext } from 'contexts/TweetContext';

import NavBar from 'components/NavBar';
import SideBar from 'components/SideBar';
import MainContainer from 'components/containers/MainContainer';
import ModalContainer from 'components/containers/ModalContainer';
import PageContainer from 'components/containers/PageContainer';

function TwoBarsLayout() {
  const { isTweetModalShow, handleTweetClick, isReplyModalShow } =
    useContext(TweetContext);
  const [activeTitle, setActiveTitle] = useState('首頁');

  return (
    <PageContainer>
      {isTweetModalShow && <ModalContainer value="推文" />}
      {isReplyModalShow && <ModalContainer value="回覆" />}
      <NavBar
        isUser={true}
        onTweetClick={handleTweetClick}
        activeTitle={activeTitle}
        setActiveTitle={setActiveTitle}
      />
      <MainContainer>
        <Outlet />
      </MainContainer>
      <SideBar />
    </PageContainer>
  );
}

export default TwoBarsLayout;
