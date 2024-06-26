const { formatUser } = require('../formatter/user');
const AuthLogic = require('../logic/auth');
const { parseCookies } = require('../utils/authentication');

module.exports = class UserController {
  constructor({ UserService }) {
    this.UserService = UserService;
  }

  async register(req, res) {
    const {
      username, password, name, type, location,
    } = req.body;

    const { UserService } = this;
    const { user, token } = await UserService.register({
      username, password, name, type, location,
    });

    res.status(201).send({ user: formatUser(user), token });
  }

  async login(req, res) {
    const {
      username, password,
    } = req.body;

    const { UserService } = this;
    const { token, user } = await UserService.login({ username, password });

    // Set HTTP-only cookie with the JWT token
    res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; SameSite=Strict`);

    res.send({ token, user });
  }

  // eslint-disable-next-line class-methods-use-this
  async logout(_, res) {
    res.setHeader('Set-Cookie', 'token=invalid; HttpOnly; Path=/; SameSite=Strict');
    res.sendStatus(200);
  }

  // eslint-disable-next-line class-methods-use-this
  async verify(req, res) {
    const cookies = parseCookies(req.headers);
    const verified = AuthLogic.verifyAuthToken(cookies.token);
    if (verified) {
      res.status(200).send({ user: verified });
    }
    else {
      res.setHeader('Set-Cookie', 'token=invalid; HttpOnly; Path=/; SameSite=Strict');
      res.sendStatus(401);
    }
  }
};
