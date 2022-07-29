import styled from 'styled-components'
import { Card } from 'react-bootstrap'

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

export const SCardText = styled(Card.Text)`
  margin-bottom: 10px;
  padding-top: 10px;
  margin-top: 20px;
  border-top: 1px solid #dcdcdc;
`

export const SCardTitle = styled(Card.Title)`
  font-weight: bold;
  font-size: 16px;
  text-transform: uppercase;
  margin-bottom: 5px;
  font-family: 'Open Sans', sans-serif;
`