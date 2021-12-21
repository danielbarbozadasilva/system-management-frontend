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
  obterProduto,
  setStatusFornecedor
} from '~/store/fornecedor/fornecedor.action'
import ListaProdutos from '~/components/admin/forncedor/produtos'
import ListaCurtidas from '~/components/admin/forncedor/curtidas'
import '../../../assets/css/style.css'

function Fornecedor() {
  const dispatch = useDispatch()
  const [modalProduto, setModalProduto] = React.useState({})
  const produto = useSelector((state) => state.produto.all)
  const fornecedores = useSelector((state) => state.fornecedor.all)
  const loading = useSelector((state) => state.fornecedor.loading)
  const [modalCurtidas, setModalCurtidas] = React.useState(false, {})
  const idUser = useSelector((state) => state.auth.usuario)

  const callFornecedor = useCallback(() => {
    dispatch(getAllProviders())
  }, [dispatch])

  useEffect(() => {
    callFornecedor()
  }, [callFornecedor])

  const toggleActive = (id, status) => {
    dispatch(setStatusFornecedor(id, status))
  }

  function openProdutos(row) {
    setModalProduto({ open: true, data: row })
  }

  function openCurtidaCliente(row) {
    setModalCurtidas({ open: true, data: row })
  }

  const actionModalCurtida = ({ row }) => {
    const curte = Number(row?.curtidas) !== 0 && row?.kind !== 'fornecedor'

    return (
      <>
        <Tooltip title="Listar de curtida dos clientes">
          <AiFillStar
            className={curte ? 'iconeStar' : 'naoAparece'}
            onClick={() => openCurtidaCliente(row.curtidas)}
            color="primary"
          />
        </Tooltip>
      </>
    )
  }

  const actionModalProdutos = ({ row }) => {
    const produto = Number(row?.produtos) !== 0 && row?.kind !== 'fornecedor'

    return (
      <>
        <Tooltip title="Listar de Produtos">
          <IconButton
            className={produto ? 'iconeStar' : 'naoAparece'}
            onClick={() => openProdutos(row.produtos)}
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
      field: 'nomeFantasia',
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
      headerName: 'Clientes',
      align: 'center',
      renderCell: actionModalCurtida,
      width: 150,
      headerAlign: 'center',
      disableColumnMenu: true
    },
    {
      field: 'actionsProdutos',
      headerName: 'Produtos',
      width: 120,
      align: 'center',
      headerAlign: 'center',
      renderCell: actionModalProdutos,
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
        title="Fornecedor"
        subTitle="Página de Categorias"
        actions={actions}
      />
      <Grid container spacing={2}>
        <CssBaseline />
        <Grid item md={12} xl={12}>
          <DataList data={fornecedores} columns={columns} loading={loading} />
        </Grid>
      </Grid>
      <ListaProdutos
        open={modalProduto.open}
        produtos={modalProduto.data}
        close={() => setModalProduto({ ...modalProduto, open: false })}
      />
      <ListaCurtidas
        curtidas={modalCurtidas.data}
        open={modalCurtidas.open}
        close={() => setModalCurtidas({ ...modalCurtidas, open: false })}
      />
    </>
  )
}

export default Fornecedor
