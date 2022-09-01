import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardProvider from '../../../components/portal/card/provider'
import Loading from '../../../components/portal/loading'
import { Col, Row } from 'react-bootstrap'
import { getAllProviders } from '../../../store/provider/provider.action'
import Image from '../../../assets/img/image-portal-providers.jpg'
import FilterOrder from '../../../components/portal/filters/provider'
import FilterLocation from '../../../components/portal/filters/location/index'
import {
  ContainerImage,
  StyleImg,
  ContainerTitle,
  TextTitle,
  SButtonTitle,
  ContainerCapion,
  ContainerCards,
  SMessage
} from '../../../components/portal/styled'

function Provider(props) {
  const dispatch = useDispatch()

  const loading = useSelector((state) => state.auth.loading)
  const provider = useSelector((state) => state.provider.all)

  const getData = () => {
    dispatch(getAllProviders(props.nameFilter))
  }

  const callprovider = useCallback(() => {
    if (props.id) {
      useEffect(() => {
        getData()
      }, [])
    } else {
      dispatch(getAllProviders())
    }
  }, [dispatch])

  useEffect(() => {
    callprovider()
  }, [callprovider])

  const listProvider = (provider) => {
    return provider.map((item, i) => {
      return (
        <Col md="6" xl="4" sm="12" xs="12" key={i}>
          <CardProvider item={{ ...item }} />
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
          Encontre novas horizontes...
          <br />
          os melhores fornecedores!
        </TextTitle>
        <SButtonTitle onClick={() => navigate(`/registrationclient`)}>
          Encontrar
        </SButtonTitle>
      </ContainerTitle>

      <ContainerCapion>
        <h1>
          Escolha um <strong>fornecedor</strong>
        </h1>
      </ContainerCapion>

      <Row>
        <FilterLocation />
        <FilterOrder />
      </Row>

      <ContainerCards>
        {props.id ? (
          !loading ? (
            <SMessage>Não há produtos disponiveis</SMessage>
          ) : (
            <CardProvider item={{ ...item }} />
          )
        ) : !loading && provider.length === 0 ? (
          <SMessage>Não há fornecedores disponiveis</SMessage>
        ) : (
          listProvider(provider)
        )}
      </ContainerCards>
    </>
  )
}

export default Provider
