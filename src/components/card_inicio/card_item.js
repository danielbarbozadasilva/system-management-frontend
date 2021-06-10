import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import styled from 'styled-components'
import '../../assets/css/style.css'
import { useSelector } from 'react-redux'
import { FaHeart } from "react-icons/fa";

const CardItem = (props) => {
  const { _id, nome, descricao, status, imagem } = props.item

  return (

    <div>
      <SCard>
        {imagem.length > 0 ? (<SCardImg top width="70%" src={process.env.REACT_APP_API + imagem} />) : ''}
        <div class="item-icon-coracao"><FaHeart /></div>

        <CardBody>
          <CardTitle className="tituloCard">{nome}</CardTitle>
          <CardSubtitle className="subtituloCard">Os mais <strong>Deliciosos</strong></CardSubtitle>
          <hr className="separarTextos" />
          <CardText class="descricaoCard">{descricao}</CardText>
          <SButton>Acessar</SButton>
        </CardBody>
      </SCard>
    </div>


    // <div>
    //   <SCard>
    //     <CardBody>
    //       <CardTitle className="title">{nome}</CardTitle>
    //       {imagem.length>0? (<CardImg top width="100%" class="cardimg" src={process.env.REACT_APP_API + imagem} />):''}
    //       <CardTitle><strong>Descrição: </strong>{descricao}</CardTitle>
    //       <Button className="primary">Informações</Button>
    //     </CardBody>

    //   </SCard>
    // </div>
  )
}

export default CardItem

const SCard = styled(Card)`
border: 1px solid #dcdcdc;
padding: 7px 7px 45px;
position: relative;
background-color: #fff;
box-shadow: -4px 4px 0 #dcdcdc;
margin-bottom: 25px;
height: 475px;
width: 360px;
margin-left:10px;
margin-right:10px;

:hover {
  box-shadow: 5px 10px 20px 1px rgba(0, 0, 0, 0.253)!important;
  transition:1s;
  opacity: 0.5;
}
`

const SCardImg = styled(CardImg)`
 border: none;
 -webkit-border-radius: 0;
 border-radius: 0;
 -webkit-box-shadow: none;
 box-shadow: none;
 width: 353px;
 height: 231px;
 
 `

const SButton = styled(Button)`
 position: absolute;
 bottom: -18px;
 left: 50%;
 transform: translateX(-50%);
 text-align: center;
 color: #fff;
 background-color: #c79c60;
 line-height: 38px;
 text-transform: uppercase;
 padding: 0 15px;
 font-size: 12px;
 border-radius: 5px;
 border: none;
 font-weight: 600;
 font-size: 14px;
 display: inline-flex;
 align-items: center;

 :hover {
  box-shadow: 5px 10px 20px 1px rgba(0, 0, 0, 0.253)!important;
  transition:1s;
  opacity: 0.5;
}
 `



//     .title {
//       font-size: 26px;
//     }

//     :hover {
//         box-shadow: 5px 10px 20px 1px rgba(0, 0, 0, 0.253)!important;
//         transition:1s;
//         opacity: 0.5;
//     }
// `
