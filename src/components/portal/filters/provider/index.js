import React from 'react'
import { useDispatch } from 'react-redux'
import { Select } from '@material-ui/core'
import { getAllProviders } from '../../../../store/provider/provider.action'
import { SBox, STitle, SContainer } from './styled'

const Order = (props) => {
  const dispatch = useDispatch()

  const handleChange = async (props) => {
    const { value } = props.target
    dispatch(getAllProviders(value))
  }

  return (
    <SBox>
      <STitle>Ordenar</STitle>
      <SContainer>
        <Select native defaultValue={'fantasyName'} onChange={handleChange}>
          <option value="fantasyName">selecione</option>
          <option value="likes">Curtidas</option>
          <option value="fantasyName">Alfabética</option>
          <option value="clients">Mais popular</option>
        </Select>
      </SContainer>
    </SBox>
  )
}
export default Order
