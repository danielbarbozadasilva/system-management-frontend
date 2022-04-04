import React from 'react'
import { Grid, CssBaseline } from '@material-ui/core'

import Title from '../../../components/title/index'
import DataList from '../../../components/datagrid/index'

import { getAllLikesProviderProduct } from '~/store/provider/provider.action'
import { getAllLikesClient } from '~/store/client/client.action'

import { useDispatch, useSelector } from 'react-redux'

const Like = () => {
  const dispatch = useDispatch()
  const listLikeClient = useSelector((state) => state.client.likes)
  const listLikeProvider = useSelector((state) => state.provider.likes)
  const typeUser = useSelector((state) => state.auth.user.typeUser)

  const callStart = React.useCallback(() => {
    if (typeUser === 2) {
      dispatch(getAllLikesProviderProduct())
    } else {
      dispatch(getAllLikesClient())
    }
  }, [dispatch])

  React.useEffect(() => {
    callStart()
  }, [callStart])

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
      field: typeUser === 2 ? 'price' : 'email',
      headerName: typeUser === 2 ? 'Preço' : 'E-mail',
      align: 'center',
      flex: 1,
      headerAlign: 'center',
      disableColumnMenu: true
    }
  ]

  const actions = () => null
  return (
    <>
      <Title title='Curtidas' actions={actions} />
      <Grid container spacing={2}>
        <CssBaseline />
        <Grid item md={12} xl={12}>
          <DataList
            data={typeUser === 3 ? listLikeClient : listLikeProvider} columns={columns}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default Like
