import React, { useState } from 'react'
import './style.css'
import ImagemFundo from '../../../assets/img/ImagemFundo.jpg'
import ImagemPaes from '../../../assets/img/ImagemPaes.png'

function BuscarProduto(props) {
  const [info, setInfo] = useState('')

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
        <div className="textoPrincipal">Delicias da região</div>
          <div className="textoSub">digite um produto</div>
          <div>
            <input onChange={(props) => setInfo(props.target.value)} value={info} type="search" className="form-control" placeholder="Digite um produto..." aria-label="Search" />
          </div>
          <div>
            <button onClick={() => props.getProdutosByName(info)} className="btn btn-outline-success botaoPrinc">Buscar</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BuscarProduto
