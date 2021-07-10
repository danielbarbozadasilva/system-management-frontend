import React, {useState} from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  NavItem,
  Container,
  Tooltip,
  Nav,
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu
} from 'reactstrap'
import styled from 'styled-components'
import '../../assets/css/style.css'
import LogoHeader from '../../assets/img/logo.png'
import { Link } from '@reach/router'

const NavLink = (props) => (
  <Link
    {...props}
    getProps={({ isCurrent }) => {
      return {
        style: {
          textDecoration: isCurrent ? 'underline' : 'none'
        }
      }
    }}
  />
)

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [tooltipOpen, setTooltipOpen] = useState(false)

  const toggleTooltip = () => setTooltipOpen(!tooltipOpen)
  const toggle = () => setIsOpen(!isOpen)

  return (
    <header>
      <SNavbar className="barraHeader" color="dark" dark expand="lg">
        <Container>
          <Link to="/" id="logoMain">
            <img className="logo-img" src={LogoHeader} alt="logo" />
          </Link>
          <Tooltip
            placement="top"
            isOpen={tooltipOpen}
            autohide={false}
            target="logoMain"
            toggle={toggleTooltip}
          >
            Pagina Inicial
          </Tooltip>
          <>
            <Collapse isOpen={isOpen} navbar>
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <SNavLink to="/" path="/">
                    Inicio
                  </SNavLink>
                </NavItem>
                <>
                  <NavItem>
                    <SNavLink to="/produto">Produtos</SNavLink>
                  </NavItem>
                  <NavItem>
                    <SNavLink to="/fornecedor">Fornecedores</SNavLink>
                  </NavItem>
                </>
              </Nav>
            </Collapse>

            <Nav>
              <NavItem>
                <SNavLink to="/signin">
                  <div className="css-1wmxvcs">
                    <a className="btn btn--icon" href="/sign-in">
                      <div>
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="10 10 20 20"
                            className="injected-svg"
                            data-src="/static/images/inline-svgs/user.svg"
                          >
                            <g
                              fill="none"
                              fillRule="evenodd"
                              transform="translate(10 10)"
                            >
                              <path d="M0 0h20v20H0z" />
                              <circle
                                className="icon-white"
                                cx="10"
                                cy="6"
                                r="3"
                                fill="#464B4F"
                              />
                              <path
                                className="icon-white"
                                fill="#464B4F"
                                d="M15 17s1-4.2-1-6c-2.3-1.5-5.7-1.5-8 0-2 1.8-1 6-1 6h10z"
                              />
                            </g>
                          </svg>
                        </div>
                      </div>
                      Sign in
                    </a>
                  </div>
                </SNavLink>
              </NavItem>
              <div>
                <UncontrolledDropdown>
                  <SDropdownToggle
                    id="botaoCad"
                    className="btn btn--primary css-10sx58j"
                    caret
                  >
                    Sign up
                  </SDropdownToggle>
                  <SDropdownMenu>
                    <SNavLink to="/clientecadastro">Cliente</SNavLink>
                    <DropdownItem divider />
                    <SNavLink to="/fornecedorcadastro">Fornecedor</SNavLink>
                  </SDropdownMenu>
                </UncontrolledDropdown>

                <div>
                  <div />
                </div>
              </div>
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
  background-color: #f8f9fa !important;
  box-shadow: 0 4px 12px 0 rgb(226 60 82 / 30%);
  min-height: 50px;
  padding-bottom: 0.5rem;
  font-size: 18px;
  font-weight: 600;
  border-style: none;
  z-index: 99999;
  width: 100%;
`

const SNavLink = styled(NavLink)`
  color: rgb(74, 34, 26) !important;
  font-weight: 600;
  font-size: 18px;
  letter-spacing: 0.05em;
  margin: 0px 20px;

  @media (max-width: 767.98px) {
    margin: 6px 0;
  }
`
const SDropdownMenu = styled(DropdownMenu)`
  background-color: #f8f9fa !important;
`

const SNavbarBrand = styled(NavbarBrand)`
  font-size: 24px;
  color: white !important;
`
const SDropdownToggle = styled(DropdownToggle)`
  padding: 0px 30px;
  color: rgb(74, 34, 26) !important;
`
