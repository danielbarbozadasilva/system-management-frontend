import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`


    * {
        font-family: 'Lato', sans-serif;
        margin: 0;
        padding: 0;
        outline: 0;
    }

    #root {
        display:flex;
        flex-direction:column;
        height: 100vh;
    }

`

export default GlobalStyle
