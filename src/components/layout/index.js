import React from 'react';
import Header from './header';
import Footer from './footer';
import styled from 'styled-components';

const Layout = (props) => {
  return (
    <ContainerLayout>
      <Header />
      <Main className="container-fluid">
        {props.children}
      </Main>
      <Footer />
    </ContainerLayout>
  )
}

export default Layout

const ContainerLayout = styled.div``

const Main = styled.main`
    width: 85%;
    flex: 1;
`

