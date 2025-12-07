export default function Input({
  label,
  type = "text",
  value,
  placeholder = "",
  onChange,
  disabled = false,
  className = "",
}) {
  return (
    <div className="w-full mb-3">
      {label && (
        <label className="block text-sm mb-1 text-gray-700">
          {label}
        </label>
      )}

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className={`border p-2 rounded w-full bg-white focus:outline-none focus:ring focus:ring-blue-200 ${className} ${
          disabled ? "bg-gray-100 cursor-not-allowed" : ""
        }`}
      />
    </div>
  );
}
