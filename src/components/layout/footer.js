import React from 'react'
import ImagemFooter from '../../assets/img/footer.png'
import { FaFacebookSquare, FaInstagramSquare, FaWhatsappSquare } from 'react-icons/fa'
import { MdLocationOn, MdMailOutline, MdPhone } from 'react-icons/md'
import '../../assets/css/style.css'

const Footer = (props) => {
  return (
    <footer className="rodape">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-3 col-md-4 col-sm-12 col-xs-12 redes-sociais">
            <h3 className="tituloRedesSociais">Redes sociais</h3>
            <div className="icons-redes-sociais">
              <a href="https://www.facebook.com/" target="_blank" rel="noreferrer"><FaFacebookSquare className="iconeFooter" /></a>
              <a href="https://www.instagram.com/" target="_blank" rel="noreferrer"><FaInstagramSquare className="iconeFooter" /></a>
              <a href="https://api.whatsapp.com/send?phone=+5521992690225" target="_blank" rel="noreferrer"><FaWhatsappSquare className="iconeFooter" /></a>
            </div>
          </div>

          <div className="col-lg-5 col-md-4 col-sm-12 col-xs-12 ">
            <img className="imagemFooter" src={ImagemFooter} alt="imagem do footer" />
          </div>

          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 infomacoes">

            <div className="address">
              <h6><MdLocationOn className="iconeInfoRodape" />
                Endereço: Rua Gomes Yunes, 225
              </h6>
            </div>
            <div className="email">
              <h6><MdMailOutline className="iconeInfoRodape" />
                Email: contato@regale.com
              </h6>
            </div>

            <div className="phone">
              <h6><MdPhone className="iconeInfoRodape" />
                Telefone: +55 21 22450548
              </h6>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nomeFooter">
            <h3 className="nome-footer">Developed by Daniel Barboza</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nomeFooter">
            <h3 className="nome-footer">Copyright © 2021 - Todos os direitos reservados</h3>
          </div>
        </div>

      </div>

    </footer>
  )
}

export default Footer
