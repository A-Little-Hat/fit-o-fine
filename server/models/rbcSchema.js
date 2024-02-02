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
            rbc:{
                type:Number
            },
            des:{
                type:String
            }
});
const rbc=mongoose.model('rbc',FormDataSchema,'patients');
module.exports=rbc;