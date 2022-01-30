import { createGlobalStyle } from 'styled-components'

export const ComStyles= createGlobalStyle`
.popup {
    display: flex;
    width: 100vw;
    flow-direction: column;
    margin-right:  10%;   
    background-color: gray;
}
.popup-inner {
    display: flex;
    height: 100vh;
    width: 100vw;
    float:left;
    background-color: lightgreen;
}
.comContainer{
    background-color: blue;
    margin-bottom: 20px
}
.commentsTab{
    display: flex;
    overflow-x: hidden;
    position: absolute;
    top: 50px;
    bottom: 150px;
    right:0px;
    left: 0px;
    
}
.commentsTab: hover{
    overflow-y: scroll;
    right:20px;
    
}
.comments{
    padding-left: 20px;
    width: 45.5vw;
    background-color: white;
}
.commenterName{
    margin: 10px;
    margin-bottom : 30px;
    font-size: 20px;
    font-weight: bolder;
}
.comment{
    margin-top: 0px;
    margin-left: 30px;
}
.actions{
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    border-top: 1px solid gray;
    border-radius: 20px;
}
.button{
    margin: auto 0px;
    width : 300px;
    padding: auto 100px;
}
.button:hover{
    background-color: blue;
    color: white;
}
.inputContainer {
    display: flex;
    width: 99.5vw;
    margin-top:405.5px;
}
.input{ 
    resize: none;
}
.buttonSub{
    background-color: transparent;
}
.close-btn:hover{
    background-color: transparent;
 } 
.closeOrder{
    background-color: transparent;
    color: black;
    border: none;
    margin-top: 0px;
    padding-top: 0px;
}
.replyform{
    display: flex;
    width: 100vw;
}
.buttonReply{
    background-color: white;
    color : black;
    border : none;
}
.replies{
    display: column;
    float: right;
    justify-content: center;
    algin-items: center;
    background-color: white;
    border-top: solid 5px rgb(100, 136, 101);
    border-radius: 30px;
    height: 100%;
    width: 44.5vw;
    padding: 0px 20px;
}
.replyerName{
    font-size: 20px;
    font-weight: bolder;
    
}
.reply{
    display: flex;
    margin-left: 20px;
    margin-top: 10px;
}
.debate{
    
}
.replyStuffOne{
    display: flex;
    width: 45vw;
    margin-left: 20px
}
.replyStuff{
    display: flex;
    width: 45vw;
}
.replyStuffer{
    display: flex;
    float: left;
    width: 44vw;
}
`