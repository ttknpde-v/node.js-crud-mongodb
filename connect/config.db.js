/*
   this file uses for connect to mongo db
   **
*/
import winstonLogging from "../log/logging.app.js"
import {modulesApp} from "../service/modules.app.js";

export const connectToMongodb = async () => { // this way to export you also can call it like a function

    try {
        /*
        // mongoose.set('strictQuery', false) // strict (adj เข็มงวด)
        modulesApp.mongoose.connect("mongodb://127.0.0.1:27017/comments").then(

            (result) => {

            winstonLogging.debug('Mongo connected '+result)

        }).catch(
            (e) => {
                winstonLogging.debug('found error '+e.toString())
        })
        */

        // good way. It'll log message if connected
        modulesApp.mongoose.connect('mongodb://127.0.0.1:27017/comments', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
            .then(() => {
                winstonLogging.info('connected mongo database')
            })
            .catch((err) => {
                winstonLogging.debug('failed to connect cause is '+err.toString())
                throw err
            });

    } catch (e) {

        winstonLogging.debug(e.toString())
        process.exit()

    }
}


// export const connect = connectToMongodb() // remember when you export it won't a function. you can call it without ()

