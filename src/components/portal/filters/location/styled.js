import styled from 'styled-components'
import Form from 'react-bootstrap/Form'

export const SBox = styled.div`
  margin: 0% 4%;
  color: #501417;
  @media screen and (max-width: 620px) {
    display: flex;
    flex-direction: column;
    padding: 0% 10%;
  }
`

export const STitle = styled.h5`
  padding: 10px 20px;
  @media screen and (max-width: 620px) {
    padding: 0px;
  }
`

export const SLabel = styled(Form.Label)`
  padding: 10px 20px;
  @media screen and (max-width: 620px) {
    padding: 0px;
    margin-top: 10px;
  }
`
