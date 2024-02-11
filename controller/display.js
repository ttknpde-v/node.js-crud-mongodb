import winstonLogging from "../log/logging.app.js"
import {modulesApp} from "../service/modules.app.js"
import {connectToMongodb} from "../connect/config.db.js";
import {createPost, readPost, readsPost , updatePost , deletePost , readPostByTopic} from "../crud/service.crud.js";

const app = modulesApp.express()

const bodyParser = modulesApp.bodyParser

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())


await connectToMongodb()

app.get('/reads',async (req, res) => {
    await readsPost().then((posts) => {
        winstonLogging.debug('find() returned '+posts) // returned objects. That you mapped with Schema mongoose
        res.json({
            data: posts,
            status: ["200" , "ok"]
        });
    }).catch( (e) => {
        winstonLogging.debug('found error '+e.toString())
    })
})

app.get('/read/(:id)',async (req, res) => {
    let id = req.params['id']
    await readPost(id).then((posts) => {
        winstonLogging.debug('findById(id) returned '+posts) // returned objects. That you mapped with Schema mongoose
        res.json({
            data: posts,
            status: ["200" , "ok"]
        });
    }).catch( (e) => {
        winstonLogging.debug('found error '+e.toString())
    })
})

app.get('/read/topic/(:topic)',async (req, res) => {
    let topic = req.params['topic']
    await readPostByTopic(topic).then((posts) => {
        winstonLogging.debug('findOne({topic}) returned '+posts) // returned objects. That you mapped with Schema mongoose
        res.json({
            data: posts,
            status: ["200" , "ok"]
        });
    }).catch( (e) => {
        winstonLogging.debug('found error '+e.toString())
    })
})

app.post('/create',async (req, res) => {
    let {id ,topic , details , datetime} = req.body
    // let topic = req.body['topic'] // don't forget setting middle-ware before pass any data from Body in http
    // winstonLogging.debug(`${topic} ${details} ${datetime}`)
    await createPost(id,topic , details , datetime).then((posts) => {
        winstonLogging.debug('create(id ,topic , details , datetime) returned '+posts) // returned objects. That you mapped with Schema mongoose
        // if id didn't exist it returns null
        res.json({
            data: posts,
            status: ["201" , "created"]
        });
    }).catch( (e) => {
        winstonLogging.debug('found error '+e.toString())
    })
})

app.put('/update/(:id)',async (req, res) => {
    let {topic , details , datetime} = req.body
    let id = req.params['id']
     await updatePost(id,topic , details , datetime).then((posts) => {
         winstonLogging.debug('findByIdAndUpdate({id} ,{topic , details , datetime}) returned '+posts) // returned objects. That you mapped with Schema mongoose
         // if id didn't exist it returns null
         res.json({
            data: posts,
            status: ["202" , "accepted"]
        });
    }).catch( (e) => {
        winstonLogging.debug('found error '+e.toString())
    })
})


app.delete('/delete/(:id)',async (req, res) => {
    let id = req.params['id']

    await deletePost(id).then((posts) => {
        winstonLogging.debug('findByIdAndDelete(id) returned '+posts) // returned objects. That you mapped with Schema mongoose Again.
        // if id didn't exist it returns null
        res.json({
            data: posts,
            status: ["200" , "ok"]
        });
    }).catch( (e) => {
        winstonLogging.debug('found error '+e.toString())
    })
})


// Observe. any async functions for crud (mongoose) it returned objects and null



app.listen(3000 , (e) => {
    if (!e) winstonLogging.info('you are on port 3000')
})