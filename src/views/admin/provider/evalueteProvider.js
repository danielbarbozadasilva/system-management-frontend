import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, CssBaseline, IconButton, Tooltip } from '@material-ui/core'
import Title from '~/components/title'
import DataList from '~/components/datagrid'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import styled from 'styled-components'
import { getAllProviders } from '~/store/provider/provider.action'
import { updateLikeClientProvider } from '~/store/client/client.action'

const ProviderEvaluete = () => {
  const dispatch = useDispatch()
  const provider = useSelector((state) => state.provider.all)
  const loading = useSelector((state) => state.provider.loading)
  const idUser = useSelector((state) => state.auth.user.id)

  const callProviderEvaluete = useCallback(() => {
    dispatch(getAllProviders())
  }, [dispatch])

  useEffect(() => {
    callProviderEvaluete()
  }, [callProviderEvaluete])

  const toggleActive = (id, client, name, statusLike) => {
    dispatch(updateLikeClientProvider(id, client, name, statusLike))
  }

  const actionLike = ({ id, row }) => {
    const statusLike = row?.result_client[0]
    return (
      <>
        <Tooltip title={statusLike ? 'REMOVER CURTIDA' : 'CURTIR'}>
          <IconButton onClick={() => toggleActive(id, idUser, row.fantasyName, statusLike)} color='primary'>
            <>{statusLike ? <AiFillStar /> : <AiOutlineStar />}</>
          </IconButton>
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
    return <p>carregando...</p>
  }

  const actions = () => null
  return (
    <>
      <Title
        title='Avalie os fornecedores'
        actions={actions}
      />
      <Grid container spacing={2}>
        <CssBaseline />
        <Grid item md={12} xl={12}>
          <DataList data={provider} columns={columns} loading={loading} />
        </Grid>
      </Grid>
    </>
  )
}

export default ProviderEvaluete

const BoxTable = styled.div`
  height: 600px;
  width: 100%;
`
