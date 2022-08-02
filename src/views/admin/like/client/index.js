import React from 'react'
import { Grid, CssBaseline } from '@material-ui/core'
import Title from '../../../../components/title/index'
import DataList from '../../../../components/datagrid/index'
import { getAllLikesClient } from '~/store/client/client.action'
import { useDispatch, useSelector } from 'react-redux'

const ClientLike = () => {
  const dispatch = useDispatch()
  const listLikeClient = useSelector((state) => state.client.likes)
  const idUser = useSelector((state) => state.auth.user.id)

  const callLikeClient = React.useCallback(() => {
    dispatch(getAllLikesClient(idUser))
  }, [dispatch])

  React.useEffect(() => {
    callLikeClient()
  }, [callLikeClient])

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      align: 'center',
      flex: 1,
      headerAlign: 'center',
      disableColumnMenu: true
    },
    {
      field: 'name',
      headerName: 'Nome',
      align: 'center',
      flex: 1,
      headerAlign: 'center',
      disableColumnMenu: true
    },
    {
      field: 'email',
      headerName: 'E-mail',
      align: 'center',
      flex: 1,
      headerAlign: 'center',
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
          <DataList data={listLikeClient} columns={columns} />
        </Grid>
      </Grid>
    </>
  )
}

export default ClientLike
