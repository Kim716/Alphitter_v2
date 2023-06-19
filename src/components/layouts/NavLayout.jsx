import { Outlet } from 'react-router-dom';
import { useContext, useState } from 'react';

import { TweetContext } from 'contexts/TweetContext';

import NavBar from 'components/NavBar';

function NavLayout() {
  const { handleTweetClick } = useContext(TweetContext);
  const [activeTitle, setActiveTitle] = useState('首頁');

  return (
    <>
      <NavBar
        isUser={true}
        onTweetClick={handleTweetClick}
        activeTitle={activeTitle}
        setActiveTitle={setActiveTitle}
      />
      <Outlet />
    </>
  );
}

export default NavLayout;
