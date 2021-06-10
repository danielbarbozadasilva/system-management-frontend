const Busca = () => {
  return (
    <div>
      <div className="img01">
        <img className="imagem-fundo" src="./img/fundoHeader2.jpg" />
      </div>
      <div className="img02">
        <img className="imagem-paes" src="./img/bolos.png" />
      </div>


      <div style="position:absolute;display:block;text-align: center;">
        <div>
          <div className="textoPrincipal">Escolha o seu sabor</div>
          <div className="textoSub">digite uma categoria</div>
        </div>
        <div>
          <input type="search" className="form-control" placeholder="Digite uma categoria..." aria-label="Search" />
        </div>
        <div className="col-12 col-lg-auto mb-2 mt-4 mb-lg-0 me-lg-auto">

          <button className="btn btn-outline-success botaoPrinc">Buscar</button>
        </div>
      </div>
    </div>
  )
}
export default Busca