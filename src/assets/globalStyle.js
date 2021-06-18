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

.estilo-botao{
    background-image: linear-gradient(to left, #4F2821, #aa4938);
    border: none;
    color: #fff;
    font-weight: 700;
}
.estilo-botao:hover{
    background-image: linear-gradient(to left, #935561, #aa4938);
    border: none;
    color: #fff;
    font-weight: 700;   
}
.estilo-botao-desable{
    background-image: linear-gradient(to left, #4F2821, #aa4938);
    border: none;
    color: #fff;    
    font-weight: 700;
}

`

export default GlobalStyle
