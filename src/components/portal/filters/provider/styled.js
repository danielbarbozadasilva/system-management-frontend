import styled from 'styled-components'
import Form from 'react-bootstrap/Form'

export const SBox = styled.div`
  margin: 0% 4%;
  color: #501417;
  @media screen and (max-width: 620px) {
    padding: 0% 7%;
  }
  @media screen and (max-width: 415px) {
    padding: 0% 5.5%;
  }
`

export const STitle = styled.h6`
  padding: 0px 20px;
  margin-top: 20px;
`

export const SLabel = styled(Form.Label)`
  padding: 10px 20px;
`

export const SContainer = styled.div`
  padding: 2px 20px;
`
