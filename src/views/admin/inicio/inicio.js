import React from 'react'
import { Pie } from 'react-chartjs-2'
import { useDispatch, useSelector } from 'react-redux'
import { Grid } from '@material-ui/core'
import Title from '~/components/title/index'

import { getAll } from '~/store/produto/produto.action'
import { getAll as getCategorias } from '~/store/categoria/categoria.action'
import { getAll as getFornecedores } from '~/store/fornecedor/fornecedor.action'

function Inicio() {
  const dispatch = useDispatch()

  const fornecedores = useSelector((state) => state.fornecedor.all)
  const categorias = useSelector((state) => state.produto.all)
  const produtos = useSelector((state) => state.categoria.all)

  React.useEffect(() => {
    dispatch(getFornecedores())
    dispatch(getCategorias())
    dispatch(getAll())
  }, [dispatch])

  const actions = () => null

  const data = {
    labels: ['Fornecedores', 'Categorias', 'Produtos'],
    datasets: [
      {
        label: '# of Votes',
        data: [fornecedores.length, categorias.length, produtos.length],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1
      }
    ]
  }

  return (
    <>
      <Title title="Produto" actions={actions} />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Grid container>
            <Grid item>
              <Pie data={data} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default Inicio
