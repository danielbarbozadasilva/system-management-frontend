import React, { useEffect, useCallback } from 'react'
import { Grid, CssBaseline, Button } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAll,
  create,
  editProd,
  updateProduto,
  remove
} from '../../../store/produto/produto.action'

import Form from '~/components/admin/produto/form'
import Title from '~/components/title'
import DialogModal from '~/components/dialog'
import DataList from '~/components/admin/produto/datagrid'
import Remove from '~/components/admin/produto/remove'

const Produto = () => {
  const dispatch = useDispatch()
  const [modal, setModal] = React.useState({})

  const produtos = useSelector((state) => state.produto.all)
  const loading = useSelector((state) => state.produto.loading)
  const selected = useSelector((state) => state.produto.selected)

  const callProduto = useCallback(() => {
    dispatch(getAll())
  }, [dispatch])

  useEffect(() => {
    callProduto()
  }, [callProduto])

  const toogleModal = (tipo = 1, id = null) => {
    if (id) {
      dispatch(editProd(id)).then(() => setModal({ tipo, id, status: true }))
    } else {
      setModal({ tipo, id, status: true })
    }
  }

  const closeModal = () => setModal({ status: false, tipo: 1 })

  const submitForm = (form) => {
    switch (modal.tipo) {
      // Criar um novo Produto
      case 1:
        dispatch(create(form))
        setModal(false)
        return

      // Atualizar um Produto
      case 2:
        dispatch(updateProduto(form))
        setModal(false)
        return

      // Remover um Produto
      case 3:
        dispatch(remove(modal.id)).then(() => setModal(false))
        return
      default:
        return false
    }
  }

  const actions = () => (
    <Button
      onClick={() => toogleModal(1, null)}
      variant="contained"
      color="primary"
      size="small"
    >
      Novo
    </Button>
  )

  return (
    <>
      <Title title="Produto" subTitle="Página de Produto" actions={actions} />
      <Grid container spacing={2}>
        <CssBaseline />
        <Grid item md={12} xl={8}>
          <DataList data={produtos} loading={loading} modal={toogleModal} />
        </Grid>
      </Grid>
      <DialogModal
        title="Produto"
        open={modal.status || false}
        close={closeModal}
      >
        <>
          {modal.tipo === 1 ? <Form submit={submitForm} /> : null}
          {modal.tipo === 2
            ? (
              <Form submit={submitForm} data={selected} />
              )
            : null}
          {modal.tipo === 3
            ? (
              <Remove close={closeModal} remove={submitForm} />
              )
            : null}
        </>
      </DialogModal>
    </>
  )
}

export default Produto
