import styled from 'styled-components'
import { Container, Col, Navbar, Dropdown } from 'react-bootstrap'

export const SNavbar = styled(Navbar)`
  width: 100%;
  font-family: 'Nunito', Helvetica;
  background-color: #f8f9fa !important;
  box-shadow: 0 4px 12px 0 rgb(226 60 82 / 30%);
  font-weight: 600;
  border-style: none;
  z-index: 1;
  @media screen and (max-width: 990px) {
    background-color: #501417;
  }
`
export const SDropdownMenu = styled(Dropdown.Menu)`
  padding: 10px;
  background-color: #f8f9fa !important;
`

export const SDropdownToggle = styled(Dropdown.Toggle)`
  font-weight: 600;
  padding: 0.725rem 0.805rem 0.4375rem;
  text-align: center;
  color: rgb(74, 34, 26) !important;
  border-color: rgba(70, 75, 79, 0.2);
  margin-right: 5px;
  color: #464b4f;
`

export const SLink = styled.div`
  font-family: 'Montserrat', sans-serif !important;
  text-decoration: none;
  top: 0;
  display: inline-block;
  font-size: 1rem;
  line-height: 1.5;
  list-style: none;
  padding-left: 50px;
  &:hover {
    text-decoration: underline;
    transition: 0.3s ease-out;
  }
  @media screen and (max-width: 990px) {
    text-align: center;
    &:hover {
      background-color: #b5a48d;
    }
  }
  @media screen and (max-width: 1670px) {
    padding: 25px 40px;
  }
  @media screen and (max-width: 1125px) {
    padding: 25px 10px;
  }
`

export const SLogin = styled.div`
  border-color: rgba(70, 75, 79, 0.2);
  border: 1px solid rgba(70, 75, 79, 0.2);
  padding: 0.625rem 0.625rem 0.4375rem;
  &:hover {
    border-color: rgba(70, 75, 79, 0.2);
    border: 1px solid #4a221a;
    transition: 0.2s ease-out;
  }
  @media screen and (max-width: 990px) {
    border: none;
  }
`

export const SNavbarLogo = styled.img`
  width: 10rem;
  margin: 5px 40px;
`

export const SNavbarToggle = styled(Navbar.Toggle)`
  margin: 0px 30px;
  background-color #b5a48d;
  color: #a59174 !important;
`

export const Main = styled.div`
  font-family: 'Nunito', Helvetica, Arial, Lucida, sans-serif;
  font-size: 0.95rem;
  line-height: 1.5;
  font-weight: 500;
  overflow: hidden;
  flex: 1;
  position: relative;
  text-align: justify;
  color: #771700;
  min-height: 100vh;
`

export const SContainer = styled(Container)`
  position: center;
  text-align: center;
  font-size: 24px;
  color: white;
  background-color: #dbc084;
`

export const WebsiteRights = styled.div`
  font-size: 16px;
  padding: 12px 20px;
  @media screen and (max-width: 990px) {
    text-align: left;
  }
`

export const ColNetworks = styled(Col)`
  text-align: left;
  margin: 80px;
  @media screen and (max-width: 990px) {
    margin: 0;
    padding-top: 30px;
  }
`

export const ColInfo = styled(Col)`
  text-align: right;
  margin: 80px;
  @media screen and (max-width: 990px) {
    padding-top: 30px;
    margin: 0;
  }
`

export const SocialIconLink = styled.a`
  font-size: 40px;
  padding-left: 28px;
  color: white;
  &:hover {
    color: #c7b7ba;
    transition: 0.5s ease-out;
  }
`

export const FooterLinkTitle = styled.h1`
  text-transform: uppercase;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 3px;
  color: white;
  border-left: 5px solid white;
  padding: 5px 40px;
  margin: 10px 0px;
`

export const FooterName = styled.h1`
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 3px;
  text-align: center;
  color: white;
  @media screen and (max-width: 990px) {
    display: none;
  }
`

export const FooterImg = styled.img`
  position: center;
  width: 125px;
  heigth: 125px;
  margin-top: 70px;
  margin-bottom: 25px;
  @media screen and (max-width: 990px) {
    display: none;
  }
`
