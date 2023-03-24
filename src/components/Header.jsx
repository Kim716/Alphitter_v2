import styled from "styled-components";

const StyledHeader = styled.div`
  height: 75px;
  padding: 24px;
  border-bottom: 1px solid #E6ECF0;
  h1 {
    width: 48px;
    height: 26px;
    top: 24px;
    font-weight: 700;
    font-size: 24px;
  }
`

function Header({ children }) {
  return <StyledHeader>{ children }</StyledHeader>
}

export default Header