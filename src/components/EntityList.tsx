import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { ENTITIES_BASE_PATH } from '@app/constants';
import { IEntity } from '@app/store/entities/models';

interface IEntityListProps {
  data: IEntity[];
  onDelete: (id: string) => void;
  tagsFilterValue: string;
  setTagsFilterValue: (value: string) => void;
  tagsFilterOptions: string[];
  searchTermValue: string;
  setSearchTermValue: (value: string) => void;
}

const EntityList: React.FC<IEntityListProps> = ({
  data,
  onDelete,
  tagsFilterOptions,
  tagsFilterValue,
  setTagsFilterValue,
  searchTermValue,
  setSearchTermValue
}) => {
  const [localSearchTermValue, setLocalSearchTermValue] = useState<string>(searchTermValue);

  const handleDelete = (id: string) => {
    if (id) {
      onDelete(id);
    }
  };

  const handleSelectOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTagsFilterValue(event.target.value);
  };

  const handleInputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchTermValue(event.target.value);
  };

  const handleItemClickOnSearch = () => {
    setSearchTermValue(localSearchTermValue);
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
      <label>
        Search Entities:
        <input type="text" value={localSearchTermValue} onChange={handleInputOnChange} />
        <button type="button" onClick={handleItemClickOnSearch}>
          Search
        </button>
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
