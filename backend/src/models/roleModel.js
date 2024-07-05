const db = require ('../db/connection')

const getRoles = async() => {
    return await db('roles').select('*')
}

const assignRoleToUser = async (userId,roleId) => {
    const [userRole] = await db('users_roles').insert({user_id:userId,role_id:roleId}).returning('*')
    return userRole;
}

const getUserRoles = async (userId) => {
    const roles = await db('users_roles')
        .join('roles', 'users_roles.role_id', '=', 'roles.id')
        .where({ user_id: userId })
        .select('roles.name');
    return roles.map(role => role.name);
};

module.exports = {getRoles,assignRoleToUser,getUserRoles};