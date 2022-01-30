import { allMemories, 
    createMemo, 
    updateMemo, 
    deleteMemo, 
    likeMemo, 
    commentMemo, 
    likeComment, 
    replyOnComment, 
    likeReply, 
    debateComment,
    likeDebate,
    reportMemo } from '../http-common'
import { ALLMEMORIES, 
    CREATEMEMO, 
    UPDATEMEMO, 
    DELETEMEMO, 
    LIKEMEMO,
    COMMENT, 
    LIKECOMMENT,
    REPLYONCOMMENT,
    LIKEREPLY,
    DEBATECOMMENT,
    LIKEDEBATE,
    REPORTMEMO } from '../types'


export const displayMemories = () => async (dispatch)=>{
    try {
        const { data } = await allMemories()
        dispatch({type:ALLMEMORIES, payload : data})
        
    } catch (error) {
        console.log(error)
    }
}

export const createMemory = (form) => async (dispatch) =>{
    try {
        const { data } = await createMemo(form)
        dispatch({type:CREATEMEMO, payload:data})
    } catch (error) {
        console.log(error)
    }

}

export const updateMemory = (id,form)=> async (dispatch) =>{
    try {
        const {data} = await updateMemo(id, form)
        dispatch({type:UPDATEMEMO, payload:data})
    } catch (error) {
        console.log(error)
    }
}

export const likeMemory = (id) => async (dispatch) =>{
    try {
        const user = JSON.parse(localStorage.getItem('profile'));
        const { data } = await likeMemo(id, user?.token)
        dispatch({type:LIKEMEMO, payload:data})
    } catch (error) {
        console.log(error)
    }
}

export const reportMemory = (id,report) => async (dispatch) =>{
    try {
        const { data } = await reportMemo(id,report)
        dispatch({type:REPORTMEMO, payload:data})        
    } catch (error) {
        console.log(error)
    }
}


export const likeComm = (id,id2) => async (dispatch) =>{
    try {
        const user = JSON.parse(localStorage.getItem('profile'));
        const { data } = await likeComment(id,id2,user?.token)
        dispatch({type:LIKECOMMENT, payload:data})
    } catch (error) {
        console.log(error)
    }
}

export const likeRep = (id,id2,id3) => async (dispatch) =>{
    try {
        const { data } = await likeReply(id,id2,id3)
        dispatch({type:LIKEREPLY, payload: data})        
    } catch (error) {
        console.log(error)
    }
}

export const commentOnMemory = (id,comm) => async (dispatch) =>{
    try {
        const { data } = await commentMemo(id,comm)
        dispatch({type:COMMENT, payload:data})
    } catch (error) {
        console.log(error)
    }
}
export const replyOComment = (id,id2,rep) => async (dispatch) =>{
    try {
        const {data} = await replyOnComment(id,id2,rep)
        dispatch({type:REPLYONCOMMENT, payload:data})        
    } catch (error) {
        console.log(error)
    }
}

export const debateCom = (id,id2,id3,debate) => async (dispatch) =>{
    try {
        const { data } = await debateComment(id,id2,id3,debate)
        dispatch({type:DEBATECOMMENT, payload : data})
    } catch (error) {
        console.log(error)
    }
}
export const likeDeb = (id, id2, id3, id4) => async (dispatch) =>{
    try {
        const { data } = await likeDebate(id, id2, id3, id4)
        dispatch({type:LIKEDEBATE, payload: data})
    } catch (error) {
        console.log(error)
    }
} 

export const deleteMemory = (id)=>async (dispatch)=>{
    try {
         await deleteMemo(id)
         dispatch({type:DELETEMEMO, payload:id})
    } catch (error) {
        console.log(error)
    }
}