import { useNavigate } from "react-router-dom";
import ForgotPasswordForm from "../components/forms/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: 'url("/bg.jpeg")' }}
    >
      <ForgotPasswordForm onBack={() => navigate("/login")} />
    </div>
  );
}
