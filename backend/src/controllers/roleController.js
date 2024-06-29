const { getRoles, assignRoleToUser } = require('../models/roleModel');

const listRoles = async (req, res) => {
  try {
    const roles = await getRoles();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка получения списка ролей' });
  }
};

const assignRole = async (req, res) => {
  try {
    const { userId, roleId } = req.body;
    const userRole = await assignRoleToUser(userId, roleId);
    res.status(201).json(userRole);
  } catch (error) {
    res.status(500).json({ error: 'Ошбика присвоения роли' });
  }
};

module.exports = { listRoles, assignRole };
