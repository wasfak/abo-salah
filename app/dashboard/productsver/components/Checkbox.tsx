"use client";

type CheckProps = {
  checked: boolean;
  onChange: () => void;
};

const Checkbox = ({ checked, onChange }: CheckProps) => {
  return (
    <input
      type="checkbox"
      className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
      checked={checked}
      onChange={onChange}
    />
  );
};

export default Checkbox;
