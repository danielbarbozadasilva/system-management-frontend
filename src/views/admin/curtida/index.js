import React from 'react'
import {
  Grid,
  CssBaseline,
} from '@material-ui/core'

import Title from '~/components/title'
import DataList from '~/components/datagrid'

import { getAllCurtidas } from '~/store/cliente/action'
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
    // {
    //   field: 'imagem',
    //   headerName: 'Imagem',
    //   flex: 2,
    //   renderCell: viewImageColumn,
    //   disableColumnMenu: true
    // },
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
    // {
    //   field: 'actions',
    //   headerName: 'Ações',
    //   renderCell: actionModal,
    //   flex: 1,
    //   disableColumnMenu: true
    // }
  ]

  const actions = () => null
  return (
    <>
      <Title title="Curtidas" actions={actions} />
      <Grid container spacing={2}>
        <CssBaseline />
        <Grid item md={12} xl={12}>
          <DataList data={curtidas} columns={columns} loading={loading} />
        </Grid>
      </Grid>
    </>
  )
}

export default Curtida
