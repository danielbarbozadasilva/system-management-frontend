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

  // verifica se o usuário possui 'id', caso tenha faz o dispatch do editCategory
  const toogleModal = (tipo = 1, id = null) => {
    if (id) {
      /* dispatch para preencher o modal que foi aberto
      para que as iformações sejam editadas */
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
        /* requisição após clicar no botão de atualizar dentro do modal,
        temho os dois dispatchs na action update e editCategory */
        console.log(categoria)
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

// import React, { useCallback, useEffect, useState } from 'react'
// import {
//     TextField,
//     Button,
//     Grid,
//     Paper,
//     FormControlLabel,
//     Switch,
//     LinearProgress
// } from '@material-ui/core'
// import styled from 'styled-components'
// import { useSelector, useDispatch } from 'react-redux'
// import { create } from '~/store/categoria/categoria.action';

// const Categoria = () => {
//     const [preview, setPreview] = useState('')
//     const percent = useSelector((state) => state.categoria.upload?.percent || 0)
//     const loading = false // useSelector((state) => state.categoria.loading)
//     const dispatch = useDispatch();

//     const [form, setForm] = useState({
//         status: false
//     })
//     const handleChange = (props) => {
//         const { value, name } = props.target
//         setForm({
//             ...form,
//             [name]: value
//         })
//     }
//     const handleSwitch = () => setForm({ ...form, status: !form.status })

//     const handleSubmit = () => {
//         const newForm = {
//             ...form,
//             status: form.status.toString()
//         }
//         dispatch(
//             create(newForm)
//         )
//     }

//     const cleanup = useCallback(() => {
//         setTimeout(() => {
//             setForm({ status: false })
//             setPreview('')
//         }, 2000)
//     }, [])

//     useEffect(() => {
//         if (!loading) {
//             cleanup()
//         }
//     }, [loading, cleanup])

//     const removeImage = () => {
//         delete form.imagem
//         setForm(form)
//         setPreview('')
//     }
//     const previewImg = (props) => {
//         const imagem = props.target.files[0]
//         const url = URL.createObjectURL(imagem)
//         setPreview(url)
//         setForm({
//             ...form,
//             imagem
//         })
//     }

//     return (
//         <Box>
//             <Content noValidate>
//                 {preview.length > 0
//                     ? (
//                         <Grid container direction="column">
//                             <Grid item sm={1} md={1} xl={1}>
//                                 <Image src={preview} />
//                                 <Button onClick={removeImage} component="label">
//                                     Remove
//                 </Button>
//                             </Grid>
//                         </Grid>
//                     )
//                     : (
//                         <Button
//                             variant="contained"
//                             color="primary"
//                             size="small"
//                             component="label"
//                         >
//                             Upload Foto
//                             <input
//                                 accept="image/*"
//                                 type="file"
//                                 name="imagem"
//                                 hidden
//                                 onChange={previewImg}
//                             />
//                         </Button>
//                     )}
//                 <TextField
//                     size="small"
//                     margin="normal"
//                     variant="outlined"
//                     required
//                     fullWidth
//                     id="nome"
//                     label="Nome"
//                     name="nome"
//                     autoComplete="nome"
//                     autoFocus
//                     value={form.nome || ''}
//                     onChange={handleChange}
//                     disabled={loading}
//                 />
//                 <TextField
//                     size="small"
//                     multiline
//                     rows={3}
//                     rowsMax={6}
//                     variant="outlined"
//                     margin="normal"
//                     required
//                     fullWidth
//                     name="descricao"
//                     label="Descrição"
//                     type="text"
//                     id="descricao"
//                     disabled={loading}
//                     onChange={handleChange}
//                     value={form.descricao || ''}
//                 />
//                 <FormControlLabel
//                     control={
//                         <Switch
//                             checked={form.status}
//                             onChange={handleSwitch}
//                             name="status"
//                             color="primary"
//                             disabled={loading}
//                         />
//                     }
//                     label="Status"
//                 />
//                 <Submit>
//                     <Button
//                         size="small"
//                         className="buttonSubmit"
//                         type="submit"
//                         variant="contained"
//                         color="primary"
//                         onClick={handleSubmit}
//                         disabled={loading}
//                     >
//                         Enviar
//           </Button>
//                     <Grid container direction="column">
//                         <LinearProgress variant="determinate" value={percent} />
//                         {loading && percent > 0 ? percent : ''}
//                     </Grid>
//                 </Submit>
//             </Content>
//         </Box>
//     )
// }

// export default Categoria

// const Content = styled.div`
//   margin-bottom: 10px;
// `

// const Box = styled(Paper)`
//   padding: 16px;
// `
// const Image = styled.img`
//   max-width: 170px;
//   max-height: 170px;
//   margin: 10px;
//   border: thin solid #eee;
//   border-radius: 3px;
//   overflow: hidden;
// `

// const Submit = styled.div`
//   margin: ${({ theme: t }) => t.spacing(0.5)};
//   .buttonSubmit {
//     margin: ${({ theme: t }) => t.spacing(3, 0, 2)};
//   }
// // `
// // import React, { useEffect, useCallback } from 'react'
// // import { Grid, CssBaseline, Button } from '@material-ui/core'
// // import { useDispatch, useSelector } from 'react-redux'
// // import {
// //   create as createCategory,
// //   getAll as getCategories,
// //   edit as editCategory
// // } from '~/store/categoria/categoria.action'

// // import Form from '~/components/admin/categoria/form'
// // import Title from '~/components/title'
// // import DialogModal from '~/components/dialog'
// // import DataList from '~/components/admin/categoria/datagrid'

// // const Categoria = () => {
// //   const dispatch = useDispatch()
// //   const [modal, setModal] = React.useState({})

// //   const categorias = useSelector((state) => state.categoria.all)
// //   const loading = useSelector((state) => state.categoria.loading)
// //   const selected = useSelector((state) => state.categoria.selected)

// //   // 1 = novo
// //   // 2 = editar
// //   // 3 = excluir

// //   const callCategoria = useCallback(() => {
// //     dispatch(getCategories())
// //   }, [dispatch])

// //   useEffect(() => {
// //     callCategoria()
// //   }, [callCategoria])

// //   // poderia ser externo
// //   const ComponentExcluir = () => <h2>Excluir</h2>

// //   const toogleModal = (tipo = 1, id = null) => {
// //     if (id) {
// //       dispatch(editCategory(id)).then(() =>
// //         setModal({ tipo, id, status: true })
// //       )
// //     } else {
// //       setModal({ tipo, id, status: true })
// //     }
// //   }

// //   const closeModal = () => setModal({ status: false, tipo: 1 })

// //   const handleSubmit = (form) => dispatch(createCategory(form))

// //   const actions = () => (
// //     <Button
// //       onClick={toogleModal(1, null)}
// //       variant="contained"
// //       color="primary"
// //       size="small"
// //     >
// //       Novo
// //     </Button>
// //   )
// //   return (
// //     <>
// //       <Title
// //         title="Categoria"
// //         subTitle="Pagina de Categorias"
// //         actions={actions}
// //       />
// //       <Grid container spacing={2}>
// //         <CssBaseline />
// //         <Grid item md={12} xl={8}>
// //           <DataList data={categoria} loading={loading} modal={toogleModal} />
// //         </Grid>
// //       </Grid>

// //       <DialogModal title="Categoria" open={modal.status || false} close={closeModal}>
// //         <>
// //           {modal.tipo === 1 ? <Form submit={handleSubmit} /> : null}
// //           {modal.tipo === 2
// //             ? (
// //               <Form submit={handleSubmit} data={selected} />
// //               )
// //             : null}
// //           {modal.tipo === 3 ? <ComponentExcluir /> : null}
// //         </>
// //       </DialogModal>
// //     </>
// //   )
// // }

// // export default Categoria
