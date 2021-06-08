import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');

    * {
        font-family: 'Lato', sans-serif;
        margin: 0;
        padding: 0;
        outline: 0;
    }


    #root {
        display: flex;
        flex-direction: column;
        height: 100vh;    
    }

    .estilo-botao{
    background-image: linear-gradient(to left, #ff425b, #c42252);
    border: none;
    color: #fff;
    font-weight: 700;
}
.estilo-botao:hover{
    background-image: linear-gradient(to left, #935561, #c42252);
    border: none;
    color: #fff;
    font-weight: 700;   

}
.estilo-botao-desable{
    background-image: linear-gradient(to left, #ff425b, #c42252);
    border: none;
    color: #fff;    
    font-weight: 700;

}
`

export default GlobalStyle;