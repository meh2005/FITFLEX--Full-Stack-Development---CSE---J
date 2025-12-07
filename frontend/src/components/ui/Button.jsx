export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
  disabled = false,
}) {
  const base =
    "px-4 py-2 rounded font-medium transition-colors duration-200 focus:outline-none";

  const styles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300",
    secondary: "bg-gray-400 text-white hover:bg-gray-500 disabled:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700 disabled:bg-red-300",
    outline:
      "border border-gray-500 text-gray-800 hover:bg-gray-200 disabled:opacity-50",
    ghost: "text-gray-700 hover:bg-gray-200 disabled:opacity-50",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${base} ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
