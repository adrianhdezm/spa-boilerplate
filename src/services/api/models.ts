/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type CreateEntityInput = {
  id?: string | null,
  name: string,
  description?: string | null,
};

export type UpdateEntityInput = {
  id: string,
  name?: string | null,
  description?: string | null,
};

export type DeleteEntityInput = {
  id?: string | null,
};

export type ModelEntityFilterInput = {
  id?: ModelIDFilterInput | null,
  name?: ModelStringFilterInput | null,
  description?: ModelStringFilterInput | null,
  and?: Array< ModelEntityFilterInput | null > | null,
  or?: Array< ModelEntityFilterInput | null > | null,
  not?: ModelEntityFilterInput | null,
};

export type ModelIDFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelStringFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type CreateEntityMutationVariables = {
  input: CreateEntityInput,
};

export type CreateEntityMutation = {
  createEntity:  {
    __typename: "Entity",
    id: string,
    name: string,
    description: string | null,
  } | null,
};

export type UpdateEntityMutationVariables = {
  input: UpdateEntityInput,
};

export type UpdateEntityMutation = {
  updateEntity:  {
    __typename: "Entity",
    id: string,
    name: string,
    description: string | null,
  } | null,
};

export type DeleteEntityMutationVariables = {
  input: DeleteEntityInput,
};

export type DeleteEntityMutation = {
  deleteEntity:  {
    __typename: "Entity",
    id: string,
    name: string,
    description: string | null,
  } | null,
};

export type GetEntityQueryVariables = {
  id: string,
};

export type GetEntityQuery = {
  getEntity:  {
    __typename: "Entity",
    id: string,
    name: string,
    description: string | null,
  } | null,
};

export type ListEntitysQueryVariables = {
  filter?: ModelEntityFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListEntitysQuery = {
  listEntitys:  {
    __typename: "ModelEntityConnection",
    items:  Array< {
      __typename: "Entity",
      id: string,
      name: string,
      description: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateEntitySubscription = {
  onCreateEntity:  {
    __typename: "Entity",
    id: string,
    name: string,
    description: string | null,
  } | null,
};

export type OnUpdateEntitySubscription = {
  onUpdateEntity:  {
    __typename: "Entity",
    id: string,
    name: string,
    description: string | null,
  } | null,
};

export type OnDeleteEntitySubscription = {
  onDeleteEntity:  {
    __typename: "Entity",
    id: string,
    name: string,
    description: string | null,
  } | null,
};
