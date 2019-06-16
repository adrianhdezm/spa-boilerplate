import React from 'react';
import { Link } from 'react-router-dom';

import { IEntity } from '@app/models';

const EntityList: React.FC<{ data: IEntity[] }> = ({ data }) => {
  const entities = data.map((item: IEntity, index: number) => (
    <Link to={`/${item.id}`} key={index}>
      {item.name}
    </Link>
  ));
  return <>{entities}</>;
};

export default EntityList;
