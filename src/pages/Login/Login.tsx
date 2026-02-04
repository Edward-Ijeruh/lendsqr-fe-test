import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { mockLogin } from "../../services/auth.service";
import Input from "../../components/common/Input/Input";
import Button from "../../components/common/Button/Button";
import logo from "../../assets/images/common/logo.svg";
import loginIllustration from "../../assets/images/login/login-illustration.svg";
import "./Login.scss";

// Zod schema
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginFormInputs) => {
    setIsLoading(true);

    try {
      const result = await mockLogin(data);

      if (result.success) {
        toast.success("Login successful");
        navigate("/users");
      } else {
        toast.error(result.message || "Login failed");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login">
      <header className="login__logo">
        <img src={logo} alt="Lendsqr Logo" />
      </header>

      <div className="login__content">
        <div className="login__image">
          <img src={loginIllustration} alt="Login illustration" />
        </div>

        <div className="login__form-container">
          <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
            <h1>Welcome!</h1>
            <p>Enter details to login.</p>

            <Input {...register("email")} type="email" placeholder="Email" />
            {errors.email && (
              <span className="error">{errors.email.message}</span>
            )}

            <Input
              {...register("password")}
              type="password"
              placeholder="Password"
            />
            {errors.password && (
              <span className="error">{errors.password.message}</span>
            )}

            <button type="button" className="forgot-password">
              FORGOT PASSWORD?
            </button>

            <Button type="submit" loading={isLoading}>
              LOG IN
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
