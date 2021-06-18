import React from 'react'
import {
  Grid,
  CssBaseline,
  Button,
  IconButton,
  Avatar
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { FiTrash2 } from 'react-icons/fi'

import Title from '~/components/title'
import DialogModal from '~/components/dialog'
import DataList from '~/components/datagrid'
import {
  getAll as getAllProdutos,
  create as createProduto
} from '~/store/produto/produto.action'
import { getAll as getAllCategories } from '~/store/categoria/categoria.action'
import FormProduto from '~/components/admin/produto/form'

const Produto = () => {
  const dispatch = useDispatch()
  const [modalForm, setModalForm] = React.useState(false)
  const [modal, setModal] = React.useState({})

  const produtos = useSelector((state) => state.produto.all)
  const loading = useSelector((state) => state.categoria.loading)
  const selected = useSelector((state) => state.categoria.selected)

  const callStart = React.useCallback(() => {
    dispatch(getAllProdutos())
    dispatch(getAllCategories())
  }, [dispatch])

  React.useEffect(() => {
    callStart()
  }, [callStart])

  const actionModal = ({ id }) => {
    return (
      <IconButton
        onClick={() => console.log('remover')}
        color="primary"
        size="small"
      >
        <FiTrash2 />
      </IconButton>
    )
  }

  const viewImageColumn = (props) => {
    return (
      <Avatar variant="square" src={process.env.REACT_APP_API + props.value} />
    )
  }

  const columns = [
    {
      field: 'imagem',
      headerName: 'Imagem',
      flex: 2,
      renderCell: viewImageColumn,
      disableColumnMenu: true
    },
    {
      field: 'preco',
      headerName: 'Preço',
      flex: 2,
      disableColumnMenu: true
    },
    {
      field: 'nome',
      headerName: 'Nome',
      flex: 3,
      disableColumnMenu: true
    },
    {
      field: 'descricao',
      headerName: 'Descricao',
      flex: 3,
      disableColumnMenu: true
    },
    {
      field: 'actions',
      headerName: 'Ações',
      renderCell: actionModal,
      flex: 1,
      disableColumnMenu: true
    }
  ]

  const submitForm = (form) => {}

  const actions = () => (
    <Button
      onClick={() => setModalForm(true)}
      variant="contained"
      color="primary"
      size="small"
    >
      Novo
    </Button>
  )

  function handlesubmit(data) {
    dispatch(createProduto(data)).then(() => setModalForm(false))
  }

  return (
    <>
      <Title title="Produto" actions={actions} />
      <Grid container spacing={2}>
        <CssBaseline />
        <Grid item md={12} xl={12}>
          <DataList data={produtos} columns={columns} loading={loading} />
        </Grid>
      </Grid>
      <DialogModal
        open={modalForm}
        close={() => setModalForm(false)}
        title="Cadastro de Produto"
      >
        <FormProduto submit={handlesubmit} />
      </DialogModal>

      <DialogModal title="Categoria" open={false} close={() => {}}>
        <>oi</>
      </DialogModal>
    </>
  )
}

export default Produto
