import React from 'react';

import { IEntity } from '@app/store/entities/models';

const EntityDetails: React.FC<{ data: IEntity }> = ({ data }) => {
  const tags = data.tags.map((tag, index) => <span key={index}>{tag} | </span>);

  return (
    <>
      <h1>{data.name}</h1>
      <p>{tags}</p>
      <p>{data.description}</p>
    </>
  );
};

export default EntityDetails;
