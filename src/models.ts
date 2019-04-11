export interface IUser {
  username: string;
  password: string;
}

export interface IEntityAttributes {
  name: string;
}

export interface IEntity extends IEntityAttributes {
  objectId: string;
  createdAt: string;
  updatedAt: string;
}
