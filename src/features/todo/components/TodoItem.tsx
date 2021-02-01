import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';

import TaskActionForm, { TaskActionField } from './TaskActionForm';
import { taskActionValidator } from '../../../app/utils/validators';
import { deleteTask, toggleSelectTask, updateTask } from '../todoSlice';
import { Task } from '../../../app/types/task';

interface Props {
  task: Task;
}

const defaultValues: TaskActionField = {
  title: '',
  descriptions: '',
  dueDate: new Date(),
  priority: 'normal',
};

const TodoItem: React.FC<Props> = ({ task }) => {
  const dispatch = useDispatch();
  const [editFormOpen, setEditFormOpen] = useState<boolean>(false);
  const {
    control,
    errors,
    handleSubmit,
    reset,
    register,
  } = useForm<TaskActionField>({
    mode: 'onChange',
    defaultValues: {
      title: task.title,
      descriptions: task.descriptions,
      dueDate: new Date(task.dueDate),
      priority: task.priority,
    },
    resolver: yupResolver(taskActionValidator),
  });

  const handleUpdateTask = handleSubmit(values => {
    dispatch(
      updateTask({
        id: task.id,
        data: {
          title: values.title,
          descriptions: values.descriptions,
          dueDate: values.dueDate.toISOString(),
          priority: values.priority,
        },
      })
    );

    reset(defaultValues);
    setEditFormOpen(prev => !prev);
  });

  const handleDeleteTask = () => {
    dispatch(deleteTask({ id: task.id }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      dispatch(
        toggleSelectTask({
          id: task.id,
          type: 'select',
        })
      );
    } else {
      dispatch(
        toggleSelectTask({
          id: task.id,
          type: 'unselect',
        })
      );
    }
  };

  return (
    <div className='item'>
      <div className='item-main'>
        <div className='item-main__info'>
          <input
            type='checkbox'
            name='todo'
            id='todo'
            onChange={handleSelectChange}
          />
          <label htmlFor='todo'>{task.title}</label>
        </div>

        <div className='item-main__actions'>
          <button
            className='btn btn--primary'
            onClick={() => {
              if (editFormOpen) {
                reset(defaultValues);
              } else {
                const newFormValue = {
                  title: task.title,
                  descriptions: task.descriptions,
                  dueDate: new Date(task.dueDate),
                  priority: task.priority,
                };

                reset(newFormValue);
              }

              setEditFormOpen(prev => !prev);
            }}
          >
            Detail
          </button>
          <button
            className='btn btn--error ml-2'
            onClick={() => handleDeleteTask()}
          >
            Remove
          </button>
        </div>
      </div>
      {editFormOpen && (
        <div className='item-action'>
          <TaskActionForm
            register={register}
            control={control}
            errors={errors}
            submitForm={handleUpdateTask}
            task={task}
          />
        </div>
      )}
    </div>
  );
};

export default TodoItem;
