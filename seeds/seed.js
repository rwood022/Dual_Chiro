const sequelize = require('../config/connection');
const { Patient, Note, Serial } = require('../models');

const patientSeedData = require('./patientSeedData.json');
const noteSeedData = require('./noteSeedData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const patients = await Patient.bulkCreate(patientSeedData, {
    individualHooks: true,
    returning: true,
  });

  for (const { id } of patients) {
    const newSerial = await Serial.create({
      patient_id: id,
    });
  }

  for (const note of noteSeedData) {
    const newNote = await Note.create({
      ...note,
      // Attach a random patient ID to each note
      patient_id: patients[Math.floor(Math.random() * patients.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();