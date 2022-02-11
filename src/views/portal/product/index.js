import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardProduto from '../../../components/portal/card/card_product'
import Loading from '../../../components/portal/loading'
import styled from 'styled-components'
import { Col, Row } from 'reactstrap'
import Imagem from '../../../assets/img/image-portal-products.jpg'
import { getAllProducts } from '../../../store/product/product.action'
import { getAllProviders } from '~/store/provider/provider.action'

function Products (props) {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.product.all)  
  const loading = useSelector((state) => state.auth.loading)

  const getData = async () => {
    console.log(props.tipo)
    switch (props.tipo) {
      case 'category':
        await dispatch(getAllProducts({ category: props.id }))
        break
      case 'provider':
        await dispatch(getAllProviders({ provider: props.id }))
        break
      default:
        await dispatch(getAllProducts())
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const listProduct = (products) => {
    return products.map((item, i) => {
      return (
        <Col className='portalCard' md='6' xl='4' sm='12' xs='12' key={i}>
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
          <img className='portalImage' src={Imagem} alt='' srcSet='' />
        </div>
        <div className='text'>
          <h2>Nossos products...</h2>
          <h2>os mais saborosos!</h2>
        </div>
        <div className='textCategory'>
          <h1 className='textCat'>
            Escolha um <strong>produto</strong>
          </h1>
        </div>
        <Boxproducts>
          {console.log(products)}
          {!loading && products.length === 0
            ? (
              <h1 className='noShowProduct'>Não há products disponiveis</h1>
              )
            : (
                listProduct(products))}
        </Boxproducts>
      </div>
    </div>
  )
}
export default Products

const Boxproducts = styled(Row)``
