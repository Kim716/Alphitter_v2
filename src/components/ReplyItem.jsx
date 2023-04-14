import styled from "styled-components";

const StyledDiv = styled.div`
  background: var(--white);
  padding: 16px 24px;
  border-bottom: 1px solid var(--grey3);

  img {
    display: block;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 8px;
    object-fit: cover;
  }

  div {
    width: calc(${100 % -50}px);

    .user_info,
    .reply_to {
      margin-bottom: 8px;
      color: var(--secondary);
      font-size: 14px;
      line-height: 26px;

      .reply_name {
        margin-right: 8px;
        color: var(--grey9);
        font-size: 16px;
        font-weight: 700;
      }

      .reply_to_account {
        color: var(--brand-color);
      }
    }

    .comment {
      color: var(--grey9);
      line-height: 26px;
      background: white;
    }
  }
`;

function ReplyItem({
  userId,
  avatar,
  name,
  account,
  createdAt,
  replyToAccount,
  comment,
}) {
  return (
    <StyledDiv className="flex">
      <img src={avatar} alt="avatar" data-id={userId} />

      <div className="grow">
        <p className="user_info">
          <span className="reply_name">{name}</span>@{account}・{createdAt}
        </p>
        <p className="reply_to">
          回覆 <span className="reply_to_account">@{replyToAccount}</span>
        </p>
        <p className="comment">{comment}</p>
      </div>
    </StyledDiv>
  );
}

export default ReplyItem;
