import React from 'react'
import Header from './header'
import Footer from './footer'
import styled from 'styled-components';


  const Layout = (props) => {

    document.title = props.nomeDaPagina;
    return (
        <>
            <Header titulo={props.nomeDaPagina} />
            <Main className="container-fluid">
                {props.children}
            </Main>
            <Footer />
        </>
    )
}

export default Layout

const ContainerLayout = styled.div``

const Main = styled.main`
  margin: 0;
  padding: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-appearance: none;
  overflow-x: hidden; 
  `
