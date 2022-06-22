const router = require('express').Router();
const res = require('express/lib/response');
const { Patient, Note, Serial } = require("../models");


// GET all patients, localhost:3001/patient
router.get('/patient', async (req, res) => {
    try{
        const patientData = await Patient.findAll()
        return res.status(200).json(patientData)
        } catch(err) {
          return res.status(500).json(err);
    }
});

// GET single patient, localhost:3001/patient/:id
router.get("/patient/:id", async (req, res) => {
    try {
        const patientData = await Patient.findByPk(req.params.id, {
            include: [{ model: Serial }, { model: Note }],
        });

        if (!patientData){
            res.status(404).json({ message: 'No Patient found with that id! '});
        }
        return res.status(200).json(patientData)
    } catch (err) {
        return res.status(500).json(err);
    }
});

// CREATE a patient, localhost:3001/patient
router.post('/patient', async (req, res) => {
    try {
        const patientData = await Patient.create(req.body);
        res.status(200).json(patientData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// DELETE a patient , localhost:3001/patient/:id
router.delete('/patient/:id', async (req, res) => {
    try {
        const patientData = await Patient.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!patientData) {
            res.status(404).json({ message: 'No patient found with that id!'});
            return;
        }
        res.status(200).json(patientData);
    }   catch (err) {
        res.status(500).json(err);
    }
});

// GET a single note, localhost:3001/note/:id/date
router.get('/note/:id/date', async (req, res) => {
    try {
      const noteData = await Note.findByPk(req.params.id, {
        include: [{ model: Patient }],
      });
      if (!noteData) {
        res.status(404).json({ message: 'No note found with that id!' });
        return;
      }
      const dateData = noteData.noteData();
      if (!dateData) {
          res.status(400).json({ message: "No appointment with that date."});
          return;
      }

      res.status(200).json(noteData);
    } catch (err) {
      res.status(500).json(err);


    }
  });

// CREATE a note, localhost:3001/note
router.post("/note", async (req, res) => {
    try {
        const noteData = await Note.create(req.body);
        res.status(200).json(noteData);

    }   catch (err) {
        res.status(400).json(err);
    }
});


// DELETE  a note, localhost:3001/note/:id
router.delete("/note/:id", async (req, res) => {
    try {
        const noteData = await Note.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!noteData) {
            res.status(404).json({ message: "No note found with that id!" });
            return;
        }

        res.status(200).json(noteData);
    }   catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
