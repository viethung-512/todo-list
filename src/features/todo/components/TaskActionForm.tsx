import React from 'react';
import { Control, FieldErrors } from 'react-hook-form';

import TextInput from '../../../app/layout/commons/form/TextInput';
import DateInput from '../../../app/layout/commons/form/DateInput';
import SelectInput from '../../../app/layout/commons/form/SelectInput';
import { priorities } from '../../../app/constants/priority';
import { Task } from '../../../app/types/task';

export interface TaskActionField {
  title: string;
  dueDate: Date;
  priority: 'low' | 'normal' | 'hight';
  descriptions?: string;
}

interface Props {
  control: Control;
  register: any;
  errors: FieldErrors<TaskActionField>;
  submitForm: (event: React.FormEvent<HTMLFormElement>) => void;
  task?: Task;
}
const CreateTaskForm: React.FC<Props> = ({
  control,
  register,
  errors,
  task,
  submitForm,
}) => {
  return (
    <form style={{ width: '100%' }} onSubmit={submitForm}>
      <TextInput
        register={register}
        name='title'
        placeholder='Add new task ...'
        isError={Boolean(errors?.title)}
        errorMessage={errors?.title?.message}
        borderLight={true}
      />

      <TextInput
        register={register}
        name='descriptions'
        label='Descriptions'
        isError={Boolean(errors?.descriptions)}
        errorMessage={errors?.descriptions?.message}
        isTextArea={true}
        rows={3}
      />

      <div className='flex-container'>
        <div style={{ width: '50%', marginRight: 8 }}>
          <DateInput
            control={control}
            name='dueDate'
            label='Due Date'
            isError={Boolean(errors?.dueDate)}
            errorMessage={errors?.dueDate?.message}
          />
        </div>
        <div style={{ width: '50%', marginLeft: 8 }}>
          <SelectInput
            name='priority'
            register={register}
            isError={Boolean(errors?.priority)}
            errorMessage={errors?.priority?.message}
            label='Priority'
            options={priorities}
          />
        </div>
      </div>
      <input
        type='submit'
        value={task && task.id ? 'Update' : 'Add'}
        className='btn btn--success full-width'
      />
    </form>
  );
};

export default CreateTaskForm;
