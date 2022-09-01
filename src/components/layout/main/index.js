import React from 'react'
import Header from '../header/index'
import Footer from '../footer/index'
import '../../../assets/css/style.css'
import { Main } from '../styled'

const Layout = (props) => {
  document.title = 'Regale'
  return (
    <>
      <Header />
      <Main>{props.children}</Main>
      <Footer />
    </>
  )
}

export default Layout
