import styled from "styled-components";

// Components
import ActButton from "components/ActButton";

const StyledDiv = styled.div`
  height: 200px;
  padding: 16px 27px 0 27px;
  border-bottom: 10px solid #e6ecf0;
  cursor: pointer;

  button {
    width: 65px;
    margin: auto 0 15px 0;
    margin-bottom: 25px;
    height: 40px;
    padding: 0;
    font-size: 16px;
  }

  p {
    padding: 0 8px;
    line-height: 50px;
    font-weight: 700;
    color: var(--secondary);
  }

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

function TweetArea({ onTweetClick, avatar }) {
  return (
    <StyledDiv
      className="d-flex justify-content-between"
      onClick={onTweetClick}
    >
      <div className="d-flex">
        <img src={avatar} alt="" />
        <p>有什麼新鮮事？</p>
      </div>
      <ActButton buttonName={"推文"} onClick={onTweetClick} />
    </StyledDiv>
  );
}

export default TweetArea;
