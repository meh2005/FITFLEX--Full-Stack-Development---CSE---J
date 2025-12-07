import { useNavigate } from "react-router-dom";
import SignupForm from "../components/forms/SignupForm";

export default function SignupPage() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: 'url("/bg.jpeg")' }}
    >
      <SignupForm onBackToLogin={() => navigate("/login")} />
    </div>
  );
}
