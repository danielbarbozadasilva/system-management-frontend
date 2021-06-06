import React, { useEffect, useCallback } from 'react'
import { Grid, CssBaseline, IconButton } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'

import Title from '~/components/title'
import DataList from '~/components/datagrid'
import { BsToggleOff, BsToggleOn } from 'react-icons/bs'

import {
  getAll as getFornecedor,
  setStatusFornecedor
} from '~/store/fornecedor/action'

function Fornecedor() {
  const dispatch = useDispatch()

  const fornecedores = useSelector((state) => state.fornecedor.all)
  const loading = useSelector((state) => state.fornecedor.loading)

  const callFornecedor = useCallback(() => {
    dispatch(getFornecedor())
  }, [dispatch])

  useEffect(() => {
    callFornecedor()
  }, [callFornecedor])

  const toggleActive = (id, status) => {
    dispatch(setStatusFornecedor(id, status))
  }

  const actionModal = ({ id, row }) => {
    const status = row.status === 'Ativo'
    return (
      <>
        <IconButton onClick={() => toggleActive(id, status)} color="primary">
          <>{!status ? <BsToggleOff /> : <BsToggleOn />}</>
        </IconButton>
      </>
    )
  }

  const columns = [
    { field: 'cnpj', headerName: 'CNPJ', width: 160, disableColumnMenu: true },
    {
      field: 'nomeFantasia',
      headerName: 'Nome Fantasia',
      flex: 1,
      disableColumnMenu: true
    },
    {
      field: 'actions',
      headerName: 'Ações',
      renderCell: actionModal,
      width: 140,
      disableColumnMenu: true
    }
  ]

  const actions = () => null

  return (
    <>
      <Title
        title="Fornecedor"
        subTitle="Pagina de Categorias"
        actions={actions}
      />
      <Grid container spacing={2}>
        <CssBaseline />
        <Grid item md={12} xl={12}>
          <DataList data={fornecedores} columns={columns} loading={loading} />
        </Grid>
      </Grid>
    </>
  )
}

export default Fornecedor
