import styled from 'styled-components'
import Form from 'react-bootstrap/Form'

export const SBox = styled.div`
  padding: 2% 11%;
  @media screen and (max-width: 415px) {
    padding: 1% 3%;
  }
`

export const STitle = styled.h5`
  padding-bottom: 1%;
`

export const SLabel = styled(Form.Label)`
  padding: 10px 20px;
`

export const SContainer = styled.div`
  padding: 5px 20px;
`
