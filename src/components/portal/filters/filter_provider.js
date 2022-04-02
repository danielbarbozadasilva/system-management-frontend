import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Select } from '@material-ui/core'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { getAllProviders } from '../../../store/provider/provider.action'

const Order = (props) => {
  const dispatch = useDispatch()

  const [order, setOrder] = useState([])

  const handleChange = async (props) => {
    const { value } = props.target
    setOrder(value)
    dispatch(getAllProviders(value))
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
          <option value='alphabetical'>Alfabética</option>
        </Select>
      </Box>
    </Box>
  )
}
export default Order
