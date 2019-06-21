// tslint:disable
// this is an auto generated file. This will be overwritten

export const getEntity = `query GetEntity($id: ID!) {
  getEntity(id: $id) {
    id
    name
    description
    tags
  }
}
`;
export const listEntitys = `query ListEntitys(
  $filter: ModelEntityFilterInput
  $limit: Int
  $nextToken: String
) {
  listEntitys(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      description
      tags
    }
    nextToken
  }
}
`;
