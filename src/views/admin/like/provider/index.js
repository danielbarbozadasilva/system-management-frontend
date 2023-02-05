import React from 'react'
import { Grid, CssBaseline } from '@material-ui/core'
import Title from '../../../../components/title/index'
import DataList from '../../../../components/datagrid/index'
import { getAllLikesProviderProduct } from '~/store/provider/provider.action'
import { useDispatch, useSelector } from 'react-redux'

const ProviderLike = () => {
  const dispatch = useDispatch()
  const listLikeProvider = useSelector((state) => state.provider.likes)

  const callLikesProvider = React.useCallback(() => {
    dispatch(getAllLikesProviderProduct())
  }, [dispatch])

  React.useEffect(() => {
    callLikesProvider()
  }, [callLikesProvider])

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
      field: 'nameProvider',
      headerName: 'Nome',
      align: 'center',
      flex: 1,
      headerAlign: 'center',
      disableColumnMenu: true
    },
    {
      field: 'priceProduct',
      headerName: 'Preço',
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
          <DataList data={listLikeProvider} columns={columns} />
        </Grid>
      </Grid>
    </>
  )
}

export default ProviderLike
