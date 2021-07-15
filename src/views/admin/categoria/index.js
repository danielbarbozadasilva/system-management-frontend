import React, { useEffect, useCallback } from 'react'
import { Grid, CssBaseline, Button } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import {
  edit as editCategory,
  update as updateCategory,
  remove as removeCategory,
  getAll as getCategories,
  create as createCategory
} from '~/store/categoria/categoria.action'

import Form from '~/components/admin/categoria/form'
import Title from '~/components/title'
import DialogModal from '~/components/dialog'
import DataList from '~/components/admin/categoria/datagrid'
import Remove from '~/components/admin/categoria/remove'

const Categoria = () => {
  const dispatch = useDispatch()
  const [modal, setModal] = React.useState({})

  const categoria = useSelector((state) => state.categoria.all)
  const loading = useSelector((state) => state.categoria.loading)
  const selected = useSelector((state) => state.categoria.selected)

  // 1 = novo 2 = editar  3 = excluir
  const callCategoria = useCallback(() => {
    dispatch(getCategories())
  }, [dispatch])

  useEffect(() => {
    callCategoria()
  }, [callCategoria])

  const toogleModal = (tipo = 1, id = null) => {
    if (id) {
      dispatch(editCategory(id)).then(() =>
        setModal({ tipo, id, status: true })
      )
    } else {
      setModal({ tipo, id, status: true })
    }
  }

  const closeModal = () => setModal({ status: false, tipo: 1 })

  const submitForm = (form) => {
    switch (modal.tipo) {
      case 1:
        dispatch(createCategory(form))
        return
      case 2:
        dispatch(updateCategory(form))
        return
      case 3:
        dispatch(removeCategory(modal.id)).then(() => setModal(false))
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
      <Title
        title="Categoria"
        subTitle="Pagina de Categorias"
        actions={actions}
      />
      <Grid container spacing={2}>
        <CssBaseline />
        <Grid item md={12} xl={8}>
          <DataList data={categoria} loading={loading} modal={toogleModal} />
        </Grid>
      </Grid>

      <DialogModal
        title="Categoria"
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

export default Categoria
