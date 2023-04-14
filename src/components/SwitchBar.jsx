import styled from "styled-components";

const StyledDiv = styled.div`
  width: 100%;
  height: 50px;
  margin-top: 15px;
  border-bottom: 1px solid #e6ecf0;

  h1 {
    cursor: pointer;
  }

  div {
    width: 130px;
    height: 100%;

    & h1 {
      text-align: center;
      line-height: 50px;
    }
  }

  // 互動效果
  .active {
    border-bottom: 2px solid var(--brand-color);
    color: var(--brand-color);
  }
`;

function UserPageSwitchBar({ onPageChange, currentPage }) {
  return (
    <StyledDiv className="flex">
      <div
        className={currentPage === "tweets" ? "active" : ""}
        onClick={() => onPageChange?.("tweets")}
      >
        <h1>推文</h1>
      </div>
      <div
        className={currentPage === "replys" ? "active" : ""}
        onClick={() => onPageChange?.("replys")}
      >
        <h1>回覆</h1>
      </div>
      <div
        className={currentPage === "likes" ? "active" : ""}
        onClick={() => onPageChange?.("likes")}
      >
        <h1>喜歡的內容</h1>
      </div>
    </StyledDiv>
  );
}

function FollowPageSwitchBar({ onPageChange, currentPage }) {
  return (
    <StyledDiv className="flex">
      <div
        className={currentPage === "followers" ? "active" : ""}
        onClick={() => onPageChange?.("followers")}
      >
        <h1>追隨者</h1>
      </div>
      <div
        className={currentPage === "following" ? "active" : ""}
        onClick={() => onPageChange?.("following")}
      >
        <h1>正在追隨</h1>
      </div>
    </StyledDiv>
  );
}

function SwitchBar({ value, onPageChange, currentPage }) {
  if (value === "info") {
    return (
      <UserPageSwitchBar
        onPageChange={(changePage) => onPageChange?.(changePage)}
        currentPage={currentPage}
      />
    );
  }
  if (value === "follow") {
    return (
      <FollowPageSwitchBar
        onPageChange={(changePage) => onPageChange?.(changePage)}
        currentPage={currentPage}
      />
    );
  }
}

export default SwitchBar;
