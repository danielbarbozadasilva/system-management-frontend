import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Label } from 'reactstrap'
import { Select } from '@material-ui/core'
import UFCity from '../../../util/state-city.json'
import { getListProviderUfCity, getAllProviders } from '../../../store/provider/provider.action'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const Buscar = () => {
  const dispatch = useDispatch()

  const error = useSelector((state) => state.auth.error)
  const registered = useSelector((state) => state.auth.registered)
  const loading = useSelector((state) => state.auth.loading)
  const [uf, setUf] = useState(
    UFCity.states.map(({ name, uf }) => ({
      name,
      uf
    }))
  )
  const [city, setCity] = useState([])
  const [order, setOrder] = useState([])
  const [form, setForm] = useState({})

  const handleChange = async (props) => {
    const { value, name } = props.target
    if (value == 'x' && name == 'uf') {
      dispatch(await getListProviderUfCity(form))
    }
    form[name] = value
    setForm({ ...form }, form)
    if (name == 'city' || name == 'uf') {
      dispatch(await getListProviderUfCity(form))
    } else {
      dispatch(await getAllProviders(value))
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
      <Box>
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
            name: 'uf',
            id: 'outlined-native-simple'
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
            name: 'city',
            id: 'outlined-native-simple'
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

      <Box>
        <Typography>Ordenar</Typography>
        <Select
          className='portalProviderText'
          native
          value={form.order || 'x'}
          onChange={handleChange}
          inputProps={{
            name: 'order',
            id: 'outlined-native-simple'
          }}
        >
          <option value='x'>selecione</option>
          <option value='like'>Ordem de Curtidas</option>
          <option value='alphabetical'>Ordem Alfabética</option>
        </Select>
      </Box>
    </Box>
  )
}
export default Buscar
