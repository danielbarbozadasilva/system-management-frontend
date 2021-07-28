import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAll } from '../../../store/produto/produto.action'
import CardProduto from '../../../components/portal/card/card_produto'
import Loading from '../../../components/portal/loading'
import styled from 'styled-components'
import { Col, Row } from 'reactstrap'
import Imagem from '../../../assets/img/principal3.jpg'

function Produtos(props) {
  
  const produtos = useSelector((state) => state.produto.all)
  const loading = useSelector((state) => state.auth.loading)

  const dispatch = useDispatch()

  const id = props.id
  const nameFilter = props.nameFilter
  
  const getDados = async (id, nameFilter) => {
    await dispatch(getAll(id, nameFilter))
  }

  useEffect(() => {
    getDados(id, nameFilter)
  }, [])

  const MapearProdutos = (produtos) =>
    produtos.map((item, i) => (
      <Col className="cardsTelaInicial" md="6" xl="4" sm="12" xs="12" key={i}>
        <CardProduto item={{ ...item, status: true }} />
      </Col>
    ))

  if (loading) {
    return <Loading />
  }

  return (
    <div>
      <div className="container-fluid">
        <div className="imagem">
          <img className="imagemPrincipal" src={Imagem} alt="" srcSet="" />
        </div>
        <div className="texto">
          <h2>Nossos produtos...</h2>
          <h2>os mais saborosos!</h2>
        </div>
        <div className="textoCategoria">
          <h1 className="textCat">
            Escolha um <strong>produto</strong>
          </h1>
        </div>
        <BoxProdutos>
          {!loading && produtos.length === 0
            ? <h1 className="naoPossuiProd">Não há produtos disponiveis</h1>
            : MapearProdutos(produtos)}
        </BoxProdutos>
      </div>
    </div>
  )
}
export default Produtos

const BoxProdutos = styled(Row)``
