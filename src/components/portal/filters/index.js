import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Label } from 'reactstrap'
import { Select } from '@material-ui/core'
import UFCity from '../../../util/state-city.json'
import { getListProviderUfCity } from '../../../store/provider/provider.action'

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
  const [form, setForm] = useState({})

  const handleChange = async (props) => {
    const { value, name } = props.target
    if (value == 'x' && name == 'uf') {
      dispatch(await getListProviderUfCity(form))
    }
    form[name] = value
    setForm({ ...form }, form)
    dispatch(await getListProviderUfCity(form))
  }

  useEffect(() => {
    const result = UFCity.states.find((item) => item.uf == form.uf)
    if (result) {
      setCity(result.city)
    }
  }, [form.uf])

  return (
    <div className='dataSearchProvider'>
      <h4>
        <strong>Filtrar</strong>
      </h4>
      <Label htmlFor='uf' className='dataProvider'>
        UF:
      </Label>
      <Select
        className='dataProvider'
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

      <Label htmlFor='uf' className='dataProvider'>
        city:
      </Label>

      <Select
        className='dataProvider'
        native
        value={form.city || 'x'}
        onChange={handleChange}
        style={{ marginLeft: '8px' }}
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
    </div>
  )
}
export default Buscar
