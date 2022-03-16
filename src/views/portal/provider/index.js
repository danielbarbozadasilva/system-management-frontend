import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Cardprovider from '../../../components/portal/card/card_provider'
import Loading from '../../../components/portal/loading'
import styled from 'styled-components'
import { Col, Row } from 'reactstrap'
import { getAllProviders } from '../../../store/provider/provider.action'
import image from '../../../assets/img/image-portal-providers.jpg'
import Buscar from '../../../components/portal/filters/index'

function Provider (props) {
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.auth.loading)

  const id = props.id
  const nameFilter = props.nameFilter

  const getData = (id, nameFilter) => {
    dispatch(getAllProviders(nameFilter))
  }

  const callprovider = useCallback(async (id, nameFilter) => {
    if (id) {
      useEffect(() => {
        getData(id, nameFilter)      
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
        <Col className='portalCard' md='6' xl='4' sm='12' xs='12' key={i}>
          <Cardprovider item={{ ...item }} />
        </Col>
      )
    })
  }

  if (loading) {
    return <Loading />
  }

  const ProdProvider = () => {
    const provider = useSelector((state) => state.provider.all)

    if (id) {
      return (
        <Boxprovider>
          {!loading
            ? (
                'Não há produtos disponiveis'
              )
            : (
              <Cardprovider item={{ ...item, status: true }} />
              )}
        </Boxprovider>
      )
    } else {
      return (
        <Boxprovider>
          {!loading && provider.length === 0
            ? (
              <h1 className='noShowProduct'>Não há fornecedores</h1>
              )
            : (
                listProvider(provider)
              )}
        </Boxprovider>
      )
    }
  }

  const PortalBuscar = () => {
    return (
      <div>
        <div className='container-fluid'>
          <div className='row'>
            <div className='image'>
              <img className='portalImage' src={image} alt='' srcSet='' />
            </div>
            <div className='text'>
              <h2>Encontre novas horizontes...</h2>
              <h2>os melhores fornecedores!</h2>
            </div>
            <div className='textCategory'>
              <h1 className='textCat'>
                Escolha um <strong>fornecedor</strong>
              </h1>
            </div>
          </div>
        </div>
        <div className='container-fluid'>
          <div className='row'>
            <Buscar />
            <ProdProvider />
          </div>
        </div>
      </div>
    )
  }
  return <PortalBuscar />
}

export default Provider

const Boxprovider = styled(Row)``
