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
import FormProductRegister from '~/components/admin/product/form/register/index'
import FormProductUpdate from '~/components/admin/product/form/update/index'
import Title from '~/components/title'
import DialogModal from '~/components/dialog'
import DataList from '~/components/admin/product/datagrid/index'
import Remove from '~/components/admin/product/form/remove'

const Product = () => {
  const dispatch = useDispatch()
  const [modal, setModal] = React.useState({})
  const products = useSelector((state) => state.provider.providerById)
  const loading = useSelector((state) => state.product.loading)

  const callProduts = useCallback(() => {
    dispatch(getProduct())
  }, [dispatch])

  useEffect(() => {
    callProduts()
  }, [callProduts])

  const toogleModal = (type = 1, id = null) => {
    if (id) {
      dispatch(editProduct(id)).then(() => setModal({ type, id, status: true }))
    } else {
      setModal({ type, id, status: true })
    }
  }

  const closeModal = () => setModal({ status: false, type: 1 })

  const submitForm = (form) => {
    switch (modal.type) {
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
      <Title title="Produtos" subTitle="Página de Produto" actions={actions} />
      <Grid container spacing={2}>
        <CssBaseline />
        <Grid item md={12} xl={12}>
          <DataList data={products} loading={loading} modal={toogleModal} />
        </Grid>
      </Grid>
      <DialogModal
        title="Produto"
        open={modal.status || false}
        close={closeModal}
      >
        <>
          {modal.type === 1 ? (
            <FormProductRegister submit={submitForm} />
          ) : modal.type === 2 ? (
            <FormProductUpdate submit={submitForm} />
          ) : modal.type === 3 ? (
            <Remove open={!!modal} close={closeModal} remove={submitForm} />
          ) : null}
        </>
      </DialogModal>
    </>
  )
}

export default Product
