import React, { useState } from 'react';
import { NavLink as RRDNavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  NavItem,
  NavLink,
  Container,
  Tooltip,
  Nav, UncontrolledDropdown, DropdownItem, DropdownToggle, DropdownMenu
} from 'reactstrap';
import styled from 'styled-components';
import { Link as LinkRoute } from '@reach/router'
import { Button, Toolbar, Typography, Link } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import history from '../../config/history';

import LogoHeader from '../../assets/img/logo.png';

import '../../assets/css/style.css';


const Header = (props) => {

  const [isOpen, setIsOpen] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggleTooltip = () => setTooltipOpen(!tooltipOpen);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <header>

      {/* <Toolbar className={classes.toolbar}>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          noWrap
          className={classes.toolbarTitle}
        >
          Pagina Inicial
        </Typography>
        <Button variant="outlined" size="small" component={LinkRoute} to="/signin">
          Login
        </Button>
        <Button variant="outlined" size="small" component={LinkRoute} to="/fornecedor_novo">
          Seja um fornecedor
        </Button>
      </Toolbar> */}
      {/* <Toolbar
        component="nav"
        variant="dense"
        className={classes.toolbarSecondary}
      >
        <Link
          component={LinkRoute}
          color="inherit"
          noWrap
          key="home"
          variant="h6"
          to="/"
          className={classes.toolbarLink}
        >
          Home
        </Link>
        <Link
          component={LinkRoute}
          color="inherit"
          noWrap
          key="home1"
          variant="h6"
          to="/produto"
          className={classes.toolbarLink}
        >
          Produtos
        </Link>
      </Toolbar> */}

      <SNavbar className="barraHeader" color="dark" dark expand="lg">
        <Container>
          <Link component={LinkRoute} nowrap to="/" id="logoMain">
            <img className="logo-img" src={LogoHeader} alt="logo" />
          </Link>
          <Tooltip placement="top" isOpen={tooltipOpen} autohide={false} target="logoMain" toggle={toggleTooltip}>
            Pagina Inicial
                    </Tooltip>
          <React.Fragment>
            <Collapse isOpen={isOpen} navbar>
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <SLink exact activeClassName="active" component={LinkRoute} to="/">Inicio</SLink>
                </NavItem>
                <>
                  <NavItem>
                    <SLink exact activeClassName="active" component={LinkRoute} to="/produto">Produtos</SLink>
                  </NavItem>
                  <NavItem>
                    <SLink exact activeClassName="active" component={LinkRoute} to="/fornecedor_novo">Fornecedores</SLink>
                  </NavItem>
                </>

              </Nav>
            </Collapse>

            <Nav >
              <NavItem nav inNavbar>
                <SLink exact activeClassName="active" component={LinkRoute} to="/signin">Logar</SLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <SDropdownToggle nav caret>Inscrever-se</SDropdownToggle>
                <SDropdownMenu>
                  <SLink exact activeClassName="active" component={LinkRoute} to="/signin">Cliente</SLink>
                  <DropdownItem divider />
                  <SLink exact activeClassName="active" component={LinkRoute} to="/signin">Fornecedor</SLink>
                  <DropdownItem divider />
                  <SLink exact activeClassName="active" component={LinkRoute} to="/signin">Administrador</SLink>
                  <DropdownItem divider />
                </SDropdownMenu>
              </UncontrolledDropdown>
            </Nav>

          </React.Fragment>

          <NavbarToggler onClick={toggle} />
        </Container>
      </SNavbar>

    </header>
  )
}

export default Header


const SNavbar = styled(Navbar)`
    background-color: #F8F9FA!important;
    box-shadow: 0 4px 12px 0 rgb(226 60 82 / 20%);
    min-height: 50px;
    padding-bottom: 0.5rem;
    font-size: 18px;
    font-weight: 600;
    border-style: none;

`

const SLink = styled(Link)`
  color: #8b0d32 !important;
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
    background-color: #edd29a!important;
    border:none;

`


const SNavbarBrand = styled(NavbarBrand)`
    font-size: 24px;
    color:white!important;

`
const SDropdownToggle = styled(DropdownToggle)`
    color: #8b0d32 !important;
    padding: 0px 30px;


`