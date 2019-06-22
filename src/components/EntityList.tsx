import React from 'react';
import { Link } from 'react-router-dom';

import { ENTITIES_BASE_PATH } from '@app/constants';
import { IEntity } from '@app/store/entities/models';

interface IEntityListProps {
  data: IEntity[];
  onDelete: (id: string) => void;
  tagsFilterValue: string;
  setTagsFilterValue: (value: string) => void;
  tagsFilterOptions: string[];
}

const EntityList: React.FC<IEntityListProps> = ({
  data,
  onDelete,
  tagsFilterOptions,
  tagsFilterValue,
  setTagsFilterValue
}) => {
  const handleDelete = (id: string) => {
    if (id) {
      onDelete(id);
    }
  };

  const handleSelectOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTagsFilterValue(event.target.value);
  };

  return (
    <>
      <Link to={`${ENTITIES_BASE_PATH}/create`}>Add Entity</Link>
      <label>
        Filter Entities:
        <select value={tagsFilterValue} onChange={handleSelectOnChange}>
          {tagsFilterOptions.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </label>
      {data.map((item: IEntity, index: number) => {
        const handleItemClick = () => handleDelete(item.id);
        return (
          <div key={index}>
            <Link to={`${ENTITIES_BASE_PATH}/${item.id}`}>{item.name}</Link>
            <Link to={`${ENTITIES_BASE_PATH}/${item.id}/edit`}>Edit</Link>
            <button type="button" onClick={handleItemClick}>
              Delete
            </button>
          </div>
        );
      })}
    </>
  );
};

export default EntityList;
