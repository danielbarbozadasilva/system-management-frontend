import React from 'react'
import { useDispatch } from 'react-redux'
import { Chart } from '../../../components/chart/index'
import { getAllProducts } from '~/store/product/product.action'
import { getAllCategories } from '~/store/category/category.action'
import { getAllProviders } from '~/store/provider/provider.action'

function Home() {
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(getAllProducts())
    dispatch(getAllCategories())
    dispatch(getAllProviders())
  }, [dispatch])

  return (
    <>
      <Chart />
    </>
  )
}

export default Home
