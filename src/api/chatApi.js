import request from '@/utils/request.js'

function saveKey(key){
  return request.put('/api/save?key='+key)
}
function chat(msg){
  return request.get('/api/chat?question='+msg)
}
export default{
  saveKey,
  chat
}



