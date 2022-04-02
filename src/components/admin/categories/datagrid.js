import React from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { FiTrash2, FiEdit } from 'react-icons/fi'
import { IconButton } from '@material-ui/core'
import styled from 'styled-components'

const DataList = ({ data, modal, loading }) => {
  const mappedData = data.map(item => {
    const { image, ...resto } = item
    return {
      ...resto,
      image: `${process.env.REACT_APP_API}${image}`
    }
  })
  
  const thumb = ({ formattedValue }) => {
    return (
      <img src={formattedValue} className="formatImage"/>
    )
  }

  const actions = ({ id }) => {
    return (
      <>
        <IconButton onClick={() => modal(2, id)} color='primary' size='small'>
          <FiEdit />
        </IconButton>
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
      width: 140,
      align: 'center',
      headerAlign: 'center',
      renderCell: thumb,
      disableColumnMenu: true
    },
    {
      field: 'name',
      headerName: 'Nome',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      disableColumnMenu: true
    },
    {
      field: 'description',
      headerName: 'Descrição',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      disableColumnMenu: true
    },
    {
      field: 'actions',
      headerName: 'Ações',
      renderCell: actions,
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      disableColumnMenu: true
    }
  ]

  if (loading) {
    return <p>carregando...</p>
  }

  return (
    <BoxTable>
      <DataGrid rows={mappedData} columns={columns} pageSize={10} />
    </BoxTable>
  )
}

export default DataList

const BoxTable = styled.div`
  height: 600px;
  width: 100%;
`
