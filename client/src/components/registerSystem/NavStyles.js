import { createGlobalStyle } from 'styled-components'

export const NavStyles = createGlobalStyle`
body{
    margin: 0;
}
.navContainer{
    display: flex;
    height: 80px;
    background-color: lightgreen;
    align-items: center;
    padding: '0px 24px';
    max-width: 100%;
    border-bottom: '0.5px solid #c9cace'
}
.logo{
    font-size: 50px;
    margin-left: 20px;
    text-shadow:  1px 1px 2px red, 0 0 1em red;
}
`