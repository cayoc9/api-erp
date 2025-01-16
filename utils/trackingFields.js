const { DataTypes } = require('sequelize');

const trackingFields = {
  schema: {
    createDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    createUser: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    updateDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updateUser: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  },

  getCreateFields: (userId) => ({
    createDate: new Date(),
    createUser: userId
  }),

  getUpdateFields: (userId) => ({
    updateDate: new Date(),
    updateUser: userId
  })
};

module.exports = trackingFields;
