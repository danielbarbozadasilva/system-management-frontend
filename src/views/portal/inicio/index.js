import React, { useEffect } from 'react'
import CardCategoria from '../../../components/portal/card/card_categoria'
import Loading from '../../../components/portal/loading'
import styled from 'styled-components'
import { Col, Row } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategories } from '../../../store/categoria/categoria.action'
import '../../../assets/css/style.css'
import Imagem from '../../../assets/img/principal.jpg'

const Inicio = () => {
  const dispatch = useDispatch()
  
  const categoria = useSelector((state) => state.categoria.all)
  const loading = useSelector((state) => state.auth.loading)

  useEffect(() => {
    dispatch(getAllCategories())
  }, [dispatch])

  const MapearCategoria = (categoria) => {
    return categoria.map((item, i) => {
      return (
        <Col className="cardsTelaInicial" md="6" xl="4" sm="12" xs="12" key={i}>
          <CardCategoria item={{ ...item }} />
        </Col>
      )
    })
  }

  if (loading) {
    return <Loading />
  }

  return (
    <>
      <div className="container-fluid">
        <div className="imagem">
          <img className="imagemPrincipal" src={Imagem} alt="" srcSet="" />
        </div>
        <div className="texto">
          <h2>Feito para saborear...</h2>
          <h2>encontre as delícias da sua região</h2>
          <h2>
            <a href="#">Encontrar</a>
          </h2>
        </div>
        <div className="textoCategoria">
          <h1 className="textCat">
            Escolha uma <strong>categoria</strong>
          </h1>
        </div>
        <BoxCards>
          {!loading && categoria.length === 0
            ? (
              <h1 className="naoPossuiProd">Não há categorias disponiveis</h1>
              )
            : (
                MapearCategoria(categoria)
              )}
        </BoxCards>
      </div>
    </>
  )
}

export default Inicio

const BoxCards = styled(Row)``
