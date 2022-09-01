import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        outline: 0;
    }
   
    .form-control {
        height: 45px;
        background: rgba(0, 0, 0, 0.05);
        color: #000;
        font-size: 16px;
        border-radius: 50px;
        border: 1px solid transparent;
        padding: 1% 3%;
        margin-bottom: 1%;
        -o-transition: all 0.2s ease-in-out;
        transition: all 0.2s ease-in-out;
    }
`

export default GlobalStyle
