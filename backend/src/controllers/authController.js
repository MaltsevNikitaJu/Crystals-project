const bcrypt = require("../utils/bcrypt");
const jwt = require("../utils/jwt");
const { createUser, findUserByEmail } = require("../models/userModel");
const { getUserRoles } = require("../models/roleModel");

const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: "Все поля обязательны" });
    }

    const exisitngUser = await findUserByEmail(email);
    if (exisitngUser) {
      return res
        .status(400)
        .json({ error: "Пользователь с таким email уже существует" });
    }

    const hashedPassword = await bcrypt.hashPassword(password);
    const newUser = await createUser({ email, password: hashedPassword, name });

    if (!newUser) {
      return res
        .status(500)
        .json({ error: "Ошибка при создании пользователя" });
    }

    const token = jwt.generateToken(newUser);
    res.status(201).json({ user: newUser, token });
  } catch (error) {
    res.status(500).json({ error: "Ошибка при регистрации пользователя" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user || !(await bcrypt.comparePassword(password, user.password))) {
      return res.status(401).json({ error: "Неверный логин или пароль" });
    }
    const roles = await getUserRoles(user.id);
    const token = jwt.generateToken(user, roles);
    res.status(200).json({ message: "успешный вход", user, token });
  } catch (error) {
    res.status(500).json({ error: "Ошибка авторизации" });
  }
};
module.exports = { register, login };
