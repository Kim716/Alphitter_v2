import styled from "styled-components";

// Components
import InfoModal from "components/modals/InfoModal";
import ReplyModal from "components/modals/ReplyModal";
import TweetModal from "components/modals/TweetModal";

const StyledDiv = styled.div`
  height: 100vh;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  padding-top: 50px;
  background-color: rgba(0, 0, 0, 0.4);
  background-size: cover;
`;

function ModalContainer({ value }) {
  return (
    <StyledDiv className="d-flex justify-content-center">
      {value === "推文" && <TweetModal />}
      {value === "回覆" && <ReplyModal />}
      {value === "編輯個人資料" && <InfoModal />}
    </StyledDiv>
  );
}
export default ModalContainer;
