import React from 'react';
import { Link } from 'react-router-dom';

import { ENTITY_PREFIX_PATH } from '@app/constants';
import { IEntity } from '@app/store/entities/models';

const EntityList: React.FC<{
  data: IEntity[];
  onDelete: (id: string) => void;
  onLoadMore: () => void;
}> = ({ data, onDelete, onLoadMore }) => {
  const handleDelete = (objectId: string) => {
    if (objectId) {
      onDelete(objectId);
    }
  };

  const items = data.map((item, index) => {
    const handleClick = () => handleDelete(item.objectId);
    return (
      <div key={index}>
        <Link to={`${ENTITY_PREFIX_PATH}/${item.objectId}`}>{item.name}</Link>
        <button type="button" onClick={handleClick}>
          Delete
        </button>
      </div>
    );
  });
  return (
    <div>
      <Link to={`${ENTITY_PREFIX_PATH}/create`}>Create</Link>
      {items}
      <button type="button" onClick={onLoadMore}>
        Load More
      </button>
    </div>
  );
};

export default EntityList;
