const Patient = require("./Patient");
const Serial = require("./Serial");
const Note = require("./Note");

Patient.hasOne(Serial, {
    foreignKey: "patient_id",
    onDelete: "CASCADE",
});

Serial.belongsTo(Patient, {
    foreignKey: "patient_id",
});

// A patient can have many notes
Patient.hasMany(Note, {
    foreignKey: 'patient_id',
    onDelete: 'CASCADE',
});

// A note belongs to a single patient
Note.belongsTo(Patient, {
    foreignKey: 'patient_id',
});

module.exports = { Patient, Serial, Note };

