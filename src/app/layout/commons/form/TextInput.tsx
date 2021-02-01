import React from 'react';

type Props = {
  register: any;
  name: string;
  label?: string;
  isError: boolean;
  borderLight?: boolean;
  errorMessage?: string;
  placeholder?: string;
  isTextArea?: boolean;
  rows?: number;
};

const TextInput: React.FC<Props> = ({
  register,
  name,
  label,
  isError,
  borderLight = false,
  errorMessage,
  placeholder,
  isTextArea = false,
  rows = 1,
}) => {
  return (
    <div className='form-control'>
      {label && <label htmlFor={name}>{label}</label>}
      {isTextArea ? (
        <textarea
          ref={register}
          id={name}
          name={name}
          className={borderLight ? 'border--light' : 'border--bold'}
          rows={rows}
        ></textarea>
      ) : (
        <input
          ref={register}
          className={borderLight ? 'border--light' : 'border--bold'}
          type='text'
          name={name}
          id={name}
          placeholder={placeholder}
        />
      )}
      {isError && <p>{errorMessage}</p>}
    </div>
  );
};

export default TextInput;
