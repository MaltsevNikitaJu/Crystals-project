const express = require('express');
const { listRoles, assignRole } = require('../controllers/roleController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

const router = express.Router();

router.get('/', authMiddleware, listRoles);
router.post('/assign', authMiddleware, adminMiddleware, assignRole);

module.exports = router;
