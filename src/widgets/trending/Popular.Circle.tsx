import { useTheme } from "app/providers/ThemeProvider";

interface PopularCircleProps {
  username: string;
  nickname: string;
  followers: number;
}

export default function PopularCircle({
  username,
  nickname,
  followers,
}: PopularCircleProps) {
  const { colors } = useTheme();

  return (
    <div key={username} className="flex m-2 items-center">
      <img
        src="https://pikuco.ru/upload/test_stable/fa9/fa9d73a8bbd0507d0bb61ca90cf68ce5.webp"
        alt="avatar"
        className="w-12 h-12 rounded-full object-cover mx-5"
      />
      <div>
        <p className="text-lg" style={{ color: colors.text }}>
          {nickname}
        </p>
        <p className="text-md" style={{ color: colors.tint }}>
          {`${followers.toLocaleString("en-US")} followers`}
        </p>
      </div>
    </div>
  );
}
