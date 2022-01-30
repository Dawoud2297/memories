import { createGlobalStyle } from 'styled-components'

export const ReportStyle = createGlobalStyle`
.popup {
    display: flex;
    width: 500px;
    height: 100vh;
    justify-content: center;
    align-items: center;
}

.popup-inner {
    padding: 32px;
    width: 100%;
    max-width: 640px;
    background-color: gray;
}

.popup-inner .close-btn {
    position: absolute;
    top: 16px;
    right: 16px;
}
.box{
    margin-top: 20px;
}
.special{
    display: flex;
    width: 100%;
}
.submit{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 50px;
}
`