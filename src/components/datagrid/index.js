import React from 'react'
import { DataGrid } from '@material-ui/data-grid'
import styled from 'styled-components'

const DataList = ({ data, columns, loading }) => {
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
