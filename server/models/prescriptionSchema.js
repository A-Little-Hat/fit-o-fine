const mongoose=require('mongoose')

const prescriptionSchema = new mongoose.Schema({
    patient_id:{
      type:String
    },
    filename: String,
    contentType: String,
    image: Buffer
  });

const prescription=mongoose.model('Prescription',prescriptionSchema,);
module.exports=prescription;