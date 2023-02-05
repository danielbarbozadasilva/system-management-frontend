import styled from 'styled-components'
import { Button } from '@material-ui/core'

export const Image = styled.img`
  max-width: 170px;
  max-height: 170px;
  margin: 10px;
  border: thin solid #eee;
  border-radius: 5%;
  overflow: hidden;
  object-fit: cover;
`

export const Submit = styled.div`
  margin: 25px 7px;
`

export const SInput = styled.input`
  text-align: right;
  border: none;
  background-color: white;
`

export const SBox = styled.div`
  width: 600px;
  padding: 20px 80px;
`

export const SButton = styled(Button)`
  background-color: #303f9f;
  color: white;
  :hover {
    background-color: #5c6abc;
  }
  :disabled {
    background-color: #dddddd;
  }
`

