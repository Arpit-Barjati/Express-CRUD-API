const express = require('express');
const { v4 } = require('uuid');
const validateMiddleware = require('./validationMiddleware.js');
const createUserSchema = require('./validationSchemas/createuser.js');
const updateUserSchema = require('./validationSchemas/updateUser.js');
const app = express();

const PORT = 3000;

const usersData = [];

app.use(express.json());

// Route for Home Page
app.get('/', (req, res) => {
    res.sendFile('index.html', { root : '.' });
});

const getUser = (userId) => {
    const currentUser = usersData.find((user) => user.id === userId);
    if (!currentUser) {
        throw new Error("User doesn't exist");
    }
    return currentUser;
};

// Routes for CRUD operations
app.get('/getUser/:id', (req, res) => {
    const currentUser = getUser(req.params.id);
    res.send(currentUser);
});

const availableUsers = (users) => {
    return users.filter((item) => !item.isDeleted);
};

app.get('/allUsers', (req, res) => {
    res.send(availableUsers(usersData));
});

app.post('/addUser', validateMiddleware(createUserSchema), (req, res) => {
    usersData.push({
        id: v4(),
        ...req.body,
        isDeleted: false
    });
    res.send('New user has been added');
});

app.put('/updateUser/:id', validateMiddleware(updateUserSchema), (req, res) => {
    const currentUser = getUser(req.params.id);
    Object.assign(currentUser, req.body);
    res.send('User updated');
});

app.delete('/removeUser/:id', (req, res) => {
    const currentUser = getUser(req.params.id);
    currentUser.isDeleted = true;
    res.send('User deleted');
});

// Route for Auto suggest users

const getAutoSuggestUsers = (loginSubstring, limit) => {
    const resultArray = usersData
        .filter((item) => item.login.startsWith(loginSubstring))
        .sort((a, b) => a.login.localeCompare(b.login))
        .slice(0, limit);
    return resultArray;
};

app.get('/autoSuggestUsers', (req, res) => {
    const { loginSubstring, limit } = req.query;
    res.send(getAutoSuggestUsers(loginSubstring, limit));
});

// Error Handling
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Server Error!');
});

app.listen(PORT, () => {
    console.log('Server running at port 3000');
});
