import React, { useState } from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  NavItem,
  Container,
  Tooltip,
  Nav, UncontrolledDropdown, DropdownItem, DropdownToggle, DropdownMenu
} from 'reactstrap'
import styled from 'styled-components'
import { Link as LinkRoute } from '@reach/router'
import { Link } from '@material-ui/core'

import LogoHeader from '../../assets/img/logo.png'

import '../../assets/css/style.css'

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [tooltipOpen, setTooltipOpen] = useState(false)

  const toggleTooltip = () => setTooltipOpen(!tooltipOpen)
  const toggle = () => setIsOpen(!isOpen)

  return (
    <header>
      <SNavbar className="barraHeader" color="dark" dark expand="lg">
        <Container>
          <Link component={LinkRoute} to="/" id="logoMain">
            <img className="logo-img" src={LogoHeader} alt="logo" />
          </Link>
          <Tooltip placement="top" isOpen={tooltipOpen} autohide={false} target="logoMain" toggle={toggleTooltip}>
            Pagina Inicial
          </Tooltip>
          <>
            <Collapse isOpen={isOpen} navbar>
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <SLink component={LinkRoute} to="/">Inicio</SLink>
                </NavItem>
                <>
                  <NavItem>
                    <SLink component={LinkRoute} to="/produto">Produtos</SLink>
                  </NavItem>
                  <NavItem>
                    <SLink component={LinkRoute} to="/fornecedor">Fornecedores</SLink>
                  </NavItem>
                </>

              </Nav>
            </Collapse>

            <Nav>
              <NavItem>
                <SLink component={LinkRoute} to="/signin">Logar</SLink>
              </NavItem>
              <UncontrolledDropdown>
                <SDropdownToggle caret>Inscrever-se</SDropdownToggle>
                <SDropdownMenu>
                  <SLink component={LinkRoute} to="/clientecadastro">Cliente</SLink>
                  <DropdownItem divider />
                  <SLink component={LinkRoute} to="/fornecedorcadastro">Fornecedor</SLink>

                </SDropdownMenu>
              </UncontrolledDropdown>
            </Nav>

          </>

          <NavbarToggler onClick={toggle} />
        </Container>
      </SNavbar>

    </header>
  )
}

export default Header

const SNavbar = styled(Navbar)`
    background-color: #F8F9FA!important;
    box-shadow: 0 4px 12px 0 rgb(226 60 82 / 30%);
    min-height: 50px;
    padding-bottom: 0.5rem;
    font-size: 18px;
    font-weight: 600;
    border-style: none;
    z-index: 99999;
    width: 100%;
    margin-bottom: 60px;

`

const SLink = styled(Link)`
  color: rgb(74, 34, 26) !important;
  font-weight: 600;
  font-size: 18px;
  letter-spacing: 0.05em;
  margin: 0px 20px;    


    &.active {
      text-decoration: underline;
      font-weight: bold;
    }

    @media (max-width: 767.98px) {
        margin: 6px 0;

    }

`
const SDropdownMenu = styled(DropdownMenu)`
    background-color: #F8F9FA!important;
    border: 1px #8b0d32;

`

const SNavbarBrand = styled(NavbarBrand)`
    font-size: 24px;
    color:white!important;

`
const SDropdownToggle = styled(DropdownToggle)`
    padding: 0px 30px;
    color: rgb(74, 34, 26) !important;

`
