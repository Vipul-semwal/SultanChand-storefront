import { Input } from "@medusajs/ui";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface InputFieldProps {
  name: string;
  label: string;
  type?: "text" | "email" | "password" | "number" | "file" | "date";
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

const InputField: React.FC<InputFieldProps> = ({ name, label, type = "text", register, errors }) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      {type === "file" ? (
        <Input
          id={name}
          type="file"
          {...register(name)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#EA5900] focus:border-[#EA5900]"
        />
      ) : (
        <Input
          id={name}
          type={type}
          {...register(name)}
          placeholder={label}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#EA5900] focus:border-[#EA5900]"
        />
      )}
      {errors[name]?.message && <p className="text-red-500 text-sm">{String(errors[name]?.message)}</p>}
    </div>
  );
};

export default InputField;