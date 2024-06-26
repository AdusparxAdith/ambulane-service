const { formatUser } = require('../formatter/user');
const AuthLogic = require('../logic/auth');

module.exports = class LocationService {
  constructor({ UserDataAccess, config }) {
    this.UserDataAccess = UserDataAccess;
    this.config = config;
  }

  generateAuthToken({ user }) {
    const formattedUser = formatUser(user);
    const { config } = this;
    const secret = config.authSecret;
    return AuthLogic.generateAuthToken({ ...formattedUser, secret });
  }

  async register({
    username, password, name, type, location,
  }) {
    const { UserDataAccess } = this;

    const { user } = await UserDataAccess.createUser({
      username, password, name, type, location,
    });
    const token = this.generateAuthToken({ user });

    return { user, token };
  }

  async login({ username, password }) {
    const { UserDataAccess } = this;

    const { user } = await UserDataAccess.getUser({ username, password });

    if (!user) throw new Error('Authentication Failed');

    const token = this.generateAuthToken({ user });

    return { token, user: formatUser(user) };
  }
};
