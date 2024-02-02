const express = require('express');
const mongoose=require('mongoose')
const cors=require('cors');
const axios=require('axios');

const cbc=require('./models/cbcSchema')
const rbcs=require('./models/rbcSchema')
const hmgg=require('./models/hemoglobinSchema')
const kidney=require('./models/kidneyTestSchema')
const thy=require('./models/thyroidSchema')
const search=require('./models/reportDateSearchSchema')
const app = express();

app.use(express.json());
app.use(cors());
mongoose.connect('mongodb://127.0.0.1:27017/healthlab',{useNewurlParser:true});

const userSchema=new mongoose.Schema({
  userid:{
      type:String
      
  },
  password:{
      type:String
      
  }

})
const user=mongoose.model('user',userSchema,'patientDB')
// new user registration
app.post('/addNewPatient',async(req,res)=>{
  // console.log("/login")
  // await user.insertOne({userid:req.body.ID,password:req.body.pass })
  let username = new user({userid:req.body.ID,password:req.body.pass })
  username.save()
  res.send(true)
}) 

// user login credential check
app.post('/login',async(req,res)=>{
  // console.log("/login")
  await user.findOne({userid:req.body.ID}).then((founduser)=>{
      if(req.body.pass==founduser.password)
      {
          console.log('password matched')
          res.status(200).send(true)
      }
      else{
          res.status(400).send(false)
      }
  }).catch((error)=>{
      res.status(400).send(error)
  })
  // res.json({userid:req.body.ID,pass:req.body.pas})
})


