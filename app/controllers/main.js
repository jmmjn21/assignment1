
const handlers = {}

handlers.hello = function(reqObj, callback){
  const allowedMethod = ['get', 'post']
  const myName = reqObj.pathParams[1]

  if(allowedMethod.indexOf(reqObj.method) >= 0){
    callback(200, {message: `Hello ${myName}`})
  }
  else{
    callback(403, {message: `Method ${reqObj.method} is forbidden, allowed methods [${allowedMethod}]`})
  }
}

handlers.notFound = function(reqObj, callback){
  callback(404, {message: 'Operation not found'})
}

module.exports = handlers
