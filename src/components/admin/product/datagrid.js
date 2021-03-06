import React from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import {
  updateLikeProduct
} from '~/store/provider/provider.action'
import { DataGrid } from '@material-ui/data-grid'
import { FiTrash2, FiEdit } from 'react-icons/fi'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import { IconButton, Tooltip } from '@material-ui/core'

const DataList = ({ data, modal, loading }) => {
  const dispatch = useDispatch()

  const toggleActive = (id, provider, name, statusLike) => {
    dispatch(updateLikeProduct(id, provider, name, statusLike))
  }

  const thumb = ({ formattedValue }) => {
    return (
      <img src={formattedValue} className='formatImage' />
    )
  }

  const actionLike = ({ id, row }) => {
    const statusLike = row.result_likes[0]
    return (
      <>
        <Tooltip title={statusLike ? 'REMOVER CURTIDA' : 'CURTIR'}>
          <IconButton onClick={() => toggleActive(id, row.provider, row.name, statusLike)} color='primary'>
            <>{statusLike ? <AiFillStar /> : <AiOutlineStar />}</>
          </IconButton>
        </Tooltip>
      </>
    )
  }

  const actionEdit = ({ id, row }) => {
    return (
      <>
        <IconButton onClick={() => modal(2, id)} color='primary' size='small'>
          <FiEdit />
        </IconButton>
      </>
    )
  }

  const actionRemove = ({ id, row }) => {
    return (
      <>
        <IconButton onClick={() => modal(3, id)} color='primary' size='small'>
          <FiTrash2 />
        </IconButton>
      </>
    )
  }

  const columns = [
    {
      field: 'image',
      headerName: 'Imagem',
      renderCell: thumb,
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
      field: 'categoryName',
      headerName: 'Categoria',
      align: 'center',
      flex: 1,
      headerAlign: 'center',
      disableColumnMenu: true
    },
    {
      field: 'price',
      headerName: 'Pre??o',
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
    },
    {
      field: 'actionEdit',
      headerName: 'Editar',
      renderCell: actionEdit,
      align: 'center',
      flex: 1,
      headerAlign: 'center',
      disableColumnMenu: true
    },
    {
      field: 'actionRemove',
      headerName: 'Excluir',
      renderCell: actionRemove,
      align: 'center',
      flex: 1,
      headerAlign: 'center',
      disableColumnMenu: true
    }
  ]

  if (loading) {
    return <p>carregando...</p>
  }

  return (
    <BoxTable>
      <DataGrid rows={data} columns={columns} pageSize={10} />
    </BoxTable>
  )
}

export default DataList

const BoxTable = styled.div`
  height: 600px;
  width: 100%;
`
