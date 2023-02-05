import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../../components/portal/loading'
import { Col, Row } from 'react-bootstrap'
import Image from '../../../assets/img/image-portal-products.jpg'
import CardProduct from '../../../components/portal/card/product'
import { getAllProductsWithFilter } from '../../../store/product/product.action'
import { getCategoryByProductId } from '../../../store/category/category.action'
import { getProviderById } from '../../../store/provider/provider.action'
import FilterSearch from '../../../components/portal/filters/search'
import FilterProduct from '../../../components/portal/filters/product'
import {
  ContainerImage,
  StyleImg,
  ContainerTitle,
  TextTitle,
  ContainerCards,
  ContainerCapion,
  STextCardContainer,
  ColFilter
} from '../../../components/portal/styled'

function Products(props) {
  const dispatch = useDispatch()

  const products = useSelector((state) => state.product.all)
  const loading = useSelector((state) => state.auth.loading)

  const getData = (props) => {
    if (props.id && props.type === 'category') {
      dispatch(getCategoryByProductId(props.id))
    } else if (!props.id) {
      dispatch(getAllProductsWithFilter())
    } else if (props.type === 'provider') {
      dispatch(getProviderById(props.id))
    }
  }

  useEffect(() => {
    getData(props)
  }, [])

  const ListProduct = (props) => {
    return products.map((item, i) => {
      return (
        <Col md="6" xl="4" sm="12" xs="12" key={i}>
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
      <ContainerImage>
        <StyleImg src={Image} />
      </ContainerImage>

      <ContainerTitle>
        <TextTitle>
          Nossos produtos...
          <br />
          os mais saborosos!
        </TextTitle>
      </ContainerTitle>

      <ContainerCapion>
        <h1>
          Escolha um <strong>produto</strong>
        </h1>
      </ContainerCapion>
      {props?.type === '' ? (
        <Row>
          <Col>
            <FilterSearch />
          </Col>
          <ColFilter>
            <FilterProduct />
          </ColFilter>
        </Row>
      ) : (
        ''
      )}
      <ContainerCards>
        {!loading && products.length === 0 ? (
          <STextCardContainer>Não há produtos disponiveis</STextCardContainer>
        ) : (
          ListProduct(products)
        )}
      </ContainerCards>
    </>
  )
}

export default Products
