const { User } = require('../../../models/user');
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');

describe('user.generateAuthToken', () => {
  it('should return a valid jwt', () => {
    const objectId = new mongoose.Types.ObjectId().toHexString();
    const user = new User({ _id: objectId, isAdmin: true });
    const token = user.generateAuthToken();
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    expect(decoded).toMatchObject({ _id: objectId, isAdmin: true });
  });
});
