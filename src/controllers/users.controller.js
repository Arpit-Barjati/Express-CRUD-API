const services = require('../services/user.service.js');

const homeRouteHandler = (req, res) => {
    res.sendFile('index.html', { root : '.' });
};

const getUserHandler = async (req, res) => {
    const user = await services.getUserById(req.params.id);
    res.send(user);
};

const allUsersHandler = async (req, res) => {
    const users = await services.getAllUser();
    res.send(users);
};

const addUserHandler = async (req, res) => {
    await services.addUser(req.body);
    res.send('New user has been added');
};

const updateUserHandler = async (req, res) => {
    await services.updateUser(req.body, req.params.id);
    res.send('User updated');
};

const deleteUserHandler = async (req, res) => {
    await services.deleteUser(req.params.id);
    res.send('User deleted');
};

module.exports = {
    homeRouteHandler,
    getUserHandler,
    allUsersHandler,
    addUserHandler,
    updateUserHandler,
    deleteUserHandler
};
