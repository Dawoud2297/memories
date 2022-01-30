import { ALLMEMORIES, CREATEMEMO, UPDATEMEMO, LIKEMEMO, DELETEMEMO, COMMENT, LIKECOMMENT, REPLYONCOMMENT, LIKEREPLY, DEBATECOMMENT, LIKEDEBATE, REPORTMEMO } from "../types";


 const memories = (memories=[], action)=>{
    switch (action.type) {
        case ALLMEMORIES: 
            return action.payload;
        case CREATEMEMO:
            return [...memories,action.payload];
        case LIKEMEMO:
            return memories.map((memo)=>(memo._id === action.payload._id ? action.payload : memo));
        case LIKECOMMENT:
            return action.payload;
        case LIKEREPLY:
            return action.payload;
        case LIKEDEBATE:
            return action.payload;
        case UPDATEMEMO:
            return  memories.map((memo)=>(memo._id === action.payload._id ? action.payload : memo));
        case COMMENT:
            return  memories.map(memory=>(memory.comment.id === action.payload._id ? action.payload : memory.comment))
        case REPLYONCOMMENT:
            return action.payload;
        case DEBATECOMMENT:
            return action.payload;
        case REPORTMEMO:
            return action.payload;
        case DELETEMEMO:
            return memories.filter(memo=>memo._id !== action.payload)
            default:
                return memories;
    }
}

export default memories

