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
import ListProduct from '~/components/admin/forncedor/products'
import ListLike from '~/components/admin/provider/likes'
import '../../../assets/css/style.css'

function provider() {
  const dispatch = useDispatch()
  const [modalProduto, setModalProduto] = React.useState({})
  const produto = useSelector((state) => state.produto.all)
  const provider = useSelector((state) => state.provider.all)
  const loading = useSelector((state) => state.provider.loading)
  const [modalCurtidas, setModalCurtidas] = React.useState(false, {})
  const idUser = useSelector((state) => state.auth.usuario)

  const callprovider = useCallback(() => {
    dispatch(getAllProviders())
  }, [dispatch])

  useEffect(() => {
    callprovider()
  }, [callprovider])

  const toggleActive = (id, status) => {
    dispatch(setStatusProvider(id, status))
  }

  function openproducts(row) {
    setModalProduto({ open: true, data: row })
  }

  function openCurtidaclient(row) {
    setModalCurtidas({ open: true, data: row })
  }

  const actionModalCurtida = ({ row }) => {
    const curte = Number(row?.likes) !== 0 && row?.kind !== 'provider'

    return (
      <>
        <Tooltip title="Listar de curtida dos client">
          <AiFillStar
            className={curte ? 'iconeStar' : 'doNotShow'}
            onClick={() => openCurtidaclient(row.likes)}
            color="primary"
          />
        </Tooltip>
      </>
    )
  }

  const actionModalproducts = ({ row }) => {
    const produto = Number(row?.products) !== 0 && row?.kind !== 'provider'

    return (
      <>
        <Tooltip title="Listar de products">
          <IconButton
            className={produto ? 'iconeStar' : 'doNotShow'}
            onClick={() => openproducts(row.products)}
            color="primary"
          >
            <MoreIcon />
          </IconButton>
        </Tooltip>
      </>
    )
  }

  const actionModalStatus = ({ id, row }) => {
    const status = row.status === 'Ativo'

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
      headerName: 'CNPJ',
      width: 220,
      align: 'center',
      headerAlign: 'center',
      disableColumnMenu: true
    },
    {
      field: 'fantasyName',
      headerName: 'Nome Fantasia',
      width: 270,
      align: 'center',
      headerAlign: 'center',
      disableColumnMenu: true
    },
    {
      field: 'curtidas',
      headerName: 'Qtd. Curtidas',
      width: 150,
      align: 'center',
      renderCell: (row) => row?.value?.length,
      headerAlign: 'center',
      disableColumnMenu: true
    },
    {
      field: 'actionsCurtida',
      headerName: 'client',
      align: 'center',
      renderCell: actionModalCurtida,
      width: 150,
      headerAlign: 'center',
      disableColumnMenu: true
    },
    {
      field: 'actionsproducts',
      headerName: 'products',
      width: 120,
      align: 'center',
      headerAlign: 'center',
      renderCell: actionModalproducts,
      disableColumnMenu: true
    },
    {
      field: 'actionsStatus',
      headerName: 'Status',
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
        subTitle="Página de categories"
        actions={actions}
      />
      <Grid container spacing={2}>
        <CssBaseline />
        <Grid item md={12} xl={12}>
          <DataList data={provider} columns={columns} loading={loading} />
        </Grid>
      </Grid>
      <ListProduct
        open={modalProduto.open}
        products={modalProduto.data}
        close={() => setModalProduto({ ...modalProduto, open: false })}
      />
      <ListLike
        curtidas={modalCurtidas.data}
        open={modalCurtidas.open}
        close={() => setModalCurtidas({ ...modalCurtidas, open: false })}
      />
    </>
  )
}

export default provider
