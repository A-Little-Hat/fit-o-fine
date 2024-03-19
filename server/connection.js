const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
require('dotenv').config()
const cbc = require('./models/cbcSchema')
const axios = require('axios')
const rbcs = require('./models/rbcSchema')
const hmgg = require('./models/hemoglobinSchema')
const kidney = require('./models/kidneyTestSchema')
const thy = require('./models/thyroidSchema')
const search = require('./models/reportDateSearchSchema')
const Tesseract = require('tesseract.js');
const multer = require('multer');
const fs = require('fs');
const upload = multer({ dest: 'uploads/' });
const app = express();
app.use(express.json());
app.use(cors());
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");
const { PromptTemplate } = require('@langchain/core/prompts');
const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");

mongoose.connect(process.env.MONGO_DB_URL, { useNewurlParser: true });
const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = process.env.GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: MODEL_NAME });

const generationConfig = {
  temperature: 0.9,
  topK: 1,
  topP: 1,
  maxOutputTokens: 2048,
};
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
];

const chatModel = new ChatGoogleGenerativeAI({
  apiKey: API_KEY,
  modelName: "gemini-1.0-pro",
  maxOutputTokens: 5,
  safetySettings
});
const chat = model.startChat({
  generationConfig,
  safetySettings,
  history: [
  ],
});
const contextDetectionPrompt = PromptTemplate.fromTemplate(
  `You are a assistant with predictive sense like an intelligent human and has a deep knowledge in the medical field and in normal conversation. You can jugde if a sentence is from medical field or a greeting or any other context. If you find a sentence is from medical domain or a greeting message just simply answer true otherwise reply with a false. Don't return more than one word. Answer with "true" or "false".
  question: {question}?
  answer:`
);
// const contextDetectionPrompt = PromptTemplate.fromTemplate(
//   `You have the capability of discerning whether a given sentence belongs to the medical domain, a greeting, or any other context. If the sentence is from the medical field or a greeting, respond with "true"; otherwise, reply with "false". Provide your response in just one word.
//   question: {question}?
//   answer:`
// );
// const greetingDetectionPrompt = PromptTemplate.fromTemplate(
//   `You are a assistant with expert communication styles like an intelligent human. You can find a question is any type of greeting or not. If {sentence} is a greeting message then reply it. if it is not a greeting message then reurn 'false'. Don't return more than one word if it is not a greeting msg.
//   answer:`
// );
const contextDetectionChain = contextDetectionPrompt.pipe(chatModel)
// const greetingDetectionChain = greetingDetectionPrompt.pipe(chatModel)

async function runChat(input) {
  const result = await chat.sendMessage(input);
  const response = result.response;
  const data = !response.promptFeedback.blockReason ? response.text() : "INVALID QUERY"
  return (data);
}


const userSchema = new mongoose.Schema({
  userid: {
    type: String, required: true, unique: true
  },
  password: {
    type: String, required: true
  }

})
const user = mongoose.model('user', userSchema, 'patientDB')
// new user registration
app.post('/addNewPatient', async (req, res) => {
  // console.log("/login")
  try {
    user.findOne({ userid: req.body.ID }).then((founduser) => {
      if (founduser) {

      } else {
        // await user.insertOne({userid:req.body.ID,password:req.body.pass })
        let username = new user({ userid: req.body.ID, password: req.body.pass })
        username.save()
      }
    })
  } catch (err) {
    console.log(err)
  }
  res.status(200).send(true)
})

// user login credential check
app.post('/login', async (req, res) => {
  // console.log("/login")
  await user.findOne({ userid: req.body.ID }).then((founduser) => {
    if (req.body.pass == founduser.password) {
      console.log('password matched')
      res.status(200).send(true)
    }
    else {
      res.status(400).send(false)
    }
  }).catch((error) => {
    res.status(400).send(error)
  })
  // res.json({userid:req.body.ID,pass:req.body.pas})
})


app.post('/insertcbc', async (req, res) => {

  const organization_name = req.body.org_name;
  const patient_id = req.body.patient_id;
  const report_date = req.body.report_date;
  const test_name = req.body.tname;
  const hemoglobin = req.body.HEMOGLOBIN;
  const rbc = req.body.RBC;
  const hct = req.body.HCT;
  const mcv = req.body.MCV;
  const mch = req.body.MCH;
  const mchc = req.body.MCHC;
  const rdw_cv = req.body.RDWCV;
  const tlc = req.body.TLC;
  const des = req.body.comment;

  const formData = new cbc({
    organization_name,
    patient_id,
    report_date,
    test_name,
    hemoglobin,
    rbc,
    hct,
    mcv,
    mch,
    mchc,
    rdw_cv,
    tlc,
    des
  })
  console.log('Inserted data : ', formData)
  try {
    await formData.save();
    res.send("inserted data")
  } catch (err) {
    console.log(err);

  }
});

