import React from 'react'
// import Datagrid from '~/components/admin/categoria/datagrid'
import Form from '~/components/admin/categoria/form'
import Title from '~/components/title'
import { Grid, CssBaseline, Button } from '@material-ui/core'
import DialogModal from '~/components/dialog'
import { useDispatch } from 'react-redux'
import { create as createCategory } from '~/store/categoria/action'

function Categoria() {
  const dispatch = useDispatch()
  const [modal, setModal] = React.useState({
    status: false,
    tipo: 1
  })
  // 1 = novo
  // 2 = editar
  // 3 = excluir

  const actions = () => (
    <Button onClick={novo} variant="contained" color="primary" size="small">
      Novo
    </Button>
  )

  // poderia ser externo
  const ComponentExcluir = () => <h2>Excluir</h2>

  const novo = () => setModal({ status: true, tipo: 1 })

  const closeModal = () => setModal({ status: false, tipo: 1 })

  const handleSubmit = (form) => dispatch(createCategory(form))

  const { component: Component } = modal

  return (
    <>
      <DialogModal title="Categoria" open={modal.status} close={closeModal}>
        <>
          {modal.tipo === 1 ? <Form submit={handleSubmit} /> : null}
          {modal.tipo === 2 ? <Form /> : null}
          {modal.tipo === 3 ? <ComponentExcluir /> : null}
        </>
      </DialogModal>
      <Title
        title="Categoria"
        subTitle="Pagina de Categorias"
        actions={actions}
      />
      <Grid container spacing={2}>
        <CssBaseline />
        <Grid item md={12} xl={8}>
          <p>form</p>
        </Grid>
      </Grid>
    </>
  )
}

export default Categoria
