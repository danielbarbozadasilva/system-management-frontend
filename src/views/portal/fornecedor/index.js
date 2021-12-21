import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardFornecedor from '../../../components/portal/card/card_fornecedor'
import Loading from '../../../components/portal/loading'
import styled from 'styled-components'
import { Col, Row } from 'reactstrap'
import { getAllProviders } from '../../../store/fornecedor/fornecedor.action'
import Imagem from '../../../assets/img/principal2.jpg'
import MapearCidadeEstado from '../../../components/portal/filtros/index'

function Fornecedor(props) {
  const loading = useSelector((state) => state.auth.loading)

  const dispatch = useDispatch()

  const id = props.id
  const nameFilter = props.nameFilter

  const getDados = async (id, nameFilter) => {
    await dispatch(getAllProviders({ fornecedor: props.id }))
  }

  const callFornecedor = useCallback(() => {
    if (id) {
      useEffect(() => {
        getDados(id, nameFilter)
      }, [])
    } else {
      dispatch(getAllProviders())
    }
  }, [dispatch])

  useEffect(() => {
    callFornecedor()
  }, [callFornecedor])

  const MapearFornecedor = (fornecedor) =>
    fornecedor?.map((item, i) => (
      <Col className="cardsTelaInicial" md="6" xl="4" sm="12" xs="12" key={i}>
        <CardFornecedor item={{ ...item, status: true }} />
      </Col>
    ))

  if (loading) {
    return <Loading />
  }

  const ProdFornecedor = () => {
    const fornecedor = useSelector((state) => state.fornecedor.all)

    if (id) {
      return (
        <BoxFornecedor>
          {!loading ? (
            'Não há Fornecedor disponivel'
          ) : (
            <CardFornecedor item={{ ...item, status: true }} />
          )}
        </BoxFornecedor>
      )
    } else {
      return (
        <BoxFornecedor>
          {!loading && fornecedor.length === 0 ? (
            <h1 className="naoPossuiProd">Não há produtos</h1>
          ) : (
            MapearFornecedor(fornecedor)
          )}
        </BoxFornecedor>
      )
    }
  }

  const Visual = () => {
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
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
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <MapearCidadeEstado />
            <ProdFornecedor />
          </div>
        </div>
      </div>
    )
  }
  return <Visual />
}

export default Fornecedor

const BoxFornecedor = styled(Row)``
