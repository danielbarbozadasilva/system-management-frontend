import React from 'react'
import { Card } from 'react-bootstrap'
import {
  SCard,
  SCardText,
  SCardTitle,
  SCardImg,
  SFaHeart,
  SAiFillStar,
  SPriceCardText
} from './styled'

const CardProduct = (props) => {
  const { name, description, price, image, likes } = props.item
  return (
    <div>
      <SCard>
        {image?.length > 0 ? <SCardImg src={image} /> : ''}
        <SFaHeart />
        <Card.Body>
          <SCardTitle>{name}</SCardTitle>
          <hr />
          <SPriceCardText>{price}</SPriceCardText>
          <SCardText>{description}</SCardText>
          {likes === true ? <SAiFillStar /> : ''}
        </Card.Body>
      </SCard>
    </div>
  )
}

export default CardProduct
