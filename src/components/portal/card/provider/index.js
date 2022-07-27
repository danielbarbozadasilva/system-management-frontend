import React from 'react'
import { Card } from 'react-bootstrap'
import { navigate } from '@reach/router'
import { SCard, SButton, SCardText, SCardTitle } from '../styled'

const Cardprovider = (props) => {
  const { id, fantasyName, address, uf, city, phone } = props.item
  return (
    <div>
      <SCard>
        <Card.Body>
          <SCardTitle>{fantasyName}</SCardTitle>
          <SCardText>
            <strong>Endereço: </strong>
            {address}
          </SCardText>
          <Card.Text>
            <strong>Cidade: </strong>
            {city}
          </Card.Text>
          <Card.Text>
            <strong>Uf: </strong>
            {uf}
          </Card.Text>
          <SCardText>
            <strong>Telefone: </strong>
            {phone}
          </SCardText>
          {id === undefined ? (
            <SButton
              onClick={() => navigate(`/product/provider/${props.item._id}`)}
            >
              Produtos
            </SButton>
          ) : (
            <SButton onClick={() => navigate(`/product/provider/${id}`)}>
              Produtos
            </SButton>
          )}
        </Card.Body>
      </SCard>
    </div>
  )
}

export default Cardprovider
