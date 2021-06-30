import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

import DataList from '~/components/datagrid'

const ListaCurtidas= ({ open, close, curtidas }) => {
  const columnsCurtidas= [
    {
      field: 'clienteId',
      headerName: 'id',
      flex: 1,
      width: 340,
      disableColumnMenu: true
    },{
      field: 'clienteNome',
      headerName: 'Nome',
      flex: 1,
      width: 340,
      disableColumnMenu: true
    },
  ]

  return (
    <Dialog
      open={open}
      onClose={close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Lista de curtidas</DialogTitle>
      <DialogContent style={{ width: '500px ' }}>
        <DataList data={curtidas} columns={columnsCurtidas} loading={false} />
      </DialogContent>
      <DialogActions>
        <Button onClick={close} color="primary" autoFocus>
          fechar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ListaCurtidas