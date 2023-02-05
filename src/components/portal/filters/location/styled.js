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
export const SButton = styled.button`
  background-color: #fafafa;
  box-shadow: 0px 2px 15px 6px rgb(0 0 0 / 11%);
  margin: 20px 15px;
  padding-top: 3px;
  padding-bottom: 3px;
  padding-left: 0.8rem;
  padding-right: 0.8rem;
  font-weight: 700;
  box-shadow: 0 4px 12px 0 rgb(226 60 82 / 20%);
  background-image: linear-gradient(to left, #4f2821, #aa4938);
  color: white;
  border: none;
`
