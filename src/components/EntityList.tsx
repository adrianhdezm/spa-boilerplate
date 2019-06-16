import React from 'react';
import { Link } from 'react-router-dom';

import { IEntity } from '@app/models';

const EntityList: React.FC<{ data: IEntity[]; onDelete: (id: string) => void }> = ({
  data,
  onDelete
}) => {
  const handleDelete = (id: string) => {
    if (id) {
      onDelete(id);
    }
  };

  const entities = data.map((item: IEntity, index: number) => {
    const handleClick = () => handleDelete(item.id);
    return (
      <div key={index}>
        <Link to={`/${item.id}`}>{item.name}</Link>
        <Link to={`/${item.id}/edit`}>Edit</Link>
        <button type="button" onClick={handleClick}>
          Delete
        </button>
      </div>
    );
  });
  return <>{entities}</>;
};

export default EntityList;
