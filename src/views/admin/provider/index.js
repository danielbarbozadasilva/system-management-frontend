import React, { useEffect, useCallback } from 'react'
import { Grid, CssBaseline, IconButton, Tooltip } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import Title from '~/components/title'
import DataList from '~/components/datagrid'
import { BsToggleOff, BsToggleOn } from 'react-icons/bs'
import { More as MoreIcon } from '@material-ui/icons'
import {
  getAllProviders,
  setStatusProvider
} from '~/store/provider/provider.action'

import ListProduct from '~/components/admin/provider/products'
import ListLike from '~/components/admin/provider/likes'
import ListClient from '~/components/admin/provider/clients'

function Provider() {
  const dispatch = useDispatch()

  const [modalProduct, setModalProduct] = React.useState({})
  const [modalClient, setModalClient] = React.useState(false, {})
  const [modalLike, setModalLike] = React.useState(false, {})

  const provider = useSelector((state) => state.provider.all)
  const loading = useSelector((state) => state.provider.loading)

  const callProvider = useCallback(() => {
    dispatch(getAllProviders())
  }, [dispatch])

  useEffect(() => {
    callProvider()
  }, [callProvider])

  const toggleActive = (id, status) => {
    dispatch(setStatusProvider(id, status))
  }

  function openProduct(row) {
    setModalProduct({ open: true, data: row })
  }

  function openClient(row) {
    setModalClient({ open: true, data: row })
  }
  
  function openLikeClient(row) {
    setModalLike({ open: true, data: row })
  }

  const actionModalLike = ({ row }) => {
    const like = row?.count_likes_products !== 0 && row?.kind === 'provider'
    return (
      <>
        <Tooltip title="Listar Curtidas">
          <span>
            <IconButton
              onClick={() => openLikeClient(row.likes)}
              disabled={like ? false : true}
              color="primary"
            >
              <MoreIcon />
            </IconButton>
          </span>
        </Tooltip>
      </>
    )
  }

  const actionModalProduct = ({ row }) => {
    const product =
      row?.result_products.length !== 0 && row?.kind === 'provider'
    return (
      <>
        <Tooltip title="Listar produtos">
          <span>
            <IconButton
              onClick={() => openProduct(row?.result_products)}
              disabled={product ? false : true}
              color="primary"
            >
              <MoreIcon />
            </IconButton>
          </span>
        </Tooltip>
      </>
    )
  }

  const actionModalClient = ({ row }) => {
    const client = row?.clients.length !== 0
    return (
      <>
        <Tooltip title="Listar clientes">
          <span>
            <IconButton
              onClick={() => openClient(row?.clients)}
              disabled={client ? false : true}
              color="primary"
            >
              <MoreIcon />
            </IconButton>
          </span>
        </Tooltip>
      </>
    )
  }

  const actionModalStatus = ({ id, row }) => {
    const status = row.status === 'ENABLE'
    return (
      <>
        <Tooltip title={status ? 'Desabilitar' : 'Ativar'}>
          <span>
            <IconButton
              onClick={() => toggleActive(id, status ? 'DISABLE' : 'ENABLE')}
              color="primary"
            >
              <>{status ? <BsToggleOn /> : <BsToggleOff />}</>
            </IconButton>
          </span>
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
      field: 'count_likes_products',
      headerName: 'Qtd. likes',
      width: 150,
      align: 'center',
      headerAlign: 'center',
      disableColumnMenu: true
    },
    {
      field: 'actionsLikes',
      headerName: 'Curtidas Recebidas',
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
    },
    {
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
        title="Fornecedores"
        subTitle="Página de fornecedores"
        actions={actions}
      />
      <Grid container spacing={2}>
        <CssBaseline />
        <Grid item md={12} xl={12}>
          <DataList data={provider} columns={columns} loading={loading} />
        </Grid>
      </Grid>
      <ListProduct
        open={modalProduct.open || false}
        products={modalProduct.data}
        close={() => setModalProduct({ ...modalProduct, open: false })}
      />
      <ListClient
        open={modalClient.open || false}
        clients={modalClient.data}
        close={() => setModalClient({ ...modalClient, open: false })}
      />
      <ListLike
        likes={modalLike.data}
        open={modalLike.open || false}
        close={() => setModalLike({ ...modalLike, open: false })}
      />
    </>
  )
}

export default Provider
