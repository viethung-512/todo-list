import React from 'react';
import './style.css';

interface Props {
  deleteTasks: (ids: string[]) => void;
  doneTasks: (ids: string[]) => void;
  ids: string[];
}

const BulkAction: React.FC<Props> = ({ deleteTasks, doneTasks, ids }) => {
  return (
    <div className='bulk-action-container'>
      <div className='bulk-left'>
        <p>{ids.length} item selected</p>
      </div>

      <div className='bulk-right'>
        <button className='btn btn--primary' onClick={() => doneTasks(ids)}>
          Done
        </button>
        <button
          className='btn btn--error ml-2'
          onClick={() => deleteTasks(ids)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default BulkAction;
