import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Label } from 'reactstrap'
import { Select } from '@material-ui/core'
import UFCity from '../../../util/estados-cidades.json'
import { getListProviderUfCity } from '../../../store/fornecedor/fornecedor.action'

const Buscar = () => {
  const dispatch = useDispatch()
  const error = useSelector((state) => state.auth.error)
  const registered = useSelector((state) => state.auth.registered)
  const loading = useSelector((state) => state.auth.loading)
  const [uf, setUf] = useState(
    UFCity.estados.map(({ nome, sigla }) => ({
      nome,
      sigla
    }))
  )
  const [city, setCity] = useState([])
  const [form, setForm] = useState({})

  const handleChange = async (props) => {
    const { value, name } = props.target
    if (value === 'x' && name === 'uf') {
      dispatch(await getListProviderUfCity(form))
    }
    form[name] = value
    setForm({ ...form }, form)
    dispatch(await getListProviderUfCity(form))
  }

  useEffect(() => {
    const result = UFCity.estados.find((item) => item.sigla === form.uf)
    if (result) {
      setCity(result.city)
    }
  }, [form.uf])

  return (
    <div className="dadosPesquisaFornec">
      <h4>
        <strong>Filtrar</strong>
      </h4>
      <Label htmlFor="uf" className="dadosFornecedor">
        UF:
      </Label>
      <Select
        className="dadosFornecedor"
        native
        value={form.uf || ''}
        onChange={handleChange}
        inputProps={{
          name: 'uf',
          id: 'outlined-native-simple'
        }}
      >
        <option value="x">selecione</option>
        {uf?.map(({ nome, sigla }, i) => (
          <option key={i} value={sigla}>
            {sigla}
          </option>
        ))}
      </Select>

      <Label htmlFor="uf" className="dadosFornecedor">
        cidade:
      </Label>

      <Select
        className="dadosFornecedor"
        native
        value={form.city || 'x'}
        onChange={handleChange}
        style={{ marginLeft: '8px' }}
        inputProps={{
          name: 'city',
          id: 'outlined-native-simple'
        }}
      >
        <option value="x">selecione</option>

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
