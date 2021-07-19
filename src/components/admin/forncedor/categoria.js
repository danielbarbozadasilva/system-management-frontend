import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

import DataList from '~/components/datagrid'
import { useSelector } from 'react-redux'

const ListaCategoria = ({ open, close }) => {
  const columnsCategoria = [
    {
      field: 'id',
      headerName: 'ID',
      flex: 1,
      width: 340,
      disableColumnMenu: true
    },
    {
      field: 'nome',
      headerName: 'nome',
      flex: 1,
      width: 340,
      disableColumnMenu: true
    }
  ]

  const categoria = useSelector((state) => state.categoria.dadosById)
  return (
    <Dialog
      open={open}
      onClose={close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Lista de Categoria</DialogTitle>
      <DialogContent style={{ width: '500px ' }}>
        <DataList data={[categoria]} columns={columnsCategoria} loading={false} />
      </DialogContent>
      <DialogActions>
        <Button onClick={close} color="primary" autoFocus>
          fechar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ListaCategoria
