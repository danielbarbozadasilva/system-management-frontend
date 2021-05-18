import styled from 'styled-components'
import Footer from './footer'
import Header from './header'

const Layout = ({ children }) => {
  return (
    <ContainerLayout>
      <Header />
      {children}
      <Footer />
    </ContainerLayout>
  )
}

export default Layout

const ContainerLayout = styled.div``
