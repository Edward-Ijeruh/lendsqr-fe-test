import { useState, forwardRef } from "react";
import "./Input.scss";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: "text" | "email" | "password";
  placeholder: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, placeholder, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";

    return (
      <div className="input-wrapper">
        <input
          ref={ref}
          type={isPassword && showPassword ? "text" : type}
          placeholder={placeholder}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            className="show-btn"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "HIDE" : "SHOW"}
          </button>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
