import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProdutoPorCategoria } from '../../../store/produto/produto.action'
import CardCategoria from '../../../components/portal/card/card_categoria'

import Loading from '../../../components/portal/loading'
import styled from 'styled-components'
import { Col, Row } from 'reactstrap'
import BuscarProduto from '../../../components/portal/busca/buscar_produto'

function Produtos (props) {
  const produtos = useSelector(state => state.produto.all)
  const loading = useSelector(state => state.auth.loading)

  const dispatch = useDispatch()

  const id = props.id

  const navigate = async () => {
    if (id) {
      await dispatch(getProdutoPorCategoria(id))
    }
  }

  useEffect(() => {
    navigate()
  }, []) // [] - executa uma única vez

  const MapearProdutos = (produtos) => produtos.map((item, i) => (
    <Col className="cardsTelaInicial" md="6" xl="4" sm="12" xs="12" key={i}>
      <CardCategoria item={{ ...item, status: true }} />
    </Col>
  ))

  if (loading) {
    return <Loading />
  }

  return (
    <>
    {/* getAll */}
      <BuscarProduto propriedade={(nome)=>console.log(nome)} />
      <BoxProdutos>
        {!loading && produtos.length === 0 ? 'Não há produtos disponiveis' : MapearProdutos(produtos)}
      </BoxProdutos>

    </>
  )
}

export default Produtos

const BoxProdutos = styled(Row)`

`
