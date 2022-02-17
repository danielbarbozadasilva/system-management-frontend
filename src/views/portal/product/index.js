import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardProduct from '../../../components/portal/card/card_product'
import Loading from '../../../components/portal/loading'
import styled from 'styled-components'
import { Col, Row } from 'reactstrap'
import Imagem from '../../../assets/img/image-portal-products.jpg'
import { getAllProducts, getAllProductsWithFilter } from '../../../store/product/product.action'
// import { getAllProviders } from '~/store/provider/provider.action'

function Products (props) {
  const dispatch = useDispatch()

  const products = useSelector((state) => state.product.all)
  const loading = useSelector((state) => state.auth.loading)

  const getData = (props) => {
    console.log('@@@@@@@@@@' + JSON.stringify(props))
    console.log('@@@@@@@@@@' + JSON.stringify('000: ' + props?.id))
    console.log('@@@@@@@@@@tipo' + JSON.stringify('000: ' + props.tipo))
    if (props.tipo === '') {
      console.log('TODOS------')
      dispatch(getAllProducts())
    } else {
      console.log('FILTRO------')
      dispatch(getAllProductsWithFilter({ name: props.tipo, filter: props.id }))
    }
  }

  useEffect(() => {
    console.log('@@@@@@@@@@' + JSON.stringify(props))
    getData(props)
  }, [])

  const ListProduct = (products) => {
    return products.map((item, i) => {
      return (
        <Col className='portalCard' md='6' xl='4' sm='12' xs='12' key={i}>
          <CardProduct item={{ ...item }} />
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
          <h2>Nossos produtos...</h2>
          <h2>os mais saborosos!</h2>
        </div>
        <div className='textCategory'>
          <h1 className='textCat'>
            Escolha um <strong>produto</strong>
          </h1>
        </div>
        <BoxProducts>
          {console.log(products)}
          {!loading && products.length === 0
            ? (
              <h1 className='noShowProduct'>Não há produtos disponiveis</h1>
              )
            : (
                ListProduct(products))}
        </BoxProducts>
      </div>
    </div>
  )
}
export default Products

const BoxProducts = styled(Row)``
