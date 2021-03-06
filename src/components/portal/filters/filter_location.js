import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Label } from 'reactstrap'
import { Select } from '@material-ui/core'
import UFCity from '../../../util/state-city.json'
import { getListProviderUfCity } from '../../../store/provider/provider.action'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const FilterLocation = () => {
  const dispatch = useDispatch()

  const [uf, setUf] = useState(
    UFCity.states.map(({ name, uf }) => ({
      name,
      uf
    }))
  )
  const [city, setCity] = useState([])
  const [form, setForm] = useState({})

  const handleChange = async (props) => {
    const { value, name } = props.target
    console.log(value, name)
    if (value == 'x' && name == 'uf') {
      dispatch(await getListProviderUfCity(value))
    }
    form[name] = value
    setForm({ ...form }, form)
    if (name == 'city' || name == 'uf') {
      dispatch(await getListProviderUfCity(form))
    }
  }

  useEffect(() => {
    const result = UFCity.states.find((item) => item.uf == form.uf)
    if (result) {
      setCity(result.city)
    }
  }, [form.uf])

  return (
    <Box sx={{ pb: 10 }} className='dataSearchProvider'>
      <Typography>Filtrar</Typography>
      <Label htmlFor='uf'>
        UF:
      </Label>
      <Select
        className='portalProviderText'
        native
        value={form.uf || ''}
        onChange={handleChange}
        inputProps={{
          name: 'uf'
        }}
      >
        <option value='x'>selecione</option>
        {uf?.map(({ name, uf }, i) => (
          <option key={i} value={uf}>
            {uf}
          </option>
        ))}
      </Select>

      <Label htmlFor='uf' className='portalProviderText'>
        Cidade:
      </Label>

      <Select
        className='portalProviderText'
        native
        value={form.city || 'x'}
        onChange={handleChange}
        inputProps={{
          name: 'city'
        }}
      >
        <option value='x'>selecione</option>
        {city?.map((city, i) => (
          <option key={i} value={city}>
            {city}
          </option>
        ))}
      </Select>
    </Box>
  )
}
export default FilterLocation
