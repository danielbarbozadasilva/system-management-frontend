import React from 'react'
import { Pie } from 'react-chartjs-2'
import { useDispatch, useSelector } from 'react-redux'
import { Grid } from '@material-ui/core'
import Title from '~/components/title/index'

import { getAllProducts } from '~/store/product/product.action'
import { getAllCategories } from '~/store/category/category.action'
import { getAllProviders } from '~/store/provider/provider.action'
import { getAllClients } from '~/store/client/client.action'

function home() {
  const dispatch = useDispatch()

  const provider = useSelector((state) => state.provider.all)
  const categories = useSelector((state) => state.category.all)
  const client = useSelector((state) => state.client.all)
  const products = useSelector((state) => state.produto.all)

  React.useEffect(() => {
    dispatch(getAllProducts())
    dispatch(getAllCategories())
    dispatch(getAllProviders())
    dispatch(getAllClients())
  }, [dispatch])

  const actions = () => null

  const data = {
    labels: ['provider', 'categories', 'products'],
    datasets: [
      {
        label: '# of Votes',
        data: [provider?.length, categories?.length, products?.length],
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

export default home
