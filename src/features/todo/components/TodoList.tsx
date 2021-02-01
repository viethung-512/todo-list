import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.css';

import useDebounce from '../../../app/hooks/useDebounce';
import { searchTask } from '../todoSlice';
import { AppState, TodoState } from '../../../app/redux/root-reducer';
import TodoItem from './TodoItem';

const TodoList = () => {
  const dispatch = useDispatch();
  const { listTask } = useSelector<AppState, TodoState>(state => state.todo);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const debounceValue = useDebounce(searchTerm, 300);

  useEffect(() => {
    if (debounceValue) {
      dispatch(searchTask({ searchTerm: debounceValue }));
    } else {
      dispatch(searchTask({ searchTerm: '' }));
    }
  }, [debounceValue, dispatch]);

  return (
    <div className='todo-list'>
      <div className='form-control'>
        <input
          className='border--light'
          type='text'
          name='searchTerm'
          placeholder='Search ...'
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      {listTask.length === 0 && <h5>Can not find any task</h5>}

      {listTask.map(task => (
        <TodoItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TodoList;
