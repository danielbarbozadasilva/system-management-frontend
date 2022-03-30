import React, { useEffect, useCallback } from 'react'
import { Grid, CssBaseline, IconButton, Tooltip } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { AiFillStar } from 'react-icons/ai'

import Title from '~/components/title'
import DataList from '~/components/datagrid'
import { BsToggleOff, BsToggleOn } from 'react-icons/bs'
import { More as MoreIcon } from '@material-ui/icons'
import {
  getAllProviders,
  setStatusProvider
} from '~/store/provider/provider.action'
import {
  getAllProductsWithFilter
} from '~/store/product/product.action'

import ListProduct from '~/components/admin/provider/products'
import ListLike from '~/components/admin/provider/likes'
import ListClient from '~/components/admin/provider/clients'

import '../../../assets/css/style.css'

function Provider () {
  const dispatch = useDispatch()

  const [modalProduct, setModalProduct] = React.useState({})
  const [modalClient, setModalClient] = React.useState(false, {})
  const [modalLike, setModalLike] = React.useState(false, {})

  const provider = useSelector((state) => state.provider.all)
  const loading = useSelector((state) => state.provider.loading)
  const idUser = useSelector((state) => state.auth.user)

  const callProvider = useCallback(() => {
    dispatch(getAllProviders())
  }, [dispatch])

  useEffect(() => {
    callProvider()
  }, [callProvider])

  const toggleActive = (id, status) => {
    dispatch(setStatusProvider(id, status))
  }

  function openProduct (row) {
    setModalProduct({ open: true, data: row })
  }
  function openClient (row) {
    setModalClient({ open: true, data: row })
  }
  function openLikeClient (row) {
    setModalLike({ open: true, data: row })
  }

  const actionModalLike = ({ row }) => {
    const like = row?.result_count !== 0 && row?.kind === 'provider'
    return (
      <>
        <Tooltip title='Curtidas'>
          <AiFillStar
            className={like ? 'iconeStar' : 'doNotShow'}
            onClick={() => openLikeClient(row.result_likes)} color='primary'
          />
        </Tooltip>
      </>
    )
  }

  const actionModalProduct = ({ row }) => {
    const product = row?.result_products.length !== 0 && row?.kind === 'provider'
    return (
      <>
        <Tooltip title='Listar produtos'>
          <IconButton
            className={product ? 'iconeStar' : 'doNotShow'}
            onClick={() => openProduct(row?.result_products)} color='primary'
          >
            <MoreIcon />
          </IconButton>
        </Tooltip>
      </>
    )
  }
  const actionModalClient = ({ row }) => {
    const client = row?.result_client.length !== 0
    return (
      <>
        <Tooltip title='Listar clientes'>
          <IconButton
            className={client ? 'iconeStar' : 'doNotShow'}
            onClick={() => openClient(row?.result_client)} color='primary'
          >
            <MoreIcon />
          </IconButton>
        </Tooltip>
      </>
    )
  }
  const actionModalStatus = ({ id, row }) => {
    const status = row.status === 'ENABLE'
    return (
      <>
        <Tooltip title={status ? 'DISABLE' : 'ENABLE'}>
          <IconButton onClick={() => toggleActive(id, status)} color='primary'>
            <>{status ? <BsToggleOn /> : <BsToggleOff />}</>
          </IconButton>
        </Tooltip>
      </>
    )
  }

  const columns = [
    {
      field: 'cnpj',
      headerName: 'Cnpj',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      disableColumnMenu: true
    },
    {
      field: 'fantasyName',
      headerName: 'Nome fantasia',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      disableColumnMenu: true
    },
    {
      field: 'result_count',
      headerName: 'Qtd. likes',
      width: 150,
      align: 'center',
      headerAlign: 'center',
      disableColumnMenu: true
    },
    {
      field: 'actionsLikes',
      headerName: 'Likes',
      renderCell: actionModalLike,
      align: 'center',
      flex: 1,
      headerAlign: 'center',
      disableColumnMenu: true
    },
    {
      field: 'actionsproducts',
      headerName: 'Produtos',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      renderCell: actionModalProduct,
      disableColumnMenu: true
    }, {
      field: 'actionsClient',
      headerName: 'Clientes',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      renderCell: actionModalClient,
      disableColumnMenu: true
    },
    {
      field: 'actionsStatus',
      headerName: 'Status',
      align: 'center',
      headerAlign: 'center',
      renderCell: actionModalStatus,
      flex: 1,
      GridColDef: 'center',
      disableColumnMenu: true
    }
  ]

  const actions = () => null

  return (
    <>
      <Title
        title='Fornecedores'
        subTitle='Página de categorias'
        actions={actions}
      />
      <Grid container spacing={2}>
        <CssBaseline />
        <Grid item md={12} xl={12}>
          <DataList data={provider} columns={columns} loading={loading} />
        </Grid>
      </Grid>
      <ListProduct
        open={modalProduct.open}
        products={modalProduct.data}
        close={() => setModalProduct({ ...modalProduct, open: false })}
      />
      <ListClient
        open={modalClient.open}
        clients={modalClient.data}
        close={() => setModalClient({ ...modalClient, open: false })}
      />
      <ListLike
        likes={modalLike.data}
        open={modalLike.open}
        close={() => setModalLike({ ...modalLike, open: false })}
      />
    </>
  )
}

export default Provider
