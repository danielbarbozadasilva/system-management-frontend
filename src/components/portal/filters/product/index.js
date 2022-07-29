import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getAllProductsWithFilter } from '../../../../store/product/product.action'
import { Select } from '@material-ui/core'
import { SBox, STitle } from './styled'

const FilterProduct = () => {
  const dispatch = useDispatch()
  const [order, setOrder] = useState([])

  const handleChange = async (props) => {
    const { value } = props.target
    setOrder(value)
    dispatch(getAllProductsWithFilter(value, null))
  }

  return (
    <SBox>
      <STitle>Ordenar</STitle>
      <div>
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
      </div>
    </SBox>
  )
}
export default FilterProduct