app.post('/insertcbc', async(req, res) => {

  const organization_name=req.body.org_name;
  const patient_id=req.body.patient_id;
  const report_date=req.body.report_date;
  const test_name=req.body.tname;
  const hemoglobin=req.body.HEMOGLOBIN;
  const rbc=req.body.RBC;
  const hct=req.body.HCT;
  const mcv=req.body.MCV;
  const mch=req.body.MCH;
  const mchc=req.body.MCHC;
  const rdw_cv=req.body.RDWCV;
  const tlc=req.body.TLC;
  const des=req.body.comment;

  const formData=new cbc({
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
  console.log('Inserted data : ',formData)
  try{
    await formData.save();
    res.send("inserted data")
  } catch(err){
    console.log(err);

  }
});

app.post('/insertrbc', async(req, res) => {
  
  const organization_name=req.body.org_name;
  const patient_id=req.body.patient_id;
  const report_date=req.body.report_date;
  const test_name=req.body.tname;
  const rbc=req.body.value;
  const des=req.body.comment;

    const formData=new rbcs({
      organization_name,
      patient_id,
      report_date,
      test_name,
      rbc,
      des
    })
    console.log('Inserted data : ',formData)
    try{
      await formData.save();
      res.send("inserted data")
    } catch(err){
      console.log(err);
  
    }
  });

  app.post('/inserthmg', async(req, res) => {
  
    const organization_name=req.body.org_name;
    const patient_id=req.body.patient_id;
    const report_date=req.body.report_date;
    const test_name=req.body.tname;
    const hemoglobin=req.body.value;
    const des=req.body.comment;

  
      const formData=new hmgg({
        organization_name,
        patient_id,
        report_date,
        test_name,
        hemoglobin,
        des
      })
      console.log('Inserted data : ',formData)
      try{
        await formData.save();
        res.send("inserted data")
      } catch(err){
        console.log(err);
    
      }
    });
    app.post('/inserthyroid', async(req, res) => {
  
      const organization_name=req.body.org_name;
      const patient_id=req.body.patient_id;
      const report_date=req.body.report_date;
      const test_name=req.body.tname;
      const T3=req.body.T3;
      const T4=req.body.T4;
      const thyroid_stimulating_hormone=req.body.thsh;

      const des=req.body.comment;
  
    
        const formData=new thy({
          organization_name,
          patient_id,
          report_date,
          test_name,
          T3,
          T4,
          thyroid_stimulating_hormone,
          des
        })
        console.log('Inserted data : ',formData)
        try{
          await formData.save();
          res.send("inserted data")
        } catch(err){
          console.log(err);
      
        }
      });
  

    app.post('/insertkidneytest', async(req, res) => {
  
      const organization_name=req.body.org_name;
      const patient_id=req.body.patient_id;
      const report_date=req.body.report_date;
      const test_name=req.body.tname;
      const colour=req.body.colour;
      const appearance=req.body.appearance;
      const specificgravity=req.body.specificgravity;
      const pH=req.body.pH;
      const glucose=req.body.glucose;
      const protein=req.body.protein;
      const ketones=req.body.ketones;
      const blood=req.body.blood;
      const bilirubin=req.body.bilirubin;
      const urobilinogen=req.body.urobilinogen;
      const leucocyte_esterase=req.body.leucocyte_esterase;
      const nitrite=req.body.nitrite;
      const pus_cells=req.body.pus_cells;
      const redbloodcells=req.body.redbloodcells;
      const epithelialcells=req.body.epithelialcells;
      const casts=req.body.casts;
      const crystals=req.body.crystals;
      const yeast=req.body.yeast;
      const bacteria=req.body.bacteria;

      const des=req.body.comment;
  
    
        const formData=new kidney({
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
        console.log('Inserted data : ',formData)
        try{
          await formData.save();
          res.send("inserted data")
        } catch(err){
          console.log(err);
      
        }
      });

  app.post('/insertreportdate',async(req,res)=>{

    const reportDate1=req.body.rdate1;
    const reportDate2=req.body.rdate2;
    const org=req.body.org_name;
    console.log(reportDate1,reportDate2)
    const data=await search.find({report_date:{$gte:reportDate1,$lte:reportDate2},organization_name:org})
         
    console.log(data)
     res.json(data);
  });

  app.post('/inserttestname',async(req,res)=>{

    const testName=req.body.tname;
    const org=req.body.org_name;
    const a=String(testName)
    console.log(a)
    if(a=="CBC"){
     const  data=await search.find({test_name:testName,organization_name:org})
     console.log(data)
     res.json(data);
    }
    else if(a=="RBC"){
     const x=await search.find({rbc:{$gt:0},organization_name:org})
     console.log(x)
     res.json(x)
    }
    else if(a==='HEMOGLOBIN'){
      const x=await search.find({hemoglobin:{$gt:0},organization_name:org})
     console.log(x)
     res.json(x)
    }
    else if(a.toUpperCase()==='THYROID'){
      const x=await search.find({test_name:testName,organization_name:org})
     console.log(x)
     res.json(x)
    }
  });
  app.post('/searchpatientid',async(req,res)=>{

    const patid=req.body.pid;
    
    const org=req.body.org_name;
    const data=await search.find({patient_id:patid,organization_name:org})
         
    console.log(data)
     res.json(data);
  });
  app.post('/searchpatientid&reportdate',async(req,res)=>{

    const patid=req.body.pid;
    const reportDate1=req.body.rdate1;
    const reportDate2=req.body.rdate2;
    const org=req.body.org_name;
    const data=await search.find({report_date:{$gte:reportDate1,$lte:reportDate2},organization_name:org,patient_id:patid})
         
    console.log(data)
     res.json(data);
  });
  app.post('/getallorg',async(req,res)=>{

    const patid=req.body.pid;
    
    const org=req.body.org_name;
    const data=await search.find({organization_name:org})
         
    console.log(data)
     res.json(data);
  });

const port=4000;



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const Patient = require('./models/grandSchema')
app.post('/getPatientData',async(req,res)=>{
  const pid = req.body.pid
  console.log(pid)
  // res.send(pid)
  const data = await cbc.find({
    patient_id:pid
  })

  res.send(data)
  // cbc.find({patient_id:pid}).then((response)=>{
  //    res.status(200).send(response)
  // }).catch(e=>res.send(e) )
})
