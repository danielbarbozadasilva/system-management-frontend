import React from 'react'
import { Grid, CssBaseline } from '@material-ui/core'

import Title from '~/components/title/index'
import DataList from '~/components/datagrid/index'

import { getAllCurtidas } from '~/store/cliente/cliente.action'
import { useDispatch, useSelector } from 'react-redux'

const Curtida = () => {
  const dispatch = useDispatch()
  const curtidas = useSelector((state) => state.cliente.curtidas)
  const loading = useSelector((state) => state.cliente.loading)

  const callStart = React.useCallback(() => {
    dispatch(getAllCurtidas())
  }, [dispatch])

  React.useEffect(() => {
    callStart()
  }, [callStart])

  const columns = [
    {
      field: 'nomeFantasia',
      headerName: 'Nome',
      flex: 1,
      disableColumnMenu: true
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
      disableColumnMenu: true
    }
  ]

  const actions = () => null
  return (
    <>
      <Title title="Curtidas" actions={actions} />
      <Grid container spacing={2}>
        <CssBaseline />
        <Grid item md={12} xl={12}>
          {console.log('Curtidas' + JSON.stringify(curtidas))}
          <DataList data={curtidas} columns={columns} loading={loading} />
        </Grid>
      </Grid>
    </>
  )
}

export default Curtida
