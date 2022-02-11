import React from 'react'
import { Grid, CssBaseline } from '@material-ui/core'

import Title from '../../../components/title/index'
import DataList from '~/components/datagrid/index'

import { getAllLikesClient } from '~/store/client/client.action'
import { useDispatch, useSelector } from 'react-redux'

const Curtida = () => {
  const dispatch = useDispatch()
  const curtidas = useSelector((state) => state.client.likes)
  const loading = useSelector((state) => state.client.loading)

  const callStart = React.useCallback(() => {
    dispatch(getAllLikesClient())
  }, [dispatch])

  React.useEffect(() => {
    callStart()
  }, [callStart])

  const columns = [
    {
      field: 'fantasyName',
      headerName: 'Nome',
      flex: 1,
      disableColumnMenu: true
    },
    {
      field: 'email',
      headerName: 'E-mail',
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
          <DataList data={curtidas} columns={columns} />
        </Grid>
      </Grid>
    </>
  )
}

export default Curtida
