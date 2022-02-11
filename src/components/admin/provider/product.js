import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

import DataList from '~/components/datagrid'

const Listaproducts = ({ products, open, close }) => {
  const columnsproducts = [
    {
      field: 'name',
      headerName: 'name',
      flex: 1,
      width: 340,
      disableColumnMenu: true
    },
    {
      field: 'preco',
      headerName: 'Preço',
      flex: 1,
      width: 340,
      disableColumnMenu: true
    }
  ]
  // const products = useSelector((state) => state.provider.products)

  return (
    <Dialog
      open={open}
      onClose={close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Lista de products</DialogTitle>
      <DialogContent style={{ width: '500px ' }}>
        <DataList data={products} columns={columnsproducts} loading={false} />
      </DialogContent>
      <DialogActions>
        <Button onClick={close} color="primary" autoFocus>
          fechar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Listaproducts
