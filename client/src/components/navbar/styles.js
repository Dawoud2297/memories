import { createGlobalStyle } from 'styled-components'

export const NavStyles=createGlobalStyle`
.container{
    display: flex;
    width: 100%;
    height: 50px;
    margin-bottom: 30px;
    align-items: center;
    border-bottom: 2px solid;
    border-right:none;
    justify-content: center;
    align-items: center;
}
.memosImg{
    display: flex;
    align-items: center;
}
.userInfo{
    background-color: #E1D9D1;
    margin-left: 63%;
}
.userInfo:hover:not(.log){
    outline: 2px solid black;
    border-radius: 5px;
    cursor: pointer;
}
.username{
    display: flex;
    justify-content: center;
    align-items: center;
}
.dropdown-basic{
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    padding: 0%;
    outline:none;
}
.dropItems{
    background-color: gray;
    font-size : 25px;
}
.item{
    margin: 10px;
    margin-right: none;
}
.item:hover{
    background-color: #E1D9D1;
}
`