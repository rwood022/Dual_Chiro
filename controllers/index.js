const router = require('express').Router();
const { Patient, Note, Serial } = require("../models");

router.get('/', async (req, res) => {
    try{
        const patientData = await Patient.findAll()
        return res.status(200).json(patientData)
        } catch(err) {
          return res.status(500),json(err);
    }
})

module.exports = router;
