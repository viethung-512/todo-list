import React, { useState } from 'react';
import './todo-container-style.css';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';

import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

import TaskActionForm, { TaskActionField } from '../components/TaskActionForm';
import { taskActionValidator } from '../../../app/utils/validators';
import TodoList from '../components/TodoList';
import { createTask, deleteTasks } from '../todoSlice';
import { AppState, TodoState } from '../../../app/redux/root-reducer';
import BulkAction from '../components/BulkAction';

const useStyles = makeStyles(theme => ({
  paper: {
    minWidth: '15em',
    width: '100vw',
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& h4': {
      marginBottom: theme.spacing(6),
      fontSize: 20,
    },
  },
}));

const defaultValues: TaskActionField = {
  title: '',
  descriptions: '',
  dueDate: new Date(),
  priority: 'normal',
};

const TodoContainer = () => {
  const dispatch = useDispatch();
  const { selected } = useSelector<AppState, TodoState>(state => state.todo);
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  // @ts-ignore
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const {
    control,
    errors,
    handleSubmit,
    reset,
    register,
  } = useForm<TaskActionField>({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(taskActionValidator),
  });

  const handleCreateTask = handleSubmit(values => {
    dispatch(
      createTask({
        title: values.title,
        descriptions: values.descriptions,
        dueDate: values.dueDate.toISOString(),
        priority: values.priority,
      })
    );

    reset(defaultValues);
    if (open) {
      handleToggleDrawer();
    }
  });

  const handleDeleteTasks = (ids: string[]) => {
    dispatch(deleteTasks({ ids }));
  };

  const handleDoneTasks = (ids: string[]) => {
    console.log('Done Tasks: ', ids);
  };

  const handleToggleDrawer = () => {
    setOpen(prev => !prev);
  };

  return (
    <div className='todo-container'>
      <div className='create-task-wrapper'>
        <h4>New Task</h4>
        <TaskActionForm
          register={register}
          control={control}
          errors={errors}
          submitForm={handleCreateTask}
        />
      </div>

      <div className='todo-list-wrapper'>
        <h4>To do List</h4>

        <div className='create-task-btn-wrapper'>
          <button
            className='btn btn--primary'
            onClick={() => setOpen(prev => !prev)}
          >
            Create new Task
          </button>
        </div>

        <TodoList />

        {selected && selected.length > 0 && (
          <BulkAction
            deleteTasks={handleDeleteTasks}
            doneTasks={handleDoneTasks}
            ids={selected}
          />
        )}

        <SwipeableDrawer
          disableBackdropTransition={!iOS}
          disableDiscovery={iOS}
          open={open}
          onClose={handleToggleDrawer}
          onOpen={() => {}}
          PaperProps={{
            className: classes.paper,
          }}
        >
          <IconButton
            onClick={handleToggleDrawer}
            style={{ position: 'absolute', top: 0, right: 0 }}
          >
            <Icon>close</Icon>
          </IconButton>

          <h4>New Task</h4>
          <TaskActionForm
            register={register}
            control={control}
            errors={errors}
            submitForm={handleCreateTask}
          />
        </SwipeableDrawer>
      </div>
    </div>
  );
};

export default TodoContainer;
