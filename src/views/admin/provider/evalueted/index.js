import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, CssBaseline, IconButton, Tooltip } from '@material-ui/core'
import Title from '~/components/title'
import DataList from '~/components/datagrid'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import { getAllProviders } from '~/store/provider/provider.action'
import {
  listByIdClient,
  updateLikeClientProvider
} from '~/store/client/client.action'
import Loading from '../../../../components/loading/index'

const ProviderEvaluete = () => {
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.provider.loading)

  const providers = useSelector((state) => state.provider.all)
  const client = useSelector((state) => state.client.select)
  const idUser = useSelector((state) => state.auth.user.id)

  const callProviderEvaluete = useCallback(() => {
    dispatch(getAllProviders())
    dispatch(listByIdClient(idUser))
  }, [dispatch])

  useEffect(() => {
    callProviderEvaluete()
  }, [callProviderEvaluete])

  const toggleActive = (id, client, name, statusLike) => {
    dispatch(updateLikeClientProvider(id, client, name, statusLike)) 
  }

  const actionLike = ({ id, row }) => {
    const statusLike = client?.likes?.find((item) => item === id)
    return (
      <>
        <Tooltip title={statusLike ? 'REMOVER CURTIDA' : 'CURTIR'}>
          <span>
            <IconButton
              color="primary"
              onClick={() =>
                toggleActive(id, idUser, row.fantasyName, statusLike)
              }
            >
              <>{statusLike ? <AiFillStar /> : <AiOutlineStar />}</>
            </IconButton>
          </span>
        </Tooltip>
      </>
    )
  }

  const columns = [
    {
      field: 'fantasyName',
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
    },
    {
      field: 'phone',
      headerName: 'Telefone',
      align: 'center',
      flex: 1,
      headerAlign: 'center',
      disableColumnMenu: true
    },
    {
      field: 'actionLike',
      headerName: 'Curtir',
      renderCell: actionLike,
      align: 'center',
      flex: 1,
      headerAlign: 'center',
      disableColumnMenu: true
    }
  ]

  if (loading) {
    return <Loading />
  }

  const actions = () => null
  return (
    <>
      <Title title="Avalie os fornecedores" actions={actions} />
      <Grid container spacing={2}>
        <CssBaseline />
        <Grid item md={12} xl={12}>
          <DataList data={providers} columns={columns} loading={loading} />
        </Grid>
      </Grid>
    </>
  )
}

export default ProviderEvaluete
