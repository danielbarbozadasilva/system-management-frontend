import React from 'react'
import { Grid, CssBaseline } from '@material-ui/core'

import Title from '../../../components/title/index'
import DataList from '../../../components/datagrid/index'

import { getAllLikesProviderProduct } from '~/store/provider/provider.action'
import { useDispatch, useSelector } from 'react-redux'

const Like = () => {
  const dispatch = useDispatch()
  const listLikes = useSelector((state) => state.provider.likes)

  const callStart = React.useCallback(() => {
    dispatch(getAllLikesProviderProduct())
  }, [dispatch])

  React.useEffect(() => {
    callStart()
  }, [callStart])

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      flex: 1,
      disableColumnMenu: true
    },
    {
      field: 'product',
      headerName: 'Nome',
      flex: 1,
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
          {console.log(listLikes)}
          <DataList
            data={listLikes} columns={columns}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default Like
