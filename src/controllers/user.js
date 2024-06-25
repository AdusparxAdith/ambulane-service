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

    res.status(201).send({ user, token });
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
};
