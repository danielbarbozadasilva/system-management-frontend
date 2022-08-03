import React, { useEffect, useCallback } from 'react'
import { Grid, CssBaseline, Button } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import {
  editCategory,
  updateCategory,
  removeCategory,
  getAllCategories,
  createCategory
} from '~/store/category/category.action'

import Title from '~/components/title'
import DialogModal from '~/components/dialog'
import Form from '~/components/admin/categories/form/index'
import DataList from '~/components/admin/categories/datagrid'
import Remove from '~/components/admin/categories/remove'

const category = () => {
  const dispatch = useDispatch()
  const [modal, setModal] = React.useState({})

  const category = useSelector((state) => state.category.all)
  const loading = useSelector((state) => state.category.loading)
  const selected = useSelector((state) => state.category.selected)

  const callcategory = useCallback(() => {
    dispatch(getAllCategories())
  }, [dispatch])

  useEffect(() => {
    callcategory()
  }, [callcategory])

  const toogleModal = (type = 1, id = null) => {
    if (id) {
      dispatch(editCategory(id)).then(() =>
        setModal({ type, id, status: true })
      )
    } else {
      setModal({ type, id, status: true })
    }
  }

  const closeModal = () => setModal({ status: false, type: 1 })

  const submitForm = (form) => {
    switch (modal.type) {
      case 1:
        dispatch(createCategory(form))
        setModal(false)
        return

      case 2:
        dispatch(updateCategory(form))
        setModal(false)
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
        title="Categorias"
        subTitle="Página de categorias"
        actions={actions}
      />
      <Grid container spacing={2}>
        <CssBaseline />
        <Grid item md={12} xl={12}>
          <DataList data={category} loading={loading} modal={toogleModal} />
        </Grid>
      </Grid>

      <DialogModal
        title="Categoria"
        open={modal.status || false}
        close={closeModal}
      >
        <>
          {modal.type === 1 ? <Form submit={submitForm} /> : null}
          {modal.type === 2 ? (
            <Form submit={submitForm} data={selected} />
          ) : null}
          {modal.type === 3 ? (
            <Remove close={closeModal} remove={submitForm} />
          ) : null}
        </>
      </DialogModal>
    </>
  )
}

export default category
