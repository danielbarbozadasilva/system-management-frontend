import React, { useEffect } from 'react'
import { navigate } from '@reach/router'
import CardCategory from '../../../components/portal/card/category'
import Loading from '../../../components/portal/loading'
import { Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategories } from '../../../store/category/category.action'
import Image from '../../../assets/img/image-portal-categories.jpg'
import {
  StyleImg,
  ContainerTitle,
  TextTitle,
  SButtonTitle,
  ContainerCards,
  ContainerCapion
} from '../../../components/portal/styled'

const Home = () => {
  const dispatch = useDispatch()

  const category = useSelector((state) => state.category.all)
  const loading = useSelector((state) => state.auth.loading)

  useEffect(() => {
    dispatch(getAllCategories())
  }, [dispatch])

  const listCategory = (category) => {
    return category.map((item, i) => {
      return (
        <Col md="6" xl="4" sm="12" xs="12" key={i}>
          <CardCategory item={{ ...item }} />
        </Col>
      )
    })
  }

  if (loading) {
    return <Loading />
  }

  return (
    <>
      <div>
        <StyleImg src={Image} />
      </div>

      <ContainerTitle>
        <TextTitle>
          Feito para saborear...
          <br />
          encontre as delícias da sua região
        </TextTitle>
        <SButtonTitle onClick={() => navigate(`/registrationclient`)}>
          Encontrar
        </SButtonTitle>
      </ContainerTitle>

      <ContainerCapion>
        <h1>
          Escolha uma <strong>categoria</strong>
        </h1>
      </ContainerCapion>

      <ContainerCards>
        {!loading && category.length === 0 ? (
          <h6>Não há categorias disponiveis</h6>
        ) : (
          listCategory(category)
        )}
      </ContainerCards>
    </>
  )
}

export default Home
