import React from 'react';

import { IEntity } from '@app/models';

const EntityDetails: React.FC<{ data: IEntity }> = ({ data }) => {
  return <>{data.name}</>;
};

export default EntityDetails;