app.post('/insertrbc', async (req, res) => {

  const organization_name = req.body.org_name;
  const patient_id = req.body.patient_id;
  const report_date = req.body.report_date;
  const test_name = req.body.tname;
  const rbc = req.body.value;
  const des = req.body.comment;

  const formData = new rbcs({
    organization_name,
    patient_id,
    report_date,
    test_name,
    rbc,
    des
  })
  console.log('Inserted data : ', formData)
  try {
    await formData.save();
    res.send("inserted data")
  } catch (err) {
    console.log(err);

  }
});

app.post('/inserthmg', async (req, res) => {

  const organization_name = req.body.org_name;
  const patient_id = req.body.patient_id;
  const report_date = req.body.report_date;
  const test_name = req.body.tname;
  const hemoglobin = req.body.value;
  const des = req.body.comment;


  const formData = new hmgg({
    organization_name,
    patient_id,
    report_date,
    test_name,
    hemoglobin,
    des
  })
  console.log('Inserted data : ', formData)
  try {
    await formData.save();
    res.send("inserted data")
  } catch (err) {
    console.log(err);

  }
});
app.post('/inserthyroid', async (req, res) => {

  const organization_name = req.body.org_name;
  const patient_id = req.body.patient_id;
  const report_date = req.body.report_date;
  const test_name = req.body.tname;
  const T3 = req.body.T3;
  const T4 = req.body.T4;
  const thyroid_stimulating_hormone = req.body.thsh;

  const des = req.body.comment;


  const formData = new thy({
    organization_name,
    patient_id,
    report_date,
    test_name,
    T3,
    T4,
    thyroid_stimulating_hormone,
    des
  })
  console.log('Inserted data : ', formData)
  try {
    await formData.save();
    res.send("inserted data")
  } catch (err) {
    console.log(err);

  }
});


app.post('/insertkidneytest', async (req, res) => {

  const organization_name = req.body.org_name;
  const patient_id = req.body.patient_id;
  const report_date = req.body.report_date;
  const test_name = req.body.tname;
  const colour = req.body.colour;
  const appearance = req.body.appearance;
  const specificgravity = req.body.specificgravity;
  const pH = req.body.pH;
  const glucose = req.body.glucose;
  const protein = req.body.protein;
  const ketones = req.body.ketones;
  const blood = req.body.blood;
  const bilirubin = req.body.bilirubin;
  const urobilinogen = req.body.urobilinogen;
  const leucocyte_esterase = req.body.leucocyte_esterase;
  const nitrite = req.body.nitrite;
  const pus_cells = req.body.pus_cells;
  const redbloodcells = req.body.redbloodcells;
  const epithelialcells = req.body.epithelialcells;
  const casts = req.body.casts;
  const crystals = req.body.crystals;
  const yeast = req.body.yeast;
  const bacteria = req.body.bacteria;

  const des = req.body.comment;


  const formData = new kidney({
    organization_name,
    patient_id,
    report_date,
    test_name,
    colour,
    appearance,
    specificgravity,
    pH,
    glucose,
    protein,
    ketones,
    blood,
    bilirubin,
    urobilinogen,
    leucocyte_esterase,
    nitrite,
    pus_cells,
    redbloodcells,
    epithelialcells,
    casts,
    crystals,
    yeast,
    bacteria,
    des
  })
  console.log('Inserted data : ', formData)
  try {
    await formData.save();
    res.send("inserted data")
  } catch (err) {
    console.log(err);

  }
});

app.post('/insertreportdate', async (req, res) => {

  const reportDate1 = req.body.rdate1;
  const reportDate2 = req.body.rdate2;
  const org = req.body.org_name;
  console.log(reportDate1, reportDate2)
  const data = await search.find({ report_date: { $gte: reportDate1, $lte: reportDate2 }, organization_name: org })

  console.log(data)
  res.json(data);
});

