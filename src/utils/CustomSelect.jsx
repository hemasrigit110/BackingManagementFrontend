import React from "react";

export default function CustomSelect({
  value,
  setValue,
  options,
  label,
  placeholder,
}) {
  return (
    <div className="flex flex-col gap-2 w-full mb-4">
      <label className="text-sm font-semibold text-gray-700">{label}</label>
      <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-md text-base outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-300"
      >
        <option value="">{placeholder}</option>
        {options?.map((e, index) => {
          return (
            <option key={index} value={e.value}>
              {e.label}
            </option>
          );
        })}
      </select>
    </div>
  );
}
