import { useNavigate } from "react-router-dom";
import { UserBriefType } from "shared/types/user";

type AvatarProps = {
  user?: UserBriefType;
  size?: number;
};

export default function Avatar({ user, size = 48 }: AvatarProps) {
  const navigate = useNavigate();
  let avatarUrl: string;
  avatarUrl =
    user?.avatar ??
    "https://static.vecteezy.com/system/resources/previews/009/292/244/large_2x/default-avatar-icon-of-social-media-user-vector.jpg";
  avatarUrl =
    user != null
      ? avatarUrl
      : "https://i.pinimg.com/736x/d3/c0/96/d3c0963c9a86ca9b6d3978b2d2a7ae7f.jpg";
  return (
    <img
      src={avatarUrl}
      alt="avatar"
      className="rounded-full object-cover"
      style={{ width: size, height: size }}
      onClick={() => navigate(`/user/${user?.username}`)}
    />
  );
}
