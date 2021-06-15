import React from 'react'
import './style.css'
import ImagemFundo from '../../../assets/img/ImagemFundo.jpg'
import ImagemPaes from '../../../assets/img/ImagemPaes.png'

function BuscarProduto () {
  return (
    <section className="secao01">
      <div>
        <div className="img01">
          <img className="imagem-fundo" src={ImagemFundo} alt="Imagem de fundo" />
        </div>
        <div className="img02">
          <img className="imagem-paes" src={ImagemPaes} alt="Imagem de fundo" />
        </div>

        <div className="texto-home-inicial">
          <div className="textoPrincipal">Escolha o seu sabor</div>
          <div className="textoSub">digite um produto</div>
          <div>
            <input type="search" className="form-control" placeholder="Digite um produto..." aria-label="Search" />
          </div>
          <div>
            <button className="btn btn-outline-success botaoPrinc">Buscar</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BuscarProduto
