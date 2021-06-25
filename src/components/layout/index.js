import React from 'react'
import Header from './header'
import Footer from './footer'
import styled from 'styled-components'

const Layout = (props) => {
  document.title = 'Regale'
  return (
    <>
      <Header titulo={props.nomeDaPagina} />
      <Main>{props.children}</Main>
      <Footer />
    </>
  )
}

export default Layout

const Main = styled.main`

`
