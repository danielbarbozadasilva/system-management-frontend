import { Col, Form } from 'react-bootstrap'
import styled from 'styled-components'

export const SFormSignup = styled(Form)`
  width: 85%;
  margin: 120px auto;
  background-color: #fafafa;
  color: #4f2821;
  box-shadow: 0px 2px 15px 6px rgba(0, 0, 0, 0.11);
  padding: 50px;
  position: center;
  @media screen and (max-width: 500px) {
    margin: 0px auto;
    width: 100%;
  }
`

export const SFormSign = styled(Form)`
  width: 85%;
  margin: 120px auto;
  background-color: #fafafa;
  color: #4f2821;
  box-shadow: 0px 2px 15px 6px rgba(0, 0, 0, 0.11);
  padding: 50px;
  position: center;
  @media screen and (max-width: 500px) {
    box-shadow: none;
    margin-top: 17%;
    width: 100%;
  }
`

export const SColFooter = styled(Col)`
  line-height: 1.5;
  font-weight: 500;
  color: #000;
  padding: 20px 0;
`

export const STextForm = styled.h2`
  line-height: 1.5;
  font-weight: 500;
  padding-left: 10px;
  border-left: 1px solid #771700;
  margin: 30px 0px 50px 0px;
`

export const STextLink = styled.a`
  color: #771700;
  margin: 5px;
`

export const SButton = styled.button`
  box-shadow: 0px 2px 15px 6px rgb(0 0 0 / 11%);
  margin: 20px 0px;
  padding-top: 7px;
  padding-bottom: 7px;
  font-weight: 700;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  box-shadow: 0 4px 12px 0 rgb(226 60 82 / 20%);
  background-image: linear-gradient(to left, #4f2821, #aa4938);
  color: white;
  border: none;
  :disabled {
    box-shadow: none;
    background-image: linear-gradient(to left, #c1a9a4, #c1a9a4);
  }
`

export const SContainer = styled.div`
  width: 100%;
  background-color: #fafafa;
  display: flex;
  @media screen and (max-width: 720px) {
    flex-direction: column;
  }
`

export const SFormGroup = styled(Form.Group)`
  padding: 0% 7%;
  margin-bottom: 3%;
  @media screen and (max-width: 720px) {
    flex-direction: column;
    padding: 2% 0%;
  }
`
