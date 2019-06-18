import React from 'react';
import { Link } from 'react-router-dom';

import { ENTITIES_BASE_PATH } from '@app/constants';
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
        <Link to={`${ENTITIES_BASE_PATH}/${item.id}`}>{item.name}</Link>
        <Link to={`${ENTITIES_BASE_PATH}/${item.id}/edit`}>Edit</Link>
        <button type="button" onClick={handleClick}>
          Delete
        </button>
      </div>
    );
  });
  return (
    <>
      <Link to={`${ENTITIES_BASE_PATH}/create`}>Add Entity</Link>
      {entities}
    </>
  );
};

export default EntityList;
