import postEntity from "../entity/post.js"

const readsPost = async ()=> {
    return postEntity.find()
}

const readPostByTopic = async (topic)=> {
    return postEntity.findOne({topic : topic}) // using findOne() function. the way to select by where
}


const readPost = async (id)=> {
    return postEntity.findById(id)
}
const createPost = async ( _id ,topic , details , datetime )=> {
    return postEntity.create( { _id , topic , details , datetime } )
}
const updatePost = async ( _id ,topic , details , datetime )=> {
    return postEntity.findByIdAndUpdate( { _id } ,{ topic , details , datetime })
}

const deletePost = async ( _id)=> {
    return postEntity.findByIdAndDelete( _id )
}



export { // export those function when you import just Calling the same name
    readsPost ,
    readPost ,
    createPost ,
    updatePost ,
    deletePost ,
    readPostByTopic
}