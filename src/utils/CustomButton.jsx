export default function CustomButton({
  children,
  onClick,
  disabled,
  type = "button",
  customStyle,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`cursor-pointer px-6 py-3 bg-blue-500 text-white font-semibold rounded-md text-base hover:bg-blue-600 hover:-translate-y-0.5 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-300
        ${customStyle}
        `}
    >
      {children}
    </button>
  );
}
