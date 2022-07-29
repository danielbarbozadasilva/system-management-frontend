import React from 'react'
import { Card } from 'react-bootstrap'
import { navigate } from '@reach/router'
import {
  SCard,
  SCardImg,
  SCardTitle,
  SCardText,
  SCardSubtitle,
  SFaHeart,
  SButton
} from './styled'

const CardItem = (props) => {
  const { id, name, description, image } = props.item
  return (
    <div>
      <SCard>
        {image?.length > 0 ? <SCardImg src={image} /> : ''}
        <SFaHeart />
        <Card.Body>
          <SCardTitle>{name}</SCardTitle>
          <hr />
          <SCardSubtitle>
            Os mais <strong>Deliciosos</strong>
          </SCardSubtitle>
          <SCardText>{description}</SCardText>

          <SButton onClick={() => navigate(`/product/category/${id}`)}>
            Produtos
          </SButton>
        </Card.Body>
      </SCard>
    </div>
  )
}

export default CardItem
