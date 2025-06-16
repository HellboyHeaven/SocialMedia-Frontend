import { useAuth } from "app/providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import RegisterForm from "widgets/common/RegisterForm";

export default function RegisterPage() {
  const { user } = useAuth();

  const navigate = useNavigate();

  if (user) {
    navigate("/");
  }

  return (
    <div className="min-h-screen flex flex-col gap-10">
      <div className="flex items-center justify-center">
        <RegisterForm />
      </div>
    </div>
  );
}
