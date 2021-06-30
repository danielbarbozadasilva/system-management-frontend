import React , { useState } from 'react'
import {
  FormGroup,
  Label,
  Input,
  Alert,
  Button,
  Spinner,
  FormFeedback,
  Row,
  Container,
  Col,
  Form
} from 'reactstrap'
import { FormControl, Select } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import UfCidade from '~/util/estados-cidades.json'
import './style.css'

const FiltrarFornecedor = () => {
  const [form, setForm] = useState({})
  const dispatch = useDispatch()
    const [uf, setuf] = useState([])
  const [cidades, setcidade] = useState([])
  const handleChange = (props) => {
    const { value, name } = props.target
    setForm({
      ...form,
      [name]: value
    })
  }
  return (
    <div>
       <FormGroup>
          <Label for="fornecedor">Buscar fornecedor</Label>
          <Input
            className="form-intro"
            type="text"
            name="fornecedor"
            id="fornecedor"
            placeholder="digite o nome do fornecedor"
          />
        </FormGroup>
      <Label htmlFor="uf" className="label">
        uf:
      </Label>
      <Select
        native
        value={form.uf || ''}
        onChange={handleChange}
        inputProps={{
          name: 'uf',
          id: 'outlined-native-simple'
        }}
      >
        <option value="">uf</option>
        {uf?.map(({ nome, sigla }, i) => (
          <option key={i} value={sigla}>
            {sigla}
          </option>
        ))}
      </Select>

      <Select
                className="form-intro"

        fullWidth
        native
        value={form.cidade || ''}
        onChange={handleChange}
        inputProps={{
          name: 'cidade',
          id: 'outlined-native-simple'
        }}
      >
        <option value="">cidade</option>

        {cidades?.map((cidade, i) => (
          <option key={i} value={cidade}>
            {cidade}
          </option>
        ))}
      </Select>
    </div>
  )
}
export default FiltrarFornecedor
