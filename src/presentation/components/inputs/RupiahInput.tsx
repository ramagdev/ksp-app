import { useState } from "react";

interface RupiahInputProps {
    id: string;
    label: string;
    onChange: (value: string) => void;
}

export const RupiahInput = (props: RupiahInputProps) => {
    const [tempValue, setTempValue] = useState<string>("");
    const formattedValue = (e: string) => {
        const value = e.replace(/[^0-9]/g, "");
        const result = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        setTempValue(result);
        props.onChange(value);
    }
    return (
        <div>
            <label htmlFor={props.id} className="block text-sm font-medium text-gray-700">
                {props.label}
            </label>
            <input
                type="text"
                id={props.id}
                value={tempValue}
                onChange={(e) => formattedValue(e.target.value)}
                placeholder={props.label}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-2"
            />
        </div>
    );
};