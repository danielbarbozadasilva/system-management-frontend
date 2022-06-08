import React, { useEffect } from 'react'
import Cardcategory from '../../../components/portal/card/card_category'
import Loading from '../../../components/portal/loading'
import styled from 'styled-components'
import { Col, Row } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategories } from '../../../store/category/category.action'
import Image from '../../../assets/img/image-portal-categories.jpg'

const Home = () => {
  const dispatch = useDispatch()
  const category = useSelector(state => state.category.all)
  const loading = useSelector(state => state.auth.loading)

  useEffect((category) => {
    dispatch(getAllCategories())
  }, [dispatch])

  const listCategory = (category) => {
    return category.map((item, i) => {
      return (
        <Col className='portalCard' md='6' xl='4' sm='12' xs='12' key={i}>
          <Cardcategory item={{ ...item }} />
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
        <div className='Image'>
          <img className='Image' src={Image} alt='' srcSet='' />
        </div>
        <div className='text'>
          <h2>Feito para saborear...</h2>
          <h2>encontre as delícias da sua região</h2>
          <h2>
            <a href='#'>Encontrar</a>
          </h2>
        </div>
        <div className='textCategory'>
          <h1 className='textCat'>
            Escolha uma <strong>categoria</strong>
          </h1>
        </div>
        <BoxCards>
          {!loading && category.length === 0
            ? (
              <h1 className='noShowProduct'>Não há categorias disponiveis</h1>
              )
            : (
                listCategory(category)
              )}
        </BoxCards>
      </div>
    </>
  )
}

export default Home

const BoxCards = styled(Row)``
