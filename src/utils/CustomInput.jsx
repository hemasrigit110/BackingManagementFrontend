import React from "react";

export default function CustomInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  disabled,
}) {
  return (
    <div className="flex flex-col gap-2 w-full mb-4">
      {label && (
        <label className="text-sm font-semibold text-gray-700">{label}</label>
      )}
      <input
        disabled={disabled}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`px-3 py-2 border border-gray-300 rounded-md text-base outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-300 placeholder:text-gray-400
          ${disabled && "bg-gray-200"}
          
          `}
      />
    </div>
  );
}
