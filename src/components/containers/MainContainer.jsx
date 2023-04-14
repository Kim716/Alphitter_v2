import styled from "styled-components";

const StyledDiv = styled.div`
  height: 100vh;
  overflow: auto;
  border-right: 1px solid var(--grey3);
`;

function MainContainer({ children }) {
  return <StyledDiv className="col-span-2">{children}</StyledDiv>;
}

export default MainContainer;
