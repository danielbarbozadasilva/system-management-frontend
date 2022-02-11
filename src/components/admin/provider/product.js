import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

import DataList from '~/components/datagrid'

const ListProduct = ({ products, open, close }) => {
  const columnProduct = [
    {
      field: 'fantasyName',
      headerName: 'Nome',
      flex: 1,
      width: 340,
      disableColumnMenu: true
    },
    {
      field: 'price',
      headerName: 'Preço',
      flex: 1,
      width: 340,
      disableColumnMenu: true
    }
  ]

  return (
    <Dialog
      open={open}
      onClose={close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Lista de produtos</DialogTitle>
      <DialogContent style={{ width: '500px ' }}>
        <DataList data={products} columns={columnProduct} loading={false} />
      </DialogContent>
      <DialogActions>
        <Button onClick={close} color="primary" autoFocus>
          fechar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ListProduct
