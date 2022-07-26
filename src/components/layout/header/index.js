import React from 'react'
import { Container, Nav, Navbar, Dropdown } from 'react-bootstrap'
import {
  SNavbar,
  SDiv,
  SLogin,
  SNavbarLogo,
  SNavbarToggle,
  SDropdownMenu,
  SDropdownToggle
} from '../styled'
import LogoHeader from '../../../assets/img/image-regale-logo.png'
import { Link } from '@reach/router'
import { FaUser } from 'react-icons/fa'

const NavLink = (props) => (
  <Link
    {...props}
    getProps={({ isCurrent }) => {
      return {
        style: {
          textDecoration: isCurrent ? 'underline' : 'none',
          color: '#4a221a'
        }
      }
    }}
  />
)

const Header = (props) => {
  return (
    <>
      <SNavbar expand="lg">
        <Link to="/">
          <SNavbarLogo src={LogoHeader} alt="logo" />
        </Link>
        <SNavbarToggle aria-controls="basic-navbar-nav" />
        <Container>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <SDiv>
                <NavLink to="/">Home</NavLink>
              </SDiv>
              <SDiv>
                <NavLink to="/product">Produtos</NavLink>
              </SDiv>
              <SDiv>
                <NavLink to="/provider">Fornecedores</NavLink>
              </SDiv>
            </Nav>
          </Navbar.Collapse>

          <SNavbar.Collapse className="justify-content-end">
            <Nav>
              <SDiv>
                <NavLink to="/signin">
                  <SLogin>
                    <FaUser style={{ marginRight: '10px' }} />
                    Logar
                  </SLogin>
                </NavLink>
              </SDiv>
              <SDiv>
                <Dropdown>
                <SDropdownToggle variant="Secondary">Cadastrar</SDropdownToggle>
                  <SDropdownMenu>
                    <NavLink to="/registrationclient">Cliente</NavLink>
                    <Dropdown.Item />
                    <NavLink to="/registrationprovider">Fornecedor</NavLink>
                  </SDropdownMenu>
                </Dropdown>
              </SDiv>
            </Nav>
          </SNavbar.Collapse>
        </Container>
      </SNavbar>
    </>
  )
}

export default Header
