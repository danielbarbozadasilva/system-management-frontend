import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Select } from '@material-ui/core'
import { getAllProviders } from '../../../../store/provider/provider.action'
import { SBox, STitle, SContainer } from './styled'

const Order = (props) => {
  const dispatch = useDispatch()

  const [order, setOrder] = useState([])

  const handleChange = async (props) => {
    const { value } = props.target
    setOrder(value)
    dispatch(getAllProviders(value))
  }

  return (
    <SBox>
      <STitle>Ordenar</STitle>
      <SContainer>
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
          <option value="alphabetical">Alfabética</option>
        </Select>
      </SContainer>
    </SBox>
  )
}
export default Order
