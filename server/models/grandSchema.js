const mongoose =require('mongoose')
const grandSchema= new mongoose.Schema( {
    organization_name:{
        type:String
    },
    patient_id:{
        type:String
    },
    report_date:{
        type:String
    },
    test_name:{
        type:String
    },
    hemoglobin:{
        type:Number
    },
    rbc:{
        type:Number
    },
    hct:{
        type:Number
    },
    mcv:{
        type:Number
    },
    mch:{
        type:Number
    },
    mchc:{
        type:Number
    },
    rdw_cv:{
        type:Number
    },
    tlc:{
        type:Number
    },
    des:{
        type:String
    },
    T3:{
        type:String
    },
    T4:{
        type:String
    },
    thyroid_stimulating_hormone:{
        type:String
    }
  })

const Patient = mongoose.model("patient",grandSchema);
module.exports = Patient