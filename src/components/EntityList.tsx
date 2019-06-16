import React from 'react';
import { Link } from 'react-router-dom';

import { IEntity } from '@app/models';

const EntityList: React.FC<{ data: IEntity[] }> = ({ data }) => {
  const entities = data.map((item: IEntity, index: number) => (
    <div key={index}>
      <Link to={`/${item.id}`}>{item.name}</Link>
      <Link to={`/${item.id}/edit`}>Edit</Link>
    </div>
  ));
  return <>{entities}</>;
};

export default EntityList;
