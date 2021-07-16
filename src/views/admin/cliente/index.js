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

  const callClientes = useCallback(() => {
    dispatch(getClientes())
  }, [dispatch])

  useEffect(() => {
    callClientes()
  }, [callClientes])

  const columns = [
    {
      field: 'nome',
      headerName: 'Nome',
      width: 230,
      align: 'center',
      headerAlign: 'center',
      disableColumnMenu: true
    },
    {
      field: 'data_nascimento',
      headerName: 'Data nascimento',
      width: 210,
      align: 'center',
      headerAlign: 'center',
      disableColumnMenu: true
    },
    {
      field: 'email',
      headerName: 'E-mail',
      width: 260,
      align: 'center',
      headerAlign: 'center',
      disableColumnMenu: true
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 100,
      align: 'center',
      headerAlign: 'center',
      disableColumnMenu: true
    },
    {
      field: 'uf',
      headerName: 'UF',
      width: 100,
      align: 'center',
      headerAlign: 'center',
      disableColumnMenu: true
    },
    {
      field: 'cidade',
      headerName: 'Cidade',
      width: 150,
      align: 'center',
      headerAlign: 'center',
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
