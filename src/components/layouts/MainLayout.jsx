import { useContext } from 'react';
import { Outlet } from 'react-router-dom';

import { TweetContext } from 'contexts/TweetContext';

import ModalContainer from 'components/containers/ModalContainer';
import PageContainer from 'components/containers/PageContainer';

function MainLayout() {
  const { isTweetModalShow, isReplyModalShow } = useContext(TweetContext);

  return (
    <PageContainer>
      {isTweetModalShow && <ModalContainer value="推文" />}
      {isReplyModalShow && <ModalContainer value="回覆" />}
      <Outlet />
    </PageContainer>
  );
}

export default MainLayout;
