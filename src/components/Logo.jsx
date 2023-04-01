import styled from "styled-components";
import logo from "../assets/icons/logo.svg";

const StyleLogo = styled.img`
  display: block;
  width: 40px;
`;

function Logo() {
  return <StyleLogo src={logo} alt="logo" />;
}

export default Logo;
