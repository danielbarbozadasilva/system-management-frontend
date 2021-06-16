import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProdutosPorFornecedor } from '../../../store/fornecedor/fornecedor.action'
import CardFornecedor from '../../../components/portal/card/card_fornecedor'

import Loading from '../../../components/portal/loading'
import styled from 'styled-components'
import { Col, Row } from 'reactstrap'
import BuscarFornecedor from '../../../components/portal/busca/buscar_fornecedor'

function Fornecedores (props) {
  const fornecedor = useSelector(state => state.fornecedor.all)
  const loading = useSelector(state => state.auth.loading)

  const dispatch = useDispatch()

  const id = props.id

  const navigate = async () => {
    if (id) {
      await dispatch(getProdutosPorFornecedor(id))
    }
  }
  useEffect(() => {
    navigate()
  }, []) // [] - executa uma única vez

  const MapearFornecedor = (fornecedor) => fornecedor.map((item, i) => (
    <Col className="cardsTelaInicial" md="6" xl="4" sm="12" xs="12" key={i}>
      <CardFornecedor item={{ ...item, status: true }} />
    </Col>
  ))

  if (loading) {
    return <Loading />
  }

  return (
    <>
      <BuscarFornecedor />
      <BoxFornecedores>
        {!loading && fornecedor.length === 0 ? 'Não há fornecedores disponiveis' : MapearFornecedor(fornecedor)}
      </BoxFornecedores>

    </>
  )
}

export default Fornecedores

const BoxFornecedores = styled(Row)`

`
