import React from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { FiTrash2, FiEdit } from 'react-icons/fi'
import { IconButton } from '@material-ui/core'
import styled from 'styled-components'

const DataList = ({ data, modal, loading }) => {
  const mappedData = data.map((item) => {
    const { imagem, status, ...resto } = item
    return {
      ...resto,
      status: status ? 'Ativa' : 'Inativa',
      imagem: `${process.env.REACT_APP_API}${imagem}`
    }
  })

  const thumb = ({ formattedValue }) => {
    return (
      <img src={formattedValue} />
    )
  }

  const actions = ({ id }) => {
    return (
      <>
        <IconButton onClick={() => modal(2, id)} color="primary" size="small">
          <FiEdit />
        </IconButton>
        <IconButton onClick={() => modal(3, id)} color="primary" size="small">
          <FiTrash2 />
        </IconButton>
      </>
    )
  }
  const columns = [
    {
      field: 'imagem',
      headerName: 'Imagem',
      renderCell: thumb,
      width: 140,
      disableColumnMenu: true
    },
    {
      field: 'nome',
      headerName: 'Nome',
      flex: 2,
      disableColumnMenu: true
    },
    {
      field: 'descricao',
      headerName: 'Descrição',
      flex: 2,
      disableColumnMenu: true
    },
    {
      field: 'actions',
      headerName: 'Ações',
      renderCell: actions,
      width: 140,
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
