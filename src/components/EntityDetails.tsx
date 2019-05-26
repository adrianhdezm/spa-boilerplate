import React from 'react';
import { Link } from 'react-router-dom';

import { ENTITY_PREFIX_PATH } from '@app/constants';
import { IEntity } from '@app/store/entities/models';

const EntityDetails: React.FC<{ data: IEntity }> = ({ data }) => (
  <div>
    {data.name}
    <Link to={`${ENTITY_PREFIX_PATH}/${data.objectId}/edit`}>Edit</Link>
  </div>
);

export default EntityDetails;
