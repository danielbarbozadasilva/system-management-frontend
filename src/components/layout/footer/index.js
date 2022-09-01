import React from 'react'
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaWhatsappSquare
} from 'react-icons/fa'
import { MdLocationOn, MdMailOutline, MdPhone } from 'react-icons/md'
import imageFooter from '../../../assets/img/image-regale-footer.png'
import {
  SContainer,
  WebsiteRights,
  ColNetworks,
  ColInfo,
  SocialIconLink,
  FooterLinkTitle,
  FooterName,
  FooterImg
} from '../styled'
import { Row, Col } from 'react-bootstrap'

const Footer = (props) => {
  return (
    <SContainer fluid>
      <Row>
        <ColNetworks>
          <FooterLinkTitle>Redes sociais</FooterLinkTitle>
          <SocialIconLink
            href="https://www.facebook.com/"
            target="_blank"
            rel="noreferrer"
          >
            <FaFacebookSquare />
          </SocialIconLink>
          <SocialIconLink
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
          >
            <FaInstagramSquare />
          </SocialIconLink>
          <SocialIconLink
            href="https://api.whatsapp.com/send?phone=5521982187814"
            target="_blank"
            rel="noreferrer"
          >
            <FaWhatsappSquare />
          </SocialIconLink>
        </ColNetworks>
        <Col>
          <FooterImg src={imageFooter} />
          <FooterName>Developed by Daniel Barboza</FooterName>
          <FooterName>
            Copyright © 2021 - Todos os direitos reservados
          </FooterName>
        </Col>
        <ColInfo>
          <WebsiteRights>
            <MdLocationOn /> Endereço: Rua Gomes Yunes, 225
          </WebsiteRights>
          <WebsiteRights>
            <MdMailOutline /> E-mail: contato@regale.com
          </WebsiteRights>
          <WebsiteRights>
            <MdPhone /> Telefone: +55 (21) 2245-0548
          </WebsiteRights>
        </ColInfo>
      </Row>
    </SContainer>
  )
}

export default Footer
