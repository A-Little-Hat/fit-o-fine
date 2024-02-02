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
            T3:{
                type:String
            },
            T4:{
                type:String
            },
            thyroid_stimulating_hormone:{
                type:String
            },
            des:{
                type:String
            }
});
const thy=mongoose.model('thy',FormDataSchema,'patients');
module.exports=thy;