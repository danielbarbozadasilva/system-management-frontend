import React from 'react'
import { DataGrid } from '@material-ui/data-grid'
import styled from 'styled-components'
import Loading from '../../components/loading/index'

const DataList = ({ data, columns, loading }) => {
  if (loading) {
    return <Loading />
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
