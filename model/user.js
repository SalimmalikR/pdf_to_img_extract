const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Update the path if necessary

const Users = sequelize.define('Users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Users',
    freezeTableName: true,
    timestamps: false,
});
Users.sync()
    .then(() => {
        console.log('Users table created successfully.');
    })
    .catch((error) => {
        console.error('Error creating User table:', error);
    });

module.exports = Users;
