const express = require('express');
const db = require('./dataAccess/index.js');
const router = require('./routes/users.routes.js');

const app = express();
const PORT = 3000;

db.sequelize.sync({ force: true }).then(() => {
    console.log('Drop and re-sync db.');
});

app.use(express.json());

app.use('/users', router);

app.listen(PORT, () => {
    console.log('Server running at port 3000');
});
