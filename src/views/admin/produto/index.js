import {
  Grid,
  CssBaseline,
  Button,
  IconButton,
  Avatar,
  Tooltip
} from '@material-ui/core'
import { FiTrash2 } from 'react-icons/fi'
import { MdStar } from 'react-icons/md'
import Title from '~/components/title'
import DialogModal from '~/components/dialog'
import DataList from '~/components/datagrid'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { More as MoreIcon } from '@material-ui/icons'
import {
  getAll as getAllProdutos,
  create as createProduto,
  remove as removeProduto
  , getProducts
} from '~/store/produto/produto.action'
import { getCategoriaById } from '~/store/categoria/categoria.action'
import { likeProduto } from '~/store/fornecedor/fornecedor.action'
import FormProduto from '~/components/admin/produto/form'

import ListaCategoria from '../../../components/admin/forncedor/categoria'
const Produto = () => {
  const dispatch = useDispatch()
  const [modalForm, setModalForm] = React.useState(false)
  const [modal, setModal] = React.useState({})
  const [isOpenModalCategoria, setIsOpenModalCategoria] = React.useState(false)

  const tipoUsuario = useSelector((state) => state.auth.usuario.tipoUsuario)
  const produtos = useSelector((state) => state.produto.all)
  const loading = useSelector((state) => state.categoria.loading)
  // const selected = useSelector((state) => state.categoria.selected)
  const idUser = useSelector((state) => state.auth.usuario.id)

  const nameFilter = 'fornecedor'
  const callStart = React.useCallback(() => {
    if (tipoUsuario !== 2) {
      dispatch(getAllProdutos())
    } else {
      dispatch(getProducts(idUser, nameFilter))
    }
  }, [dispatch])

  React.useEffect(() => {
    callStart()
  }, [callStart])

  function likeFornecedor(row) {
    dispatch(likeProduto(row))
  }

  function remove(produto) {
    dispatch(removeProduto(produto))
  }
  function categoriaProduto(row) {
    dispatch(getCategoriaById(row.categoriaId)).then(() => { setIsOpenModalCategoria(true) })
  }

  const actionModal = ({ id, row }) => {
    if (tipoUsuario < 3) {
      return (
        <>
          {/* lista DATALIST - produtos
          <Tooltip title="Listar de Produtos">
            <IconButton onClick={() => openProdutos(row)} color="primary">
              <MoreIcon />
            </IconButton>
          </Tooltip> */}

          {/* lista DATALIST - categora */}
          <Tooltip title="Listar de Produtos">
            <IconButton onClick={() => categoriaProduto(row)} color="primary">
              <MoreIcon />
            </IconButton>
          </Tooltip>

          {/* excluir - produtos */}
          <IconButton onClick={() => remove(row)} color="primary" size="small">
            <FiTrash2 />
          </IconButton>
        </>
      )
    } else {
      return (
        <IconButton
          onClick={() => likeFornecedor(row)}
          color="primary"
          size="small"
        >
          <MdStar />
        </IconButton>
      )
    }
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
    }, {
      field: 'nome',
      headerName: 'Nome',
      flex: 3,
      disableColumnMenu: true
    },
    {
      field: 'preco',
      headerName: 'Preço',
      flex: 2,
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

      <ListaCategoria open={isOpenModalCategoria} close={() => setIsOpenModalCategoria(false)} />

      <DialogModal title="Categoria" open={false} close={() => {}}>
        <></>
      </DialogModal>
    </>
  )
}

export default Produto
