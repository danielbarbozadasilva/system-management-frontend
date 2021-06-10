import React from 'react'
import { Pie } from 'react-chartjs-2'
import { useSelector } from 'react-redux'
import { Grid } from '@material-ui/core'
import Title from '~/components/title'

function Inicio() {
  const fornecedores = useSelector((state) => state.fornecedor.all)

  const actions = () => null

  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
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
        {/* <Grid item xs={6}>
        <Paper>
          <Grid container>
            <Grid item>

            </Grid>
          </Grid>
        </Paper>
      </Grid> */}
      </Grid>
    </>
  )
}

export default Inicio
