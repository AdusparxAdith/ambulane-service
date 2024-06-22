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
    const { token } = await UserService.login({ username, password });

    res.send(token);
  }
};
