import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
    project_name : {type:String},
    project_code : {type:String},
    description  : {type:String},
    phone        : {type:String},
    date_of_creation : {type:Date},
    project_type : {type:String}
},{timestamps:true})

export default new mongoose.model("Projects",ProjectSchema);