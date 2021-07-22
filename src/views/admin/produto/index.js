import React, { useEffect, useCallback } from 'react'
import { Grid, CssBaseline, Button } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAll,
  create,
  editProd,
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

  const produto = useSelector((state) => state.produto.all)
  const loading = useSelector((state) => state.produto.loading)
  const selected = useSelector((state) => state.produto.selected)

  // 1 = novo 2 = editar  3 = excluir
  const callProduto = useCallback(() => {
    dispatch(getAll())
  }, [dispatch])

  useEffect(() => {
    callProduto()
  }, [callProduto])

  const toogleModal = (tipo = 1, id = null) => {
    console.log(id)
    if (id) {
      dispatch(editProd(id)).then(() => setModal({ tipo, id, status: true }))
    } else {
      setModal({ tipo, id, status: true })
    }
  }

  const closeModal = () => setModal({ status: false, tipo: 1 })

  const submitForm = (form) => {
    switch (modal.tipo) {
      case 1:
        dispatch(create(form))
        return
      case 2:
        dispatch(editProd(form))
        return
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
          <DataList data={produto} loading={loading} modal={toogleModal} />
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


























































// import {
//   Grid,
//   CssBaseline,
//   Button,
//   IconButton,
//   Avatar,
//   Tooltip
// } from '@material-ui/core'
// import { FiTrash2 } from 'react-icons/fi'
// import { MdStar } from 'react-icons/md'
// import Title from '~/components/title'
// import DialogModal from '~/components/dialog'
// import DataList from '~/components/datagrid'
// import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { More as MoreIcon } from '@material-ui/icons'
// import {
//   getAll as getAllProdutos,
//   create as createProduto,
//   remove as removeProduto
//   , getProducts,
//   editarProduto
// } from '~/store/produto/produto.action'
// import { likeProduto } from '~/store/fornecedor/fornecedor.action'
// import FormProduto from '~/components/admin/produto/form'
// import ListaCategoria from '../../../components/admin/forncedor/categoria'
// import Swal from 'sweetalert2'

// const Produto = () => {
//   const dispatch = useDispatch()

//   const [modalForm, setModalForm] = React.useState(false)
//   const [isOpenModalCategoria, setIsOpenModalCategoria] = React.useState(false)

//   const tipoUsuario = useSelector((state) => state.auth.usuario.tipoUsuario)
//   const produtos = useSelector((state) => state.produto.all)
//   const loading = useSelector((state) => state.categoria.loading)
//   const selected = useSelector((state) => state.categoria.selected)
//   const idUser = useSelector((state) => state.auth.usuario.id)
//   const [modal, setModal] = React.useState({})

//   const produtoAll = useSelector((state) => state.produto.all)
//   const selectedProd = useSelector((state) => state.produto.selected)
//   const nameFilter = 'fornecedor'

//   const callStart = React.useCallback(() => {
//     if (tipoUsuario !== 2) {
//       dispatch(getAllProdutos())
//     } else {
//       dispatch(getProducts(idUser, nameFilter))
//     }
//   }, [dispatch])

//   React.useEffect(() => {
//     callStart()
//   }, [callStart])

//   function likeFornecedor(row) {
//     dispatch(likeProduto(row))
//   }

//   function editar(row) {
//     const toogleModal = (id = null) => {
//       if (row.id) {
//         const submitForm = (form) => {
//           dispatch(editarProduto(row.id)).then(() =>
//             setModal({ tipo, id, status: true })
//           )
//         }
//       }
//     }
//   }

//   function remove(produto) {
//     Swal.fire({
//       title: 'Tem certeza que deseja excluir o produto?',
//       text: 'Você não poderá voltar atrás!',
//       icon: 'warning',
//       showCancelButton: true,
//       cancelButtonText: 'Não',

//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Sim'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         dispatch(removeProduto(produto))
//         Swal.fire(
//           'Excluído!',
//           'O produto foi excluído com sucesso.',
//         )
//       }
//     })
//   }

//   const actionModalEditarProduto = ({ id, row }) => {
//     if (tipoUsuario == 2) {
//       return (
//         <>
//           <IconButton onClick={() => editar(row)} color="primary" size="small">
//             <MoreIcon />
//           </IconButton>
//         </>
//       )
//     }
//   }

//   const actionModalExcluirProduto = ({ id, row }) => {
//     if (tipoUsuario < 3) {
//       return (
//         <>
//           <IconButton onClick={() => remove(row)} color="primary" size="small">
//             <FiTrash2 />
//           </IconButton>
//         </>
//       )
//     }
//   }

//   const actionModal = ({ id, row }) => {
//     if (tipoUsuario < 3) {
//       return (
//         <>
//           <Tooltip title="Listar de Produtos">
//             <IconButton onClick={() => categoriaProduto(row)} color="primary">
//               <MoreIcon />
//             </IconButton>
//           </Tooltip>
//         </>
//       )
//     } else {
//       return (
//         <IconButton
//           onClick={() => likeFornecedor(row)}
//           color="primary"
//           size="small"
//         >
//           <MdStar />
//         </IconButton>
//       )
//     }
//   }

//   const viewImageColumn = (props) => {
//     return (
//       <Avatar variant="square" src={process.env.REACT_APP_API + props.value} />
//     )
//   }

//   const columns = [
//     {
//       field: 'imagem',
//       headerName: 'Imagem',
//       flex: 1,
//       align: 'center',
//       headerAlign: 'center',
//       renderCell: viewImageColumn,
//       disableColumnMenu: true
//     },
//     {
//       field: 'nome',
//       headerName: 'Nome',
//       flex: 3,
//       align: 'center',
//       headerAlign: 'center',
//       disableColumnMenu: true
//     },
//     {
//       field: 'preco',
//       headerName: 'Preço',
//       flex: 2,
//       align: 'center',
//       headerAlign: 'center',
//       disableColumnMenu: true
//     },
//     {
//       field: 'categoriaName',
//       headerName: 'Categoria',
//       flex: 2,
//       align: 'center',
//       headerAlign: 'center',
//       disableColumnMenu: true
//     },
//     {
//       field: 'actionEditProd',
//       headerName: 'Editar',
//       align: 'center',
//       headerAlign: 'center',
//       flex: 1,
//       renderCell: actionModalEditarProduto,
//       disableColumnMenu: true
//     },
//     {
//       field: 'actionExcluirProd',
//       headerName: 'Excluir',
//       align: 'center',
//       headerAlign: 'center',
//       renderCell: actionModalExcluirProduto,
//       flex: 1,
//       disableColumnMenu: true
//     }
//   ]

//   const submitForm = (form) => {}

//   const actions = () => (
//     <Button
//       onClick={() => setModalForm(true)}
//       variant="contained"
//       color="primary"
//       size="small"
//     >
//       Novo
//     </Button>
//   )

//   function handlesubmit(data) {
//     dispatch(createProduto(data)).then(() => setModalForm(false))
//   }

//   return (
//     <>
//       <Title title="Produto" actions={actions} />
//       <Grid container spacing={2}>
//         <CssBaseline />
//         <Grid item md={12} xl={12}>
//           <DataList data={produtos} columns={columns} loading={loading} />
//         </Grid>
//       </Grid>
//       <DialogModal
//         open={modalForm}
//         close={() => setModalForm(false)}
//         title="Cadastro de Produto"
//       >
//         <FormProduto submit={handlesubmit} />
//       </DialogModal>

//       <ListaCategoria open={isOpenModalCategoria} close={() => setIsOpenModalCategoria(false)} />

//       <DialogModal title="Categoria" open={false} close={() => {}}>
//         <></>
//       </DialogModal>
//     </>
//   )
// }

// export default Produto
