const crypto = require('crypto');
const faker = require('faker');

faker.locale = 'de';

const generateObjectId = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz' + '0123456789';

  return crypto.randomBytes(8).reduce((objectId, byte) => {
    objectId += chars[byte % chars.length];
    return objectId;
  }, '');
};

const generateEntities = (lenght = 2) => {
  return [...Array(lenght).keys()].map((index) => {
    const now = new Date();
    return {
      objectId: generateObjectId(),
      createdAt: faker.date.past(),
      updatedAt: now.toISOString(),
      name: faker.company.companyName(),
      description: faker.lorem.paragraphs()
    };
  });
};

const data = {
  entities: generateEntities(100)
};

module.exports = {
  data,
  generateObjectId
};
