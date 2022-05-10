import React from 'react'
import imageFooter from '../../assets/img/image-regale-footer.png'
import { FaFacebookSquare, FaInstagramSquare, FaWhatsappSquare } from 'react-icons/fa'
import { MdLocationOn, MdMailOutline, MdPhone } from 'react-icons/md'

const Footer = (props) => {
  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-3 col-md-4 col-sm-12 col-xs-12 socialNetworks">
            <h3 className="titleSocialNetworks">Redes sociais</h3>
            <div className="icons-socialNetworks">
              <a href="https://www.facebook.com/" target="_blank" rel="noreferrer"><FaFacebookSquare className="iconeFooter" /></a>
              <a href="https://www.instagram.com/" target="_blank" rel="noreferrer"><FaInstagramSquare className="iconeFooter" /></a>
              <a href="https://api.whatsapp.com/send?phone=+5521992690225" target="_blank" rel="noreferrer"><FaWhatsappSquare className="iconeFooter" /></a>
            </div>
          </div>

          <div className="col-lg-5 col-md-4 col-sm-12 col-xs-12 ">
            <img className="imageFooter" src={imageFooter} alt="imagem do footer" />
          </div>

          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 info">

            <div className="address">
              <h6><MdLocationOn className="iconInfo" />
                Endereço: Rua Gomes Yunes, 225
              </h6>
            </div>
            <div className="email">
              <h6><MdMailOutline className="iconInfo" />
                E-mail: contato@regale.com
              </h6>
            </div>

            <div className="phone">
              <h6><MdPhone className="iconInfo" />
                Telefone: +55 (21) 2245-0548
              </h6>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nameFooter">
            <h3 className="name-footer">Developed by Daniel Barboza</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nameFooter">
            <h3 className="name-footer">Copyright © 2021 - Todos os direitos reservados</h3>
          </div>
        </div>

      </div>

    </footer>
  )
}

export default Footer
