import React from 'react'
import { Pie } from 'react-chartjs-2'
import 'chart.js/auto'
import { useSelector } from 'react-redux'
import { ContainerChart } from './styled'
import Title from '~/components/title/index'

export const Chart = () => {
  const provider = useSelector((state) => state.provider.all)
  const categories = useSelector((state) => state.category.all)
  const products = useSelector((state) => state.product.all)

  const data = {
    labels: ['Fornecedor', 'Categorias', 'Produtos'],
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

  const actions = () => null

  return (
    <>
      <Title title="Dashboard" actions={actions} />
      <ContainerChart>
        <Pie
          data={data}
          height={350}
          width={550}
          options={{
            maintainAspectRatio: false,
            legend: {
              labels: {
                fontSize: 25
              }
            }
          }}
        />
      </ContainerChart>
    </>
  )
}

export default Chart
