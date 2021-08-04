import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FormGroup, Label } from 'reactstrap'
import { Select } from '@material-ui/core'
import UFCidade from '../../../util/estados-cidades.json'
import { getFornPesquisarUfCidade } from '../../../store/fornecedor/fornecedor.action'

const Buscar = () => {
  const dispatch = useDispatch()

  const [hasError, setHasError] = useState(false)
  const [success, setSuccess] = useState(false)
  const error = useSelector((state) => state.auth.error)
  const registered = useSelector((state) => state.auth.registered)
  const loading = useSelector((state) => state.auth.loading)
  const [uf, setuf] = useState([])
  const [cidades, setcidade] = useState([])
  const [formValidate, setFormValidate] = useState({})
  const [form, setForm] = useState({})
  const [desableInit, setDesableInit] = useState(true)

  const handleChange = (props) => {
    setDesableInit(false)

    const { value, name } = props.target

    setForm({
      ...form,
      [name]: value
    })
    dispatch(getFornPesquisarUfCidade(form))
  }

  useEffect(() => {
    const estados = UFCidade.estados.map(({ nome, sigla }) => ({
      nome,
      sigla
    }))
    setuf(estados)
  }, [])

  useEffect(() => {
    const result = UFCidade.estados.find((item) => item.sigla === form.uf)
    if (result) {
      setcidade(result.cidades)
    }
  }, [form.uf])

  return (
    <div className="dadosPesquisaFornec">
      <h4><strong>Filtrar</strong></h4>
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
        <option value="">selecione</option>
        {uf?.map(({ nome, sigla }, i) => (
          <option key={i} value={sigla}>
            {sigla}
          </option>
        ))}
      </Select>

      <Label htmlFor="uf" className="dadosFornecedor">
        CIDADE:
      </Label>

      <Select
        className="dadosFornecedor"
        native
        value={form.cidade || ''}
        onChange={handleChange}
        style={{ marginLeft: '8px' }}
        inputProps={{
          name: 'cidade',
          id: 'outlined-native-simple'
        }}
      >
        <option value="">selecione</option>

        {cidades?.map((cidade, i) => (
          <option key={i} value={cidade}>
            {cidade}
          </option>
        ))}
      </Select>
    </div>
  )
}
export default Buscar
