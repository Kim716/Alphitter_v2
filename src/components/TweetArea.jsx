import styled from "styled-components";

// Components
import Button from "./Button";
import AvatarLink from "./AvatarLink";

const StyledDiv = styled.div`
  height: 150px;
  padding: 16px 27px;
  border-bottom: 10px solid #e6ecf0;
  cursor: pointer;

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

function TweetArea({ onTweetClick, avatar, userId }) {
  return (
    <StyledDiv className="flex justify-between" onClick={onTweetClick}>
      <div className="flex grow">
        <AvatarLink avatar={avatar} userId={userId} />
        <p className="grow">有什麼新鮮事？</p>
      </div>
      <Button
        primary
        rounded
        onClick={onTweetClick}
        className="self-end text-base"
      >
        推文
      </Button>
    </StyledDiv>
  );
}

export default TweetArea;
