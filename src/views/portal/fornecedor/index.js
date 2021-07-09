import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardFornecedor from '../../../components/portal/card/card_fornecedor'
import Loading from '../../../components/portal/loading'
import styled from 'styled-components'
import { Col, Row } from 'reactstrap'
import {
  getAll,
  getFornById
} from '../../../store/fornecedor/fornecedor.action'
import CardProduto from '../../../components/portal/card/card_produto'
import Imagem from '../../../assets/img/principal2.jpg'

function Fornecedor(props) {
  const fornecedor = useSelector((state) => state.fornecedor.all)
  const selected = useSelector((state) => state.fornecedor.selected)

  const loading = useSelector((state) => state.auth.loading)

  const dispatch = useDispatch()

  const id = props.id

  const callFornecedor = useCallback(() => {
    if (id) {
      dispatch(getFornById(id))
    } else {
      dispatch(getAll())
    }
  }, [dispatch])

  useEffect(() => {
    callFornecedor()
  }, [callFornecedor])

  const MapearFornecedor = (fornecedor) =>
    fornecedor.map((item, i) => (
      <Col className="cardsTelaInicial" md="6" xl="4" sm="12" xs="12" key={i}>
        <CardFornecedor item={{ ...item, status: true }} />
      </Col>
    ))

  const MapearFornecedorProdutos = (produtos) =>
    produtos.map((item, i) => (
      <Col className="cardsTelaInicial" md="6" xl="4" sm="12" xs="12" key={i}>
        <CardProduto item={{ ...item, status: true }} />
      </Col>
    ))

  if (loading) {
    return <Loading />
  }

  const ProdFornecedor = () => {
    if (id) {
      return (
        <BoxFornecedor>
          {!loading
            ? (
                'Não há Fornecedor disponivel'
              )
            : (
              <CardFornecedor item={{ ...item, status: true }} />
              )}
        </BoxFornecedor>
      )
    } else {
      return (
        <BoxFornecedor>
          {!loading && fornecedor.length === 0
            ? (
              <h1 className="naoPossuiProd">Não há produtos</h1>
              )
            : (
                MapearFornecedor(fornecedor)
              )}
        </BoxFornecedor>
      )
    }
  }

  return (
    <div>
      <div className="container-fluid">
        <div className="imagem">
          <img className="imagemPrincipal" src={Imagem} alt="" srcSet="" />
        </div>
        <div className="texto">
          <h2>Encontre novas horizontes...</h2>
          <h2>os melhores fornecedores!</h2>
        </div>
        <div className="textoCategoria">
          <h1 className="textCat">
            Escolha um <strong>fornecedor</strong>
          </h1>
        </div>
        <ProdFornecedor />
      </div>
    </div>
  )
}

export default Fornecedor

const BoxFornecedor = styled(Row)``
