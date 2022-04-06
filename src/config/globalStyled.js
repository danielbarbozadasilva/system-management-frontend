import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`

    * {
        margin: 0;
        padding: 0;
        outline: 0;
    }

    #root {
        display: flex;
        flex-direction: column;
        height: 100vh;
    }

    .button-style {
        background-color: rgb(74, 95, 214);
        border: none;
        color: #fff;
        font-weight: 700;
    }

    .button-style:hover {
        background-color: rgb(74, 95, 214);
        border: none;
        color: #fff;
        font-weight: 700;   

    }

    .button-style-disable {
        background-color: rgb(74, 95, 214);
        border: none;
        color: #fff;    
        font-weight: 700;
    }
`

export default GlobalStyle
