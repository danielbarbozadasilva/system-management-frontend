import React, { useEffect } from 'react'
import CardCategoria from '../../../components/portal/card/card_categoria'
import Loading from '../../../components/portal/loading'
import styled from 'styled-components'
import { Col, Row } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getAll } from '../../../store/categoria/categoria.action'
import '../../../assets/css/style.css'
import BuscarCategoria from '../../../components/portal/busca/buscar_categoria'

const Inicio = () => {
  const dispatch = useDispatch()

  // estou pegando o estado categoria no index
  const categoria = useSelector((state) => state.categoria.all)
  const loading = useSelector(state => state.auth.loading)

  useEffect(() => {
    dispatch(getAll())
  }, [dispatch])

  const MapearCategoria = (categoria) => categoria.map((item, i) => (
    <Col className="cardsTelaInicial" md="6" xl="4" sm="12" xs="12" key={i}>
      <CardCategoria item={{ ...item, status: true }} />
    </Col>
  ))

  if (loading) {
    return <Loading />
  }

  return (
    <>
      <BuscarCategoria />
      <BoxCategorias>
        {!loading && categoria.length === 0 ? 'Não há categorias disponiveis' : MapearCategoria(categoria)}
      </BoxCategorias>

    </>
  )
}

export default Inicio

const BoxCategorias = styled(Row)`

`
