import "./Button.scss";

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit";
  loading?: boolean;
  disabled?: boolean;
}

export default function Button({
  children,
  type = "button",
  loading = false,
  disabled = false,
}: ButtonProps) {
  return (
    <button type={type} className="btn-primary" disabled={loading || disabled}>
      {loading ? "Loading..." : children}
    </button>
  );
}
