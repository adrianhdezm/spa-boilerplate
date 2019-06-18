import React from 'react';

import { IEntity } from '@app/store/entities/models';

const EntityDetails: React.FC<{ data: IEntity }> = ({ data }) => {
  return <>{data.name}</>;
};

export default EntityDetails;
