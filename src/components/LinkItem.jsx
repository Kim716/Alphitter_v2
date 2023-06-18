import styled from 'styled-components';

// Icons
import { ReactComponent as HomeUnfocusIcon } from 'assets/icons/home_unfocus.svg';
import { ReactComponent as HomeFocusIcon } from 'assets/icons/home_focus.svg';
import { ReactComponent as SetUnfocusIcon } from 'assets/icons/set_unfocus.svg';
import { ReactComponent as SetFocusIcon } from 'assets/icons/set_focus.svg';
import { ReactComponent as UserUnfocusIcon } from 'assets/icons/user_unfocus.svg';
import { ReactComponent as UserFocusIcon } from 'assets/icons/user_focus.svg';
import { ReactComponent as LogoutUnfocusIcon } from 'assets/icons/logout_unfocus.svg';
import { ReactComponent as LogoutFocusIcon } from 'assets/icons/logout_focus.svg';

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  & svg {
    width: 24px;
    height: 24px;
    margin-right: 19px;
  }

  span {
    font-size: 18px;
    font-weight: 700;
    line-height: 58px;
    padding-top: 5px;
    color: ${(props) =>
      props.isClick ? 'var(--brand-color)' : 'var(--grey9)'};
  }
`;

function LinkItem({ title, isClick, onClick }) {
  return (
    <StyledDiv onClick={onClick} isClick={isClick}>
      {(title === '首頁' || title === '推文清單') &&
        (isClick ? <HomeFocusIcon /> : <HomeUnfocusIcon />)}

      {(title === '個人資料' || title === '使用者列表') &&
        (isClick ? <UserFocusIcon /> : <UserUnfocusIcon />)}

      {title === '設定' && (isClick ? <SetFocusIcon /> : <SetUnfocusIcon />)}
      {title === '登出' &&
        (isClick ? <LogoutFocusIcon /> : <LogoutUnfocusIcon />)}

      <span>{title}</span>
    </StyledDiv>
  );
}

export default LinkItem;
