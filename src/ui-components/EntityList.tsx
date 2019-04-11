import React from 'react';
import { Link } from 'react-router-dom';
import { IEntity } from '@app/models';

const EntityList: React.FC<{ data: IEntity[]; onDelete: (id: string) => void }> = ({
  data,
  onDelete
}) => {
  const handleDelete = (objectId: string) => {
    if (objectId) {
      onDelete(objectId);
    }
  };

  const items = data.map((item, index) => {
    const handleClick = () => handleDelete(item.objectId);
    return (
      <div key={index}>
        <Link to={`/${item.objectId}`}>{item.name}</Link>
        <button type="button" onClick={handleClick}>
          Delete
        </button>
      </div>
    );
  });
  return <div>{items}</div>;
};

export default EntityList;
