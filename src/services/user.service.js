const db = require('../dataAccess/index.js');
const { v4 } = require('uuid');
const User = db.users;

const getUserById = (userId) => {
    return User.findByPk(userId);
};

const availableUsers = (users) => {
    return users.filter((item) => !item.isDeleted);
};

const getAllUser = async () => {
    const data = await User.findAll();
    return availableUsers(data);
};

const addUser = async (body) => {
    await User.create({
        id: v4(),
        ...body,
        isDeleted: false
    });
};

const updateUser = async (body, id) => {
    await User.update(body, {
        where: {
            id
        }
    });
};

const deleteUser = async (userId) => {
    await User.update({ isDeleted: true }, {
        where: {
            id:userId
        }
    });
};

module.exports = {
    getUserById,
    getAllUser,
    addUser,
    updateUser,
    deleteUser
};
