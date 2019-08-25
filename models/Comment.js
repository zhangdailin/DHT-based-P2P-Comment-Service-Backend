const IPFS = require('ipfs')
const OrbitDB = require('orbit-db')
const uuid = require('uuid/v4');

let db;
const ipfsOptions = {
	EXPERIMENTAL: {
	pubsub: true
	}
}
// Create IPFS instance
const ipfs = new IPFS(ipfsOptions)

function Comment(comment){
    this.URL=comment.URL,
  	this.Value=comment.Value
}

ipfs.on('ready', async(err,results) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  
  const orbitdb = await OrbitDB.createInstance(ipfs, {
                directory: './orbitdb/'
            })
  db = await orbitdb.docs('orbit.commenttest')
  await db.load()
  console.log(db.address.toString())
  
Comment.prototype.addComment=function(callback){
    const comment={
        URL: this.URL,
        Value: this.Value.replace(/fuck/g, '*')
    }
    const id = uuid()
    db.put({_id: id, URL: comment.URL, Value: comment.Value})
	callback(err, results)
}

Comment.prototype.selectall=function(callback){
	const getall = db.get('')
	callback(err,getall);
}

Comment.prototype.selecturl=function(callback){
	const comment={
		URL: this.URL
    }
	const getselect = db.query((doc) =>  doc.URL == comment.URL)
    console.log(getselect )
	callback(err, getselect)
}
})
module.exports = Comment;