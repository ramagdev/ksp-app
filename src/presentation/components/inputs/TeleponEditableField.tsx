import { useState } from "react";
import { PencilIcon, CheckIcon, XMarkIcon as XIcon } from "@heroicons/react/24/outline";

interface TeleponEditableFieldProps {
  label: string;
  value: any;
  options?: { value: string; label: string }[];
  onSave: (value: any) => void;
}

export const TeleponEditableField = ({
  label,
  value,
  onSave,
}: TeleponEditableFieldProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  const handleSave = () => {
    onSave(tempValue.replace(/-/g, ""));
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
            <input
              type="text"
              value={tempValue}
              onChange={(e) =>{
                  const value = e.target.value.replace(/\D+/g, "");
                  const result = [];
                  for (let i = 0; i < value.length; i += 4) {
                    result.push(value.substring(i, i + 4));
                  }
                  setTempValue(result.join("-"));
              }}
              className="flex-1 p-1 border rounded"
            />
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
          {value ? value.replace(/(.{4})/g, "$1-").replace(/-$/, "") : "-"}
        </p>
      )}
    </div>
  );
};