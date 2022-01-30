import express, { Router } from 'express'
const router = express.Router()

import { allMemories,
        createMemory, 
        editMemory, 
        deleteMemo, 
        likeMemo, 
        commentOnMemo, 
        likeComment, 
        replyComment, 
        likeReply, 
        commentOnReply,
        likeDebate,
        reportMemo 
                        } from '../api/memories.js';
import { register, login } from '../api/users.js'
import { registeration } from '../validation/valid.js'
import auth from '../middleware/auth.js'

router.route('/register').post(registeration,register)
router.route('/login').post(login)

router.route('/').get(auth,allMemories)
router.post('/creatmemo',auth,createMemory)
router.put('/:id/editmemo',auth,editMemory)
router.delete('/:id',auth,deleteMemo)
router.patch('/:id/likememo',auth,likeMemo)
router.post('/:id/commentermemo',auth,commentOnMemo)
router.patch('/:id/:id2/likecomment',auth,likeComment)
router.post('/:id/:id2/replycomment',auth,replyComment)
router.patch('/:id/:id2/:id3/lickrep',auth,likeReply)
router.post('/:id/:id2/:id3/commentonreply',auth,commentOnReply)
router.patch('/:id/:id2/:id3/:id4/likedeepest',auth,likeDebate)
router.post('/:id/reportpost',auth,reportMemo)


export default router;