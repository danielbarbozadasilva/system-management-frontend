import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Select } from '@material-ui/core'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { getAllProductsWithFilter } from '../../../store/product/product.action'

const FilterProduct = () => {
  const dispatch = useDispatch()
  const [order, setOrder] = useState([])

  const handleChange = async (props) => {
    const { value } = props.target
    setOrder(value)
    dispatch(getAllProductsWithFilter(value, null))
  }

  return (
    <Box sx={{ pb: 10 }} className='dataSearchProvider'>
      <Box sx={{ pb: 1 }}>
        <Typography>Ordenar</Typography>
        <Select
          className='portalProviderTextStyle'
          native
          value={order}
          onChange={handleChange}
          inputProps={{
            name: 'order'
          }}
        >
          <option value='x'>selecione</option>
          <option value='like'>Curtidas</option>
          <option value='price'>Valor</option>
          <option value='description'>Descrição</option>
        </Select>
      </Box>
    </Box>
  )
}
export default FilterProduct
