const mongoose=require('mongoose')
const CBCDataSchema=new mongoose.Schema({

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
            }
});
const cbc=mongoose.model('cbc',CBCDataSchema,'patients');
module.exports=cbc;
