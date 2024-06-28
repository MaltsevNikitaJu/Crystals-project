const { v4: uuidv4 } = require('uuid');
const secret = uuidv4().replace(/-/g, '') + uuidv4().replace(/-/g, '');
console.log(secret);