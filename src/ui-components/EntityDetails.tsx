import React from 'react';
import { IEntity } from '@app/models';

const EntityDetails: React.FC<{ data: IEntity }> = ({ data }) => <div> {data.name} </div>;

export default EntityDetails;
