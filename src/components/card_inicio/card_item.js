import React from 'react'
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  Button
} from 'reactstrap'
import styled from 'styled-components'
import '../../assets/css/style.css'

const CardItem = (props) => {
  const { _id, nome, descricao, status, imagem } = props.item

  return (
    <div>

      <SCard Style={status ? 'background-color:rgb(252, 245, 255)' : ''}>
        <CardImg className="cardimg" src={imagem} alt="categoria" />

        <CardBody>

          <CardTitle className="title">{nome}</CardTitle>
          <CardTitle><strong>Descrição: </strong>{descricao}</CardTitle>

          <Button className="primary">Informações</Button>
        </CardBody>

      </SCard>
    </div>
  )
}

export default CardItem

const SCard = styled(Card)`
    width: 20rem;
    background-color: #FFF;
    font-size: 20px;
    text-align: center;
    margin-bottom: 20px;
    
    .cardimg {
      height: 220px;
      object-fit: cover;
    }

    .title {
      font-size: 26px;
    }

    :hover {
        box-shadow: 5px 10px 20px 1px rgba(0, 0, 0, 0.253)!important;
        transition:1s;
        opacity: 0.5;
    }
`
