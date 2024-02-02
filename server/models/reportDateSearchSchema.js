const mongoose=require('mongoose')
const FormDataSchema=new mongoose.Schema({
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
        },
        {
            collection:'patients'
        }
);
const rdate=mongoose.model('FormDataSchema',FormDataSchema);
module.exports=rdate;