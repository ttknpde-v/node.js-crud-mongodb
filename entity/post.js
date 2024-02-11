/*
   this file uses for config collection (database mongo)
   **
*/
import {modulesApp} from "../service/modules.app.js"

const Schema = modulesApp.mongoose.Schema

const postSchema = new Schema({
    _id : Number ,
    topic: String,
    details: String,
    datetime: String,
},{
    /*
        The versionKey is a property set on each document when first created by Mongoose.
        This keys value contains the internal revision of the document.
        The name of this document property is configurable. The default is __v.
    */
    versionKey: false // if you don't need it
})

const postEntity = modulesApp.mongoose.model("posts", postSchema)

export default postEntity

