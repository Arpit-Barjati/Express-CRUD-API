module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('Users', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true
        },
        login: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        age: {
            type: Sequelize.INTEGER
        },
        isDeleted: {
            type: Sequelize.BOOLEAN
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    });
    return User;
};
