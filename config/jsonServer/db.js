const crypto = require('crypto');

const generateObjectId = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz' + '0123456789';

  return crypto.randomBytes(8).reduce((objectId, byte) => {
    objectId += chars[byte % chars.length];
    return objectId;
  }, '');
};

const now = new Date();
const data = {
  entities: [
    {
      objectId: generateObjectId(),
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
      name: 'Short-Term Goals'
    },
    {
      objectId: generateObjectId(),
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
      name: 'Long-Term Goals'
    }
  ]
};

module.exports = {
  data,
  generateObjectId
};
