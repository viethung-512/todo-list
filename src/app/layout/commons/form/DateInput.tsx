import React from 'react';
import { Control, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';

type Props = {
  control: Control;
  name: string;
  label?: string;
  isError: boolean;
  errorMessage?: string;
};

const DateInput: React.FC<Props> = ({
  control,
  name,
  label,
  isError,
  errorMessage,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ onChange, value }) => (
        <div className='form-control'>
          {label && <label htmlFor={name}>{label}</label>}
          <DatePicker
            selected={value}
            onChange={onChange}
            className='border--bold full-width'
          />
          {isError && <p>{errorMessage}</p>}
        </div>
      )}
    />
  );
};

export default DateInput;
