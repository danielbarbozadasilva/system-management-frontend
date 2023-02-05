import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getAllProductsWithFilter } from '../../../../store/product/product.action'
import { Select } from '@material-ui/core'
import { SBox, STitle } from './styled'

const FilterProduct = () => {
  const dispatch = useDispatch()

  const handleChange = async (props) => {
    const { value } = props.target
    dispatch(getAllProductsWithFilter(value))
  }

  return (
    <SBox>
      <STitle>Ordenar</STitle>
      <div>
        <Select
          native
          defaultValue={'description'}
          onChange={handleChange}
        >
          <option value="description">selecione</option>
          <option value="count">Curtidas</option>
          <option value="price">Valor</option>
          <option value="description">Descrição</option>
        </Select>
      </div>
    </SBox>
  )
}
export default FilterProduct
