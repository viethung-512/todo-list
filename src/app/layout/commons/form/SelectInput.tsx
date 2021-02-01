import React from 'react';

type Props = {
  register: any;
  name: string;
  label?: string;
  isError: boolean;
  borderLight?: boolean;
  errorMessage?: string;
  placeholder?: string;
  options: { label: string; value: string }[];
};

const SelectInput: React.FC<Props> = ({
  register,
  name,
  label,
  isError,
  borderLight = false,
  errorMessage,
  placeholder,
  options,
}) => {
  return (
    <div className='form-control'>
      {label && <label htmlFor={name}>{label}</label>}
      <select
        ref={register}
        className={borderLight ? 'border--light' : 'border--bold'}
        name={name}
        id={name}
        placeholder={placeholder}
      >
        {options.map((opt, index) => (
          <option key={`${opt.value}_${index}`} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {isError && <p>{errorMessage}</p>}
    </div>
  );
};

export default SelectInput;
