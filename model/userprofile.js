const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Update the path if necessary
const User = require('./user'); // Update the path if necessary

const UserImage = sequelize.define('Userimage', {
  img_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  image_url: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  // Add more columns as needed
},{
    sequelize,
    modelName: 'userimage',
    freezeTableName: true,
    timestamps: false,
});

// Define the foreign key relationship between Users and UserImage
UserImage.belongsTo(User, { foreignKey: 'user_id' });

// Sync the UserImage model with the database
UserImage.sync({ alter: true })
  .then(() => {
    console.log('UserImage table created successfully.');
  })
  .catch((error) => {
    console.error('Error creating UserImage table:', error);
  });

module.exports = UserImage;
