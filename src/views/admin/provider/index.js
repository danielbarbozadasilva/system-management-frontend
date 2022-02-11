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
import ListProduct from '~/components/admin/provider/product'
import ListLike from '~/components/admin/provider/likes'
import '../../../assets/css/style.css'

function Provider () {
  const dispatch = useDispatch()
  const [modalProduct, setModalProduct] = React.useState({})
  const product = useSelector((state) => state.product.all)
  const provider = useSelector((state) => state.provider.all)
  const loading = useSelector((state) => state.provider.loading)
  const [modalLike, setModalLike] = React.useState(false, {})
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

  function openLikeClient (row) {
    setModalLike({ open: true, data: row })
  }

  const actionModalLike = ({ row }) => {
    const curte = Number(row?.likes) !== 0 && row?.kind !== 'provider'

    return (
      <>
        <Tooltip title="Listar de curtida dos client">
          <AiFillStar
            className={curte ? 'iconeStar' : 'doNotShow'}
            onClick={() => openLikeClient(row.likes)}
            color="primary"
          />
        </Tooltip>
      </>
    )
  }

  const actionModalproduct = ({ row }) => {
    const product = Number(row?.products) !== 0 && row?.kind !== 'provider'

    return (
      <>
        <Tooltip title="Listar produtos">
          <IconButton
            className={product ? 'iconeStar' : 'doNotShow'}
            onClick={() => openProduct(row.products)}
            color="primary"
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
        <Tooltip title={status ? 'Desativar' : 'Ativar'}>
          <IconButton onClick={() => toggleActive(id, status)} color="primary">
            <>{!status ? <BsToggleOff /> : <BsToggleOn />}</>
          </IconButton>
        </Tooltip>
      </>
    )
  }

  const columns = [
    {
      field: 'cnpj',
      headerName: 'Cnpj',
      width: 220,
      align: 'center',
      headerAlign: 'center',
      disableColumnMenu: true
    },
    {
      field: 'fantasyName',
      headerName: 'Nome fantasia',
      width: 270,
      align: 'center',
      headerAlign: 'center',
      disableColumnMenu: true
    },
    {
      field: 'likes',
      headerName: 'Qtd. Curtidas',
      width: 150,
      align: 'center',
      renderCell: (row) => row?.value?.length,
      headerAlign: 'center',
      disableColumnMenu: true
    },
    {
      field: 'actionsLikes',
      headerName: 'Clientes',
      align: 'center',
      renderCell: actionModalLike,
      width: 150,
      headerAlign: 'center',
      disableColumnMenu: true
    },
    {
      field: 'actionsproducts',
      headerName: 'Produtos',
      width: 120,
      align: 'center',
      headerAlign: 'center',
      renderCell: actionModalproduct,
      disableColumnMenu: true
    },
    {
      field: 'actionsStatus',
      headerName: 'status',
      align: 'center',
      headerAlign: 'center',
      renderCell: actionModalStatus,
      width: 110,
      GridColDef: 'center',
      disableColumnMenu: true
    }
  ]

  const actions = () => null

  return (
    <>
      <Title
        title="provider"
        subTitle="Página de categorias"
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
      <ListLike
        curtidas={modalLike.data}
        open={modalLike.open}
        close={() => setModalLike({ ...modalLike, open: false })}
      />
    </>
  )
}

export default Provider