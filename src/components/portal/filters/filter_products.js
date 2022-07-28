import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { getAllProductsWithFilter } from '../../../store/product/product.action'
import { Select } from '@material-ui/core'

const FilterProduct = () => {
  const dispatch = useDispatch()
  const [order, setOrder] = useState([])

  const handleChange = async (props) => {
    const { value } = props.target
    setOrder(value)
    dispatch(getAllProductsWithFilter(value, null))
  }

  return (
    <Box sx={{ pl: 5 }}>
      <Box sx={{ pt: 2, pl: 5 }}>
        <Typography sx={{ pb: 1 }}>Ordenar</Typography>
        <Select
          native
          defaultValue={'x'}
          onChange={handleChange}
          inputProps={{
            name: 'order',
            id: 'outlined-native-simple'
          }}
        >
          <option value="x">selecione</option>
          <option value="like">Curtidas</option>
          <option value="price">Valor</option>
          <option value="description">Descrição</option>
        </Select>
      </Box>
    </Box>
  )
}
export default FilterProduct
