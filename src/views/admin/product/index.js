import React, { useEffect, useCallback } from 'react'
import { Grid, CssBaseline, Button } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import {
  createProduct,
  editProduct,
  updateProduct,
  removeProduct
} from '../../../store/product/product.action'
import { getProduct } from '../../../store/provider/provider.action'
import Form from '~/components/admin/product/form/index'
import Title from '~/components/title'
import DialogModal from '~/components/dialog'
import DataList from '~/components/admin/product/datagrid/index'
import Remove from '~/components/admin/product/remove'

const Produto = () => {
  const dispatch = useDispatch()
  const [modal, setModal] = React.useState({})

  const products = useSelector((state) => state.provider.providerById)
  const selected = useSelector((state) => state.product.selected)

  const loading = useSelector((state) => state.product.loading)

  const callProduts = useCallback(() => {
    dispatch(getProduct())
  }, [dispatch])

  useEffect(() => {
    callProduts()
  }, [callProduts])

  const toogleModal = (tipo = 1, id = null) => {
    if (id) {
      dispatch(editProduct(id)).then(() => setModal({ tipo, id, status: true }))
    } else {
      setModal({ tipo, id, status: true })
    }
  }

  const closeModal = () => setModal({ status: false, tipo: 1 })

  const submitForm = (form) => {
    switch (modal.tipo) {
      case 1:
        dispatch(createProduct(form))
        setModal(false)
        return

      case 2:
        dispatch(updateProduct(form))
        setModal(false)
        return

      case 3:
        dispatch(removeProduct(modal.id)).then(() => setModal(false))
        return

      default:
        return false
    }
  }

  const actions = () => (
    <Button onClick={() => toogleModal(1, null)} variant="contained">
      Novo
    </Button>
  )

  return (
    <>
      <Title title="Produto" subTitle="Página de Produto" actions={actions} />
      <Grid container spacing={2}>
        <CssBaseline />
        <Grid item md={12} xl={8}>
          <DataList data={products} loading={loading} modal={toogleModal} />
        </Grid>
      </Grid>
      <DialogModal
        title="Produto"
        open={modal.status || false}
        close={closeModal}
      >
        <>
          {modal.tipo === 1 ? <Form submit={submitForm} /> : null}
          {modal.tipo === 2 ? (
            <Form submit={submitForm} data={selected} />
          ) : null}
          {modal.tipo === 3 ? (
            <Remove close={closeModal} remove={submitForm} />
          ) : null}
        </>
      </DialogModal>
    </>
  )
}

export default Produto