app.post('/inserttestname', async (req, res) => {


  const fieldList = {
    hemoglobin: ['Hemoglobin', 'CBC'],
    cbc: ['CBC'],
    rbc: ['rbc', 'CBC'],
    hct: ['CBC'],
    mcv: ['CBC'],
    mch: ['CBC'],
    mchc: ['CBC'],
    rdw_cv: ['CBC'],
    tlc: ['CBC'],
    t3: ['Thyroid'],
    t4: ['Thyroid'],
    thyroid_stimulating_hormone: ['Thyroid'],
    thyroid: ['Thyroid'],
  }
  let testName = req.body.tname;
  let org = req.body.org_name;

  let result = await Patient.find({ test_name: { $in: fieldList[testName] }, organization_name: org })
  console.log({ testName })
  console.log({ result })
  res.json(result);

});
app.post('/searchpatientid', async (req, res) => {

  const patid = req.body.pid;

  const org = req.body.org_name;
  const data = await search.find({ patient_id: patid, organization_name: org })

  console.log(data)
  res.json(data);
});
app.post('/searchpatientid&reportdate', async (req, res) => {

  const patid = req.body.pid;
  const reportDate1 = req.body.rdate1;
  const reportDate2 = req.body.rdate2;
  const org = req.body.org_name;
  const data = await search.find({ report_date: { $gte: reportDate1, $lte: reportDate2 }, organization_name: org, patient_id: patid })

  console.log(data)
  res.json(data);
});
app.post('/getallorg', async (req, res) => {


  const org = req.body.org_name;
  const data = await search.find({ organization_name: org })

  console.log(data)
  res.json(data);
});

const port = 4000;



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const Patient = require('./models/grandSchema')
app.post('/getPatientData', async (req, res) => {
  const pid = req.body.pid
  console.log(pid)
  // res.send(pid)
  // cbc.find
  const data = await Patient.find({
    patient_id: pid
  })

  res.send(data)
  // cbc.find({patient_id:pid}).then((response)=>{
  //    res.status(200).send(response)
  // }).catch(e=>res.send(e) )
})

// Chat section
app.post('/getChatResponse', async (req, res) => {
  const input = req.body.input
  let { content } = await contextDetectionChain.invoke({ question: "input" })
  console.log({ content })
  const answer = content !== 'false' ? await runChat(input) : 'Out of context'
  console.log({ answer })
  // res.send({answer:content})
  res.send({ answer })
})

app.post('/extractTextFromImage', upload.single('image'), async (req, res) => {
  try {
    // Get the image from the request
    let image = req.file;
    console.log(image)
    // Extract text using Tesseract.js
    const { data: { text } } = await Tesseract.recognize(image.path, 'eng');
    console.log({ text })
    // delete file
    fs.unlinkSync(image.path);
    // data extract
    // Split the text into lines
    const lines = text.split('\n');

    // Initialize an object to store parsed data
    const parsedData = {};

    // Iterate over each line and parse key-value pairs
    lines.forEach(line => {
      if (line.trim() !== '') {
        const [key, value] = line.split(':');
        const trimmedKey = key.trim();
        const trimmedValue = value.trim();
        parsedData[trimmedKey] = trimmedValue;
      }
    });
    let formData;
    if (parsedData['Test name'].toLowerCase() === 'hemoglobin') {
      formData = new hmgg({
        organization_name: parsedData['Organization'],
        patient_id: parsedData['Patient ID'],
        report_date: parsedData['Date'],
        test_name: 'Hemoglobin',
        hemoglobin: parsedData['Hemoglobin'],
        des: parsedData['Description']
      })
    }
    else if (parsedData['Test name'].toLowerCase() === 'thyroid') {
      formData = new thy({
        organization_name:parsedData['Organization'],
        patient_id: parsedData['Patient ID'],
        report_date: parsedData['Date'],
        test_name: 'Thyroid',
        T3: parsedData['T3'],
        T4: parsedData['T4'],
        thyroid_stimulating_hormone: parsedData['TSH'],
        des: parsedData['Description']
      })
    }
    else if (parsedData['Test name'].toLowerCase() === 'rbc') {
      formData = new rbcs({
        organization_name:parsedData['Organization'],
        patient_id: parsedData['Patient ID'],
        report_date: parsedData['Date'],
        test_name: 'RBC',
        rbc: parsedData['RBC'],
        des: parsedData['Description']
      })
    }
    else if (parsedData['Test name'].toLowerCase() === 'cbc') {
      formData = new cbc({
        organization_name: parsedData['Organization'],
        patient_id: parsedData['Patient ID'],
        report_date: parsedData['Date'],
        test_name: 'CBC',
        hemoglobin: parsedData['Hemoglobin'],
        rbc: parsedData['RBC'],
        hct: parsedData['HCT'],
        mcv: parsedData['MCV'],
        mch: parsedData['MCH'],
        mchc: parsedData['MCHC'],
        rdw_cv: parsedData['RDW CV'],
        tlc: parsedData['TLC'],
        des: parsedData['Description']
      })
    }
    else{

    }

    console.log('Inserted data : ', formData)
    try {
      await formData.save();
      res.status(200).send(true)
    } catch (err) {
      console.log(err);

    }
  } catch (error) {
    console.error(error);
    res.status(500).send(false);
  }
});
