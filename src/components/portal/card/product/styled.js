import styled from 'styled-components'
import { Card, Col, Row } from 'react-bootstrap'
import { AiFillStar } from 'react-icons/ai'
import { FaHeart } from 'react-icons/fa'

export const SCard = styled(Card)`
  border: 1px solid #dcdcdc;
  padding: 7px 7px 45px;
  text-align: center;
  color: black;
  position: relative;
  background-color: #fff;
  box-shadow: -1px 1px 0 #dcdcdc;
  height: 435px;
  width: 310px;
  margin-left: 40px;
  margin-right: 40px;
  margin-bottom: 25%;
  @media screen and (max-width: 415px) {
    width: 80%;
  }
  :hover {
    box-shadow: 5px 10px 20px 1px rgba(0, 0, 0, 0.253) !important;
    transition: 1s;
    opacity: 0.5;
  }
`

export const SCardImg = styled(Card.Img)`
  border: none;
  -webkit-border-radius: 0;
  border-radius: 0;
  -webkit-box-shadow: none;
  box-shadow: none;
  width: 295px;
  min-height: 231px;
  object-fit: cover;
  @media screen and (max-width: 415px) {
    width: 100%;
  }
`

export const SCardProvider = styled(Card)`
  border: 1px solid #dcdcdc;
  padding: 7px 7px 45px;
  text-align: center;
  color: black;
  position: relative;
  background-color: #fff;
  box-shadow: -1px 1px 0 #dcdcdc;
  height: 310px;
  width: 310px;
  margin-left: 40px;
  margin-right: 40px;
  @media screen and (max-width: 770px) {
    margin-bottom: 25%;
  }

  :hover {
    box-shadow: 5px 10px 20px 1px rgba(0, 0, 0, 0.253) !important;
    transition: 1s;
    opacity: 0.5;
  }
`

export const SCardTitle = styled(Card.Title)`
  font-weight: bold;
  font-size: 16px;
  text-transform: uppercase;
  margin-bottom: 5px;
  font-family: 'Open Sans', sans-serif;
`

export const SCardSubtitle = styled(Card.Text)`
  margin-top: 5px;
  font-family: 'Open Sans', sans-serif;
  font-size: 13px;
  color: #222;
  font-weight: normal;
  display: block;
`

export const SCardText = styled(Card.Text)`
  margin-bottom: 10px;
  padding-top: 10px;
  margin-top: 20px;
  border-top: 1px solid #dcdcdc;
`

export const SButton = styled.button`
  position: absolute;
  bottom: -18px;
  left: 50%;
  transform: translateX(-50%);
  color: #fff;
  background-color: #c79c60;
  line-height: 38px;
  text-transform: uppercase;
  padding: 0 15px;
  border-radius: 5px;
  border: none;
  font-weight: 500;
  font-size: 12px;
  display: inline-flex;
  align-items: center;
  :hover {
    box-shadow: 5px 10px 20px 1px rgba(0, 0, 0, 0.253) !important;
    transition: 1s;
    opacity: 0.5;
  }
`

export const SPriceCardText = styled(Card.Text)`
  font-size: 22px;
`

export const SFaHeart = styled(FaHeart)`
  width: 68px;
  height: 38px;
  position: absolute;
  top: 200px;
  color: #fff;
  background: #c79c60;
  border-radius: 50% 50% 0 0;
  line-height: 45px;
  z-index: 3;
  left: 50%;
  transform: translateX(-50%);
  padding: 9px;
`

export const SAiFillStar = styled(AiFillStar)`
  width: 20px;
  height: 20px;
  color: rgb(100, 100, 42);
  object-fit: cover;
`

export const StyleImg = styled.img`
  background-position: cover;
  object-fit: cover;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 550px;
  margin-bottom: 100px;
  @media screen and (max-width: 415px) {
    width: 100%;
  }
`

export const ContainerTitle = styled.div`
  width: 100%;
  top: 14%;
  position: absolute;
  z-index: 100;
  @media screen and (max-width: 730px) {
    top: 8%;
  }
`

export const TextTitle = styled.h1`
  font-weight: 400;
  font-family: 'Great Vibes', handwriting;
  word-wrap: break-word;
  color: white;
  font-size: 70px;
  color: #ebebeb;
  text-align: center;
  @media screen and (max-width: 730px) {
    font-size: 55px;
  }
`

export const SButtonTitle = styled.button`
  position: absolute;
  bottom: -60px;
  font-family: 'Helvetica Neue';
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  color: #fff;
  padding: 10px 20px;
  border: none;
  font-size: 16px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  background: #be8c60;
  transition: color 0.3s ease, opacity 0.3s ease;
  :hover {
    box-shadow: 5px 10px 20px 1px rgba(0, 0, 0, 0.253) !important;
    transition: 1s;
    opacity: 0.5;
  }
`

export const ContainerCards = styled(Row)`
  margin: 0px auto;
  margin-bottom: 60px;
  padding: 2%;
  @media screen and (max-width: 770px) {
    margin: 5% 15%;
  }
  @media screen and (max-width: 640px) {
    margin: 5% 8%;
  }
  @media screen and (max-width: 550px) {
    margin: 5% 4%;
  }
  @media screen and (max-width: 460px) {
    margin: 5% 0%;
  }
`

export const ContainerCapion = styled.div`
  margin-left: 45px;
  margin-bottom: 50px;
  padding: 10px;
  border-left: 1px solid #ccc;
`

export const STextCardContainer = styled.h6`
  padding-left: 2.5%;
`

export const ColFilter = styled(Col)`
  padding-right: 15%;
`
