import React from 'react';

import { IEntity } from '@app/models';

const EntityList: React.FC<{ data: IEntity[] }> = ({ data }) => {
  const entities = data.map((item: IEntity, index: number) => <p key={index}> {item.name}</p>);
  return <>{entities}</>;
};

export default EntityList;
