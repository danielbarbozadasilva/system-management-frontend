import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`

@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@200&display=swap");
  

* {
    margin: 0;
    padding: 0;
    outline: 0;
    font-family: "Nunito", Helvetica, Arial, Lucida, sans-serif;
}


#root {
    display: flex;
    flex-direction: column;
    height: 100vh;    
}

`

export default GlobalStyle
