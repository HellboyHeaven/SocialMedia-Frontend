import { useTheme } from "app/providers/ThemeProvider";
import Avatar from "./Avatar";
import { UserBriefType } from "shared/types/user";
import TimeAgo from "./TimeAgo";

interface UserHeaderProps {
  size?: number;
  user: UserBriefType | undefined;
  time?: string;
}

export default function UserHeader({ size = 48, user, time }: UserHeaderProps) {
  const { colors } = useTheme();

  const profileLink = user ? `/user/${user.username}` : "#";

  return (
    <div className="flex items-center gap-4">
      <Avatar size={size} user={user} />
      <div>
        <a href={profileLink}>
          <p
            className="font-semibold text-lg hover:underline"
            style={{ color: colors.text }}
          >
            {user?.nickname ?? user?.username ?? "Deleted"}
          </p>
        </a>
        <p className="text-sm text-gray-500" style={{ color: colors.tint }}>
          {user?.username ? (
            <a href={profileLink} className="hover:underline">
              @{user.username}
            </a>
          ) : (
            ""
          )}
          {time && (
            <>
              {" "}
              • <TimeAgo iso={time} />
            </>
          )}
        </p>
      </div>
    </div>
  );
}
