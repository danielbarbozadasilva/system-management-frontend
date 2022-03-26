import React, { useEffect, useCallback } from 'react'
import { Grid, CssBaseline } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import Title from '~/components/title'
import DataList from '~/components/datagrid'
import { getAllClients } from '~/store/client/client.action'

function client () {
  const dispatch = useDispatch()

  const client = useSelector((state) => state.client.all)
  const loading = useSelector((state) => state.provider.loading)

  const callclient = useCallback(() => {
    dispatch(getAllClients())
  }, [dispatch])

  useEffect(() => {
    callclient()
  }, [callclient])

  const columns = [
    {
      field: 'name',
      headerName: 'Nome',
      width: 230,
      align: 'center',
      headerAlign: 'center',
      disableColumnMenu: true
    },
    {
      field: 'birthDate',
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
      field: 'city',
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
      <Title title='Clientes' actions={actions} />
      <Grid container spacing={2}>
        <CssBaseline />
        <Grid item md={12} xl={12}>
          <DataList data={client} columns={columns} loading={loading} />
        </Grid>
      </Grid>
    </>
  )
}

export default client
