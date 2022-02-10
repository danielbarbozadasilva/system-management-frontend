import React from 'react'
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Button
} from 'reactstrap'
import styled from 'styled-components'
import './style.css'
import { navigate } from '@reach/router'

const CardFornecedor = (props) => {
  const { id, fantasyName, address, uf, city, phone } = props.item
  return (
    <div>
      <SCard>
        <CardBody>
          <CardTitle className='tituloCard'>{fantasyName}</CardTitle>
          <CardText className='descricaoCard'>
            <strong>Endereço: </strong>
            {address}
          </CardText>
          <CardText className='descricaoCardfornecedor'>
            <strong>Cidade: </strong>
            {city}
          </CardText>
          <CardText className='descricaoCardfornecedor'>
            <strong>Uf: </strong>
            {uf}
          </CardText>
          <CardText className='descricaoCard'>
            <strong>Telefone: </strong>
            {phone}
          </CardText>
          {id === undefined
            ? (
              <SButton
                onClick={() => navigate(`/product/provider/${props.item._id}`)}
              >
                Produtos
              </SButton>
              )
            : (
              <SButton onClick={() => navigate(`/product/provider/${id}`)}>
                Produtos
              </SButton>
              )}
        </CardBody>
      </SCard>
    </div>
  )
}

export default CardFornecedor

const SCard = styled(Card)`
  border: 1px solid #dcdcdc;
  padding: 7px 7px 45px;
  position: relative;
  background-color: #fff;
  box-shadow: -4px 4px 0 #dcdcdc;
  height: 315px;
  width: 360px;
  margin-left: 40px;
  margin-right: 40px;

  :hover {
    box-shadow: 5px 10px 20px 1px rgba(0, 0, 0, 0.253) !important;
    transition: 1s;
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
    box-shadow: 5px 10px 20px 1px rgba(0, 0, 0, 0.253) !important;
    transition: 1s;
    opacity: 0.5;
  }
`
