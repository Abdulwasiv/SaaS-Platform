const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Community = sequelize.define('Community', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: () => require('@theinternetfolks/snowflake')(),
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Community;
