import { CheckCircleIcon } from "@heroicons/react/24/solid";

interface RequiredTextInputProps {
    id: string;
    label: string;
    onChange: (e: any) => void;
    pattern?: string;
    errorMsg: string;
    inputError?: string;
}

export const RequiredTextInput = ({
    id,
    label,
    onChange,
    pattern,
    errorMsg,
    inputError,
}: RequiredTextInputProps) => {

return (
    <div className="w-full md:w-1/3">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
              {label}
            </label>
            <input
              type="text"
              id={id}
              value={id}
              onChange={onChange}
              placeholder={label}
              pattern={pattern}
              required
              className="peer invalid:border-red-500 invalid:focus:ring-red-500 valid:border-green-500 valid:focus:ring-green-500 p-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2"
            />
            <div className="pointer-events-none opacity-0 peer-valid:opacity-100 -translate-y-7 justify-end flex mr-3">
              <CheckCircleIcon className="h-5 w-5 text-green-500" />
            </div>
            {inputError && <p className="text-red-500 text-sm mt-1">{inputError || errorMsg}</p>}
    </div>
 );
};
        