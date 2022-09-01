import React from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import Loading from '../../components/loading/index'
import { BoxTable } from './styled'

const DataList = ({ data, columns, loading }) => {
  if (loading) {
    return <Loading />
  }

  return (
    <BoxTable>
      <DataGrid
        rows={data}
        columns={columns}
        loading={loading}
        pageSize={10}
        disableColumnSelector
        disableDensitySelector
        components={{ Toolbar: GridToolbar }}
        componentsProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 }
          }
        }}
      />
    </BoxTable>
  )
}

export default DataList
