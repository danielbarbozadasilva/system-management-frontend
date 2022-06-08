import React from 'react'
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap'
import { AiFillStar } from 'react-icons/ai'
import styled from 'styled-components'
import './style.css'
import { FaHeart } from 'react-icons/fa'

const CardProduct = (props) => {
  const { name, description, price, image, likes } = props.item
  return (
    <div>
      <SCard>
        {image?.length > 0 ? <SCardImg src={image} /> : ''}
        <div className="item-icon-heart">
          <FaHeart />
        </div>

        <CardBody>
          <CardTitle className="titleCard">{name}</CardTitle>
          <hr />
          <CardText className="cardProductPrice">{price}</CardText>
          <CardText className="cardDescription">{description}</CardText>
          {likes === true? (
            <CardText>
              <SAiFillStar />{likes}
            </CardText>
          ) : (
            ''
          )}
        </CardBody>
      </SCard>
    </div>
  )
}

export default CardProduct

const SCard = styled(Card)`
  border: 1px solid #dcdcdc;
  padding: 7px 7px 45px;
  position: relative;
  background-color: #fff;
  box-shadow: -1px 1px 0 #dcdcdc;
  height: 435px;
  width: 310px;
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
  width: 295px;
  min-height: 231px;
  object-fit: cover;
`

const SAiFillStar = styled(AiFillStar)`
  width: 20px;
  height: 20px;
  object-fit: cover;
`
