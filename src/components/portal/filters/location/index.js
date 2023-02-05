import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Select } from '@material-ui/core'
import UFCity from '../../../../util/state-city.json'
import { getListProviderUfCity } from '../../../../store/provider/provider.action'
import { SBox, STitle, SLabel, SButton } from './styled'

const FilterLocation = () => {
  const dispatch = useDispatch()

  const [uf, setUf] = useState(
    UFCity.states.map(({ name, uf }) => ({
      name,
      uf
    }))
  )
  const [city, setCity] = useState([])
  const [form, setForm] = useState({
    uf: '',
    city: ''
  })

  const handleChange = async (props) => {
    const { value, name } = props.target

    form[name] = value
    setForm({ ...form }, form)
  }

  useEffect(() => {
    const result = UFCity.states.find((item) => item.uf == form.uf)
    if (result) {
      setCity(result.city)
    } else {
      setCity([])
    }
  }, [form.uf])

  const submitForm = () => {
    dispatch(getListProviderUfCity(form.uf, form.city))
  }

  const isNotValid = () => {
    return form.uf?.length === 0 || form.city?.length === 0
  }

  return (
    <SBox>
      <STitle>Filtrar</STitle>
      <SLabel htmlFor="uf">UF:</SLabel>
      <Select
        native
        value={form.uf || ''}
        onChange={handleChange}
        inputProps={{
          name: 'uf'
        }}
      >
        <option value="">selecione</option>
        {uf?.map(({ name, uf }, i) => (
          <option key={i} value={uf}>
            {uf}
          </option>
        ))}
      </Select>
      <SLabel htmlFor="uf">Cidade:</SLabel>
      <Select
        native
        value={form.city || ''}
        onChange={handleChange}
        inputProps={{
          name: 'city'
        }}
      >
        <option value="">selecione</option>
        {city?.map((city, i) => (
          <option key={i} value={city}>
            {city}
          </option>
        ))}
      </Select>

      <SButton type="button" disabled={isNotValid()} onClick={submitForm}>
        Buscar
      </SButton>
    </SBox>
  )
}
export default FilterLocation
