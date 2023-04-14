import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// Components
import { ReactComponent as BackIcon } from "assets/icons/back_unfocus.svg";

const StyledHeader = styled.div`
  display: flex;
  height: 75px;
  padding: 24px;
  border-bottom: 1px solid #e6ecf0;

  svg {
    margin-right: 20px;
    cursor: pointer;

    &:hover {
      path {
        fill: var(--brand-color);
      }
    }
  }

  .title:has(span) {
    margin-top: -15px;
  }

  h1 {
    color: var(--grey9);
    font-weight: 700;
    font-size: 24px;
  }

  span {
    color: var(--secondary);
    font-size: 13px;
  }
`;

function Header({ backIcon, children }) {
  const navigate = useNavigate();

  return (
    <StyledHeader>
      {backIcon ? (
        <BackIcon
          onClick={() => {
            navigate(-1);
          }}
        />
      ) : (
        false
      )}
      <div className="flex flex-col title">{children}</div>
    </StyledHeader>
  );
}

export default Header;
