const sequelize = require('../config/connection');
const { Patient, Note, Serial } = require('../models');


const PatientSeedData = [
    {
        name: "Thor",
        phone: "555-5555"
    },
    {
       name: "Black Panter",
       phone: "555-5556"
    },
    {
        name: "Shuri",
        phone: "555-5557"
    },
    {
        name: "Okeye",
        phone: "555-5558"
    }
];

const NoteSeedData = [
    {
        date: "04/04/2022",
        doctor: "Dr. Wood",
         subjective_findings : "Pain in left side of neck with headache",
         objective_findings : "decreased ROM with left cervical rotation, left lateral flexion, and cervical extension. Positive Foraminal Compression and cervical shoulder depression. Weak left shoulder abductors and flexors test.",
        adjustment_code : "98940 CMT 1-2 Areas; C T",
        plan: "continue recommended tx plan 2 times a week for 4 weeks. Re-exam:05/02/2022",
        "patient_id": 1
     },
     {
         date: "04/12/2022",
         doctor: "Dr. Wood",
         subjective_findings: "Pain in right hip with LBP",
         objective_findings: "decreased ROM with left lumbar rotation, left lateral flexion, hip abduction and lumbar flexion. Positive Kemp's Test and Straight Leg Raiser.",
         adjustment_code: "98941 CMT 3-4 Areas; C L S",
         plan: "continue recommended tx plan 2 times a week for 2 weeks. Re-exam:04/26/2022",
         patient_id: 2
      },
      {
         date: "05/20/2022",
         doctor: "Dr. Wood",
         subjective_findings: "Pain in right side of neck when looking over right shoulder",
         objective_findings: "decreased ROM with right cervical rotation, right lateral flexion, and cervical extension. Positive Foraminal Compression and cervical shoulder depression. Weak right shoulder abductors and flexors test.",
         adjustment_code: "98940 CMT 1-2 Areas; C T",
         plan: "continue recommended tx plan 3 times a week for 1 week. Re-exam:05/27/2022",
         patient_id: 3
      },
      {
         date: "05/24/2022",
         doctor: "Dr. Wood",
         subjective_findings: "Pain in upper back and trapezius ",
         objective_findings: "decreased ROM with bilateral cervical rotation and cervical extension. Positive Jackson's Compression and Cervical Shoulder Depression. Weak bilateral shoulder abductors and flexors test.",
         adjustment_code: "98941 CMT 3-4 Areas; C T S",
         plan: "continue recommended tx plan 2 times a week for 2 weeks. Re-exam:06/07/2022",
         patient_id: 4
      }
]

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const patients = await Patient.bulkCreate(PatientSeedData);

  const notes = await Note.bulkCreate(NoteSeedData);

  for (const { id } of patients) {
    const newSerial = await Serial.create({
      patient_id: id,
    });
  }

//   for (const book of bookSeedData) {
//     const newBook = await Book.create({
//       ...book,
//       // Attach a random reader ID to each book
//       reader_id: readers[Math.floor(Math.random() * readers.length)].id,
//     });
//   }

  process.exit(0);
};

seedDatabase();