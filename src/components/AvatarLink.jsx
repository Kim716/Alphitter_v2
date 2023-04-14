import { useNavigate } from "react-router-dom";

function AvatarLink({ avatar, userId }) {
  const navigate = useNavigate();

  const handleAvatarClick = (e) => {
    e.stopPropagation();
    navigate(`/user/${e.target.dataset.id}`);
  };

  return (
    <img
      src={avatar}
      alt="avatar"
      className="hover:drop-shadow-md cursor-pointer"
      data-id={userId}
      onClick={handleAvatarClick}
    />
  );
}

export default AvatarLink;
