import React from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { FiTrash2, FiEdit } from 'react-icons/fi'
import { IconButton } from '@material-ui/core'
import styled from 'styled-components'

const DataList = ({ data, modal, loading }) => {
// Vou passar os actions para dentro do meu componente (Componente genérico)
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
      field: 'status',
      headerName: 'Status',
      width: 120,
      disableColumnMenu: true
    },
    { field: 'nome', headerName: 'Nome', flex: 1, disableColumnMenu: true },
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
      {/* Pega as linhas e as colunas da 'PROPS'- define que o número de registros por pagina é '10' */}
      <DataGrid rows={data} columns={columns} pageSize={10} />
    </BoxTable>
  )
}

export default DataList

const BoxTable = styled.div`
  height: 600px;
  width: 100%;
`
