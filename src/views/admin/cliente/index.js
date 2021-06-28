import React, { useEffect, useCallback } from 'react'
import { Grid, CssBaseline } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import Title from '~/components/title'
import DataList from '~/components/datagrid'

import { getAll as getClientes } from '~/store/cliente/cliente.action'

function Cliente() {
  const dispatch = useDispatch()

  const clientes = useSelector((state) => state.cliente.all)
  const loading = useSelector((state) => state.fornecedor.loading)

  const callFornecedor = useCallback(() => {
    dispatch(getClientes())
  }, [dispatch])

  useEffect(() => {
    callFornecedor()
  }, [callFornecedor])

  const columns = [
    { field: 'nome', headerName: 'Nome', flex: 1, disableColumnMenu: true },
    {
      field: 'data_nascimento',
      headerName: 'Data de nascimento',
      flex: 1,
      disableColumnMenu: true
    },
    {
      field: 'email',
      headerName: 'E-mail',
      flex: 1,
      disableColumnMenu: true
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      disableColumnMenu: true
    }
    ,
    {
      field: 'uf',
      headerName: 'Uf',
      flex: 1,
      disableColumnMenu: true
    },
    {
      field: 'cidade',
      headerName: 'Cidade',
      flex: 1,
      disableColumnMenu: true
    }
  ]

  const actions = () => null

  return (
    <>
      <Title title="Clientes" actions={actions} />
      <Grid container spacing={2}>
        <CssBaseline />
        <Grid item md={12} xl={12}>
          <DataList data={clientes} columns={columns} loading={loading} />
        </Grid>
      </Grid>
    </>
  )
}

export default Cliente
