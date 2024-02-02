const mongoose=require('mongoose')
const FormDataSchema=new mongoose.Schema({
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
            des:{
                type:String
            }
});
const hmg=mongoose.model('hmg',FormDataSchema,'patients');
module.exports=hmg;