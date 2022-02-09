import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardProduto from '../../../components/portal/card/card_produto'
import Loading from '../../../components/portal/loading'
import styled from 'styled-components'
import { Col, Row } from 'reactstrap'
import Imagem from '../../../assets/img/principal3.jpg'
import { getAllProducts } from '../../../store/produto/produto.action'
import { getAllCategories } from '~/store/categoria/categoria.action'
import { getAllProviders } from '~/store/fornecedor/fornecedor.action'

function Produtos (props) {
  const dispatch = useDispatch()
  const produtos = useSelector((state) => state.produto.all)
  const loading = useSelector((state) => state.auth.loading)

  const getDados = async () => {
    switch (props.tipo) {
      case 'categoria':
        await dispatch(getAllCategories({ categoria: props.id }))
        break
      case 'fornecedor':
        await dispatch(getAllProviders({ fornecedor: props.id }))
        break
      default:
        await dispatch(getAllProducts())
    }
  }

  useEffect(() => {
    getDados()
  }, [])

  const MapearProdutos = (produtos) => {
    return produtos.map((item, i) => {
      return (
        <Col className='cardsTelaInicial' md='6' xl='4' sm='12' xs='12' key={i}>
          <CardProduto item={{ ...item }} />
        </Col>
      )
    })
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div>
      <div className='container-fluid'>
        <div className='imagem'>
          <img className='imagemPrincipal' src={Imagem} alt='' srcSet='' />
        </div>
        <div className='texto'>
          <h2>Nossos produtos...</h2>
          <h2>os mais saborosos!</h2>
        </div>
        <div className='textoCategoria'>
          <h1 className='textCat'>
            Escolha um <strong>produto</strong>
          </h1>
        </div>
        <BoxProdutos>
          {console.log(produtos)}
          {!loading && produtos.length === 0
            ? (
              <h1 className='naoPossuiProd'>Não há produtos disponiveis</h1>
              )
            : (
                MapearProdutos(produtos))}
        </BoxProdutos>
      </div>
    </div>
  )
}
export default Produtos

const BoxProdutos = styled(Row)``
