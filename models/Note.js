const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Note extends Model {}

Note.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    doctor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subjective_findings: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    objective_findings: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    adjustment: {
      type: DataTypes.STRING,
      defaultValue: 1
    },
    plan: {
      type: DataTypes.STRING,
      defaultValue: true
    },
    // Store a reference of the `id` of the `Patient` 
    patient_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'patient',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'note'
  }
);

module.exports = Note;
