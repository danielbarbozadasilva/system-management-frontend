import React from 'react'
import { Button, DialogTitle, Dialog, DialogActions } from '@material-ui/core'

const DialogModal = ({ open, close, title, children }) => (
  <Dialog
    open={open}
    onClose={close}
    aria-labelledby='alert-dialog-title'
    aria-describedby='alert-dialog-description'
  >
    <DialogTitle id='alert-dialog-title'>{title || ''}</DialogTitle>

    {children}
    <DialogActions>
      <Button onClick={close} color='primary'>
        Fechar
      </Button>
    </DialogActions>
  </Dialog>
)
export default DialogModal
