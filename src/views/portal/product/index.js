import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../../components/portal/loading'
import styled from 'styled-components'
import { Col, Row } from 'reactstrap'
import image from '../../../assets/img/image-portal-products.jpg'

import CardProduct from '../../../components/portal/card/card_product'
import { getAllProducts, getAllProductsWithFilter } from '../../../store/product/product.action'
import FilterSearch from '../../../components/portal/filters/filter_search'
import FilterProduct from '../../../components/portal/filters/filter_products'

function Products (props) {
  const dispatch = useDispatch()

  const products = useSelector((state) => state.product.all)
  const loading = useSelector((state) => state.auth.loading)

  const getData = (props) => {
    if (props.tipo === '') {
      dispatch(getAllProducts())
    } else {
      dispatch(getAllProductsWithFilter({ name: props.tipo, filter: props.id }))
    }
  }

  useEffect(() => {
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
    <>
      <div className='container-fluid'>
        <div className='image'>
          <img className='portalImage' src={image} alt='' srcSet='' />
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
        <div className='container-fluid'>
          <div className='row'>
            <FilterSearch />
            <FilterProduct />
            <BoxProducts>
              {!loading && products.length === 0
                ? (
                  <h1 className='noShowProduct'>N??o h?? produtos disponiveis</h1>
                  )
                : (
                    ListProduct(products))}
            </BoxProducts>
          </div>
        </div>
      </div>
    </>
  )
}
export default Products

const BoxProducts = styled(Row)``
