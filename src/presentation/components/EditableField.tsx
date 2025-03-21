import { useState } from "react";
import { PencilIcon, CheckIcon, XMarkIcon as XIcon } from "@heroicons/react/24/outline";

interface EditableFieldProps {
  label: string;
  value: any;
  type?: "text" | "date" | "select";
  options?: { value: string; label: string }[];
  onSave: (value: any) => void;
}

export const EditableField = ({
  label,
  value,
  type = "text",
  options,
  onSave,
}: EditableFieldProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  const handleSave = () => {
    onSave(tempValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempValue(value);
    setIsEditing(false);
  };

  return (
    <div className="group relative">
      <div className="flex items-center">
        <p className="text-sm text-gray-500">{label}</p>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="editbtn ml-2 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <PencilIcon className="h-5 w-5" />
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="flex gap-2 mt-1">
          {type === "select" && options ? (
            <select
              value={tempValue}
              onChange={(e) => setTempValue(e.target.value)}
              className="flex-1 p-1 border rounded"
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={type}
              value={
                type === "date"
                  ? !tempValue
                    ?new Date().toISOString().split("T")[0] 
                    : tempValue instanceof Date //Check that tempValue is a Date object
                      ? tempValue.toISOString().split("T")[0]
                      : new Date(tempValue).toISOString().split("T")[0] // Convert tempValue to Date
                  :tempValue
              }
              onChange={(e) =>
                setTempValue(
                  type === "date" ? new Date(e.target.value) : e.target.value
                )
              }
              className="flex-1 p-1 border rounded"
            />
          )}
          <div className="flex gap-1">
            <button
              onClick={handleSave}
              className="editbtnconfirm text-green-500 hover:text-green-600"
            >
              <CheckIcon className="h-5 w-5" />
            </button>
            <button
              onClick={handleCancel}
              className="editbtnconfirm text-red-500 hover:text-red-600"
            >
              <XIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      ) : (
        <p className="font-medium text-gray-800 break-words">
          {type === "date" ? new Date(value).toLocaleDateString("en-GB") : value || "-"}
        </p>
      )}
    </div>
  );
};