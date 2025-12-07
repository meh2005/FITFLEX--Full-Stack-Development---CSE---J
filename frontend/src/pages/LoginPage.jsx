import { useNavigate } from "react-router-dom";
import LoginForm from "../components/forms/LoginForm";

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: 'url("/bg.jpeg")' }}
    >
      <LoginForm
        onSuccess={() => navigate("/dashboard")}
        onForgot={() => navigate("/forgot")}
        onSignup={() => navigate("/signup")}
      />
    </div>
  );
}
