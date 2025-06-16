import { useTheme } from "app/providers/ThemeProvider";
import Avatar from "features/common/ui/Avatar";
import { UserType } from "shared/types/user";

interface ProfileCardProps {
  user: UserType;
}

export default function ProfileCard({ user }: ProfileCardProps) {
  const { colors } = useTheme();

  return (
    <div
      className="w-full max-w-2xl rounded-xl shadow-md overflow-hidden"
      style={{ background: colors.primary }}
    >
      {/* Cover */}
      <div className="h-36" style={{ background: colors.secondary }} />

      {/* Profile Section */}
      <div className="p-6 pt-0 relative flex flex-col items-start">
        {/* Avatar */}
        <div className="absolute -top-12 left-6">
          <Avatar user={user} size={100} />
        </div>

        {/* Content */}
        <div className="mt-16 ml-6">
          <h2 className="text-xl font-bold" style={{ color: colors.text }}>
            {user.nickname ?? user.username}
          </h2>
          <p className="text-sm text-gray-500" style={{ color: colors.text }}>
            @{user.username}
          </p>
          <p className="mt-4 text-base" style={{ color: colors.text }}>
            {user.description}
          </p>
        </div>
      </div>
    </div>
  );
}
