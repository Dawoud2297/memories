import axios from 'axios'



const API = axios.create({baseURL : "http://localhost:5000/a2mbrothers/memories/v3"})

API.interceptors.request.use(req=>{
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req;
})

export const allMemories = () => API.get('/')
export const createMemo = (postMemory) => API.post('/creatmemo',postMemory)
export const updateMemo = (id,editMemory) => API.put(`/${id}/editmemo`,editMemory) 
export const deleteMemo = (id) => API.delete(`/${id}`)
export const likeMemo = (id) => API.patch(`/${id}/likememo`)
export const commentMemo = (id,comm) => API.post(`/${id}/commentermemo`,comm)
export const likeComment = (id,id2) => API.patch(`/${id}/${id2}/likecomment`)
export const replyOnComment = (id,id2,rep) => API.post(`/${id}/${id2}/replycomment`,rep)
export const debateComment = (id,id2,id3,debate) => API.post(`/${id}/${id2}/${id3}/commentonreply`,debate) 
export const likeReply = (id,id2,id3) => API.patch(`${id}/${id2}/${id3}/lickrep`)
export const likeDebate = (id,id2,id3,id4) => API.patch(`${id}/${id2}/${id3}/${id4}/likedeepest`)
export const reportMemo = (id,report) => API.post(`/${id}/reportpost`,report)
export const register = (userData) => API.post('/register',userData)
export const login = (userData) => API.post('/login',userData)
