const { getUserRoles } = require('../models/roleModel');

const adminMiddleware = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const roles = await getUserRoles(userId);
    if (!roles.includes('admin')) {
      return res.status(403).json({ error: 'Доступ запрещен' });
    }
    next();
  } catch (error) {
    res.status(500).json({ error: 'Ошибка проверки роли' });
  }
};

module.exports = adminMiddleware;
