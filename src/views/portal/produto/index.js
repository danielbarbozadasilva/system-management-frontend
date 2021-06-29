import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../../store/produto/produto.action'
import CardProduto from '../../../components/portal/card/card_produto'
import FiltroProduto from '../../../components/portal/filtroProduto/index'
import Loading from '../../../components/portal/loading'
import styled from 'styled-components'
import { Col, Row } from 'reactstrap'

function Produtos(props) {
  const produtos = useSelector((state) => state.produto.all)
  const loading = useSelector((state) => state.auth.loading)

  const dispatch = useDispatch()

  const id = props.id
  const nameFilter = props.nameFilter
  console.log(props)
  const getDados = async (id, nameFilter) => {
    await dispatch(getProducts(id, nameFilter))
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
    <>
      <FiltroProduto />
      <BoxProdutos>
        {!loading && produtos.length === 0
          ? 'Não há produtos disponiveis'
          : MapearProdutos(produtos)}
      </BoxProdutos>
    </>
  )
}

export default Produtos

const BoxProdutos = styled(Row)``
