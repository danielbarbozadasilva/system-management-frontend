import React from 'react'
import { DataGrid } from '@material-ui/data-grid'
import Loading from '../../components/loading/index'
import { BoxTable } from './styled'

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
