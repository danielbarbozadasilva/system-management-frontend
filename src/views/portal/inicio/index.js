import React, { useEffect } from 'react'
import CardCategoria from '../../../components/portal/card/card_categoria'
import Loading from '../../../components/portal/loading'
import styled from 'styled-components'
import { Col, Row } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getAll } from '../../../store/categoria/categoria.action'
import '../../../assets/css/style.css'
import BuscarCategoria from '../../../components/portal/busca/buscar_categoria'

const Inicio = () => {
  const dispatch = useDispatch()

  // estou pegando o estado categoria no index
  const categoria = useSelector((state) => state.categoria.all)
  const loading = useSelector(state => state.auth.loading)

  useEffect(() => {
    dispatch(getAll())
  }, [dispatch])

  const MapearCategoria = (categoria) => categoria.map((item, i) => (
    <Col className="cardsTelaInicial" md="6" xl="4" sm="12" xs="12" key={i}>
      <CardCategoria item={{ ...item, status: true }} />
    </Col>
  ))

  if (loading) {
    return <Loading />
  }

  return (
    <>
      <BuscarCategoria />
      <BoxCategorias>
        {!loading && categoria.length === 0 ? 'Não há categorias disponiveis' : MapearCategoria(categoria)}
      </BoxCategorias>

    </>
  )
}

export default Inicio

const BoxCategorias = styled(Row)`

`

// import React from 'react'
// import Button from '@material-ui/core/Button'
// import Card from '@material-ui/core/Card'
// import CardActions from '@material-ui/core/CardActions'
// import CardContent from '@material-ui/core/CardContent'
// import Grid from '@material-ui/core/Grid'
// import Typography from '@material-ui/core/Typography'
// import { makeStyles } from '@material-ui/core/styles'
// import Container from '@material-ui/core/Container'
// import Box from '@material-ui/core/Box'
// import { Link } from '@reach/router'
// import { FormControl, Select } from '@material-ui/core'
// import Rating from '@material-ui/lab/Rating'
// import { getAll as allFornecedores } from '~/store/fornecedor/action'
// import { getAll as allProdutos } from '~/store/produto/action'

// import ProdutoCard from '~/components/portal/produto_card'
// import { useDispatch, useSelector } from 'react-redux'

// const useStyles = makeStyles((theme) => ({
//   icon: {
//     marginRight: theme.spacing(2)
//   },
//   heroContent: {
//     backgroundColor: theme.palette.background.paper,
//     padding: theme.spacing(8, 0, 6)
//   },
//   heroButtons: {
//     marginTop: theme.spacing(4)
//   },
//   cardGrid: {
//     paddingTop: theme.spacing(8),
//     paddingBottom: theme.spacing(8)
//   }
// }))
// const cards = [1, 2, 3, 4, 5, 6, 7, 8]
// function Inicio() {
//   const classes = useStyles()
//   const dispatch = useDispatch()
//   const fornecedores = useSelector((state) => state.fornecedor.all)
//   const produtos = useSelector((state) => state.produto.all)
//   console.log('fornecedores', fornecedores)
//   console.log('produtos', produtos)

//   React.useEffect(() => {
//     dispatch(allFornecedores())
//     dispatch(allProdutos())
//   }, [dispatch])

//   return (
//     <main>
//       <Box p={6}>
//         <Container maxWidth="sm">
//           <Typography
//             component="h1"
//             variant="h2"
//             align="center"
//             color="textPrimary"
//             gutterBottom
//           >
//             Conheça nossos Produtos
//           </Typography>
//           <Typography
//             variant="h5"
//             align="center"
//             color="textSecondary"
//             paragraph
//           >
//             Something short and leading about the collection below—its contents,
//             the creator.
//           </Typography>
//           <div className={classes.heroButtons}>
//             <Grid container spacing={2} justify="center">
//               <Grid item>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   component={Link}
//                   to="fornecedor_novo"
//                 >
//                   Seja Um Fornecedor
//                 </Button>
//               </Grid>
//               <Grid item>
//                 <Button
//                   variant="outlined"
//                   color="primary"
//                   component={Link}
//                   to="cliente_novo"
//                 >
//                   Seja um Cliente
//                 </Button>
//               </Grid>
//             </Grid>
//           </div>
//         </Container>

//         <Container className={classes.cardGrid}>
//           <Box
//             display="flex"
//             borderBottom="thin solid #ccc"
//             marginBottom={2}
//             alignItems="center"
//           >
//             <Box flexGrow={1}>
//               <Typography variant="h6">Produtos</Typography>
//             </Box>
//             <Box
//               minWidth="300px"
//               paddingBottom={3}
//               display="flex"
//               justifyContent="center"
//               alignItems="center"
//             >
//               <FormControl
//                 variant="outlined"
//                 fullWidth
//                 size="small"
//                 margin="normal"
//               >
//                 <Select
//                   native
//                   inputProps={{
//                     name: 'uf',
//                     id: 'outlined-native-simple'
//                   }}
//                 >
//                   <option value="rj">Carros</option>
//                   <option value="sp">Games</option>
//                 </Select>
//               </FormControl>
//             </Box>
//           </Box>
//           <Grid container spacing={4}>
//             {cards.map((card) => (
//               <Grid item key={card} xs={12} sm={6} md={3}>
//                 <ProdutoCard data={card} />
//               </Grid>
//             ))}
//           </Grid>
//         </Container>

//         <Container className={classes.cardGrid}>
//           <Box
//             display="flex"
//             borderBottom="thin solid #ccc"
//             marginBottom={2}
//             alignItems="center"
//           >
//             <Box flexGrow={1}>
//               <Typography variant="h6">Fornecedores</Typography>
//             </Box>
//             <Box
//               minWidth="300px"
//               paddingBottom={3}
//               display="flex"
//               justifyContent="center"
//               alignItems="center"
//             >
//               <FormControl
//                 variant="outlined"
//                 fullWidth
//                 size="small"
//                 margin="normal"
//               >
//                 <Select
//                   native
//                   inputProps={{
//                     name: 'uf',
//                     id: 'outlined-native-simple'
//                   }}
//                 >
//                   <option value="rj">RJ</option>
//                   <option value="sp">SP</option>
//                 </Select>
//               </FormControl>
//               <FormControl
//                 variant="outlined"
//                 size="small"
//                 fullWidth
//                 margin="normal"
//                 style={{ marginLeft: '8px' }}
//               >
//                 <Select
//                   fullWidth
//                   native
//                   inputProps={{
//                     name: 'cidade',
//                     id: 'outlined-native-simple'
//                   }}
//                 >
//                   <option value="1">Cidade</option>
//                   <option value="2">Cidade 2</option>
//                 </Select>
//               </FormControl>
//             </Box>
//           </Box>
//           <Grid container spacing={4}>
//             {cards.map((card) => (
//               <Grid item key={card} xs={12} sm={6} md={3}>
//                 <Card className={classes.card}>
//                   <CardContent className={classes.cardContent}>
//                     <Typography gutterBottom variant="h5" component="h2">
//                       Heading
//                     </Typography>
//                     <Typography>
//                       This is a media card. You can use this section to describe
//                       the content.
//                     </Typography>
//                   </CardContent>
//                   <CardActions>
//                     <Rating name="pristine" value={2} readOnly />
//                   </CardActions>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </Box>
//     </main>
//   )
// }

// export default Inicio
