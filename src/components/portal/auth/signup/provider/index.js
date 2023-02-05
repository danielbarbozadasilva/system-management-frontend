import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Col, Form, Spinner } from 'react-bootstrap'
import { Select } from '@material-ui/core'
import ufCityFile from '../../../../../util/state-city.json'
import InputMask from 'react-input-mask'
import {
  fieldValidate,
  isNotValid
} from '../../../../../util/validations/form-signup-provider'
import {
  SFormSignup,
  STextForm,
  SButton,
  SContainer,
  SFormGroup
} from '../../styled'

const FormSignUpProvider = ({ submit }) => {
  const [uf, setUf] = useState([])
  const [city, setCity] = useState([])
  const [formValidate, setFormValidate] = useState({})
  const [form, setForm] = useState({})
  const loading = useSelector((state) => state.auth.loading)

  const handleChange = (props) => {
    const { value, name } = props.target
    const message = fieldValidate(name, value, form)
    setFormValidate({ ...formValidate, [name]: message })
    setForm({
      ...form,
      [name]: value
    })
  }

  useEffect(() => {
    const localization = ufCityFile.states.map(({ name, uf }) => ({ name, uf }))
    setUf(localization)
  }, [])

  useEffect(() => {
    const result = ufCityFile.states.find((item) => item.uf === form.uf)
    if (result) {
      setCity(result.city)
    }
  }, [form.uf])

  const submitForm = () => {
    const nform = {
      socialName: form.socialName,
      fantasyName: form.fantasyName,
      cnpj: form.cnpj,
      responsible: form.responsible,
      phone: form.phone,
      address: form.address,
      uf: form.uf,
      city: form.city,
      email: form.email,
      password: form.password
    }
    submit(nform)
  }

  return (
    <SFormSignup autoComplete="off">
      <STextForm>Cadastre-se</STextForm>
      <SContainer>
        <Col>
          <SFormGroup>
            <Form.Label>*Nome social:</Form.Label>
            <Form.Control
              autoFocus
              invalid={formValidate.socialName}
              disabled={loading}
              type="text"
              id="socialName"
              value={form.socialName || ''}
              onChange={handleChange}
              name="socialName"
              placeholder="Insira o nome social"
            />
            <Form.Control.Feedback type="text">
              {formValidate.socialName || ''}
            </Form.Control.Feedback>
          </SFormGroup>

          <SFormGroup>
            <Form.Label>*Nome fantasia:</Form.Label>
            <Form.Control
              invalid={formValidate.fantasyName}
              disabled={loading}
              type="text"
              id="fantasyName"
              value={form.fantasyName || ''}
              onChange={handleChange}
              name="fantasyName"
              placeholder="Insira o nome fantasia"
            />
            <Form.Control.Feedback type="text">
              {formValidate.fantasyName || ''}
            </Form.Control.Feedback>
          </SFormGroup>

          <SFormGroup>
            <Form.Label>*Cnpj:</Form.Label>
            <InputMask
              mask="99.999.999/9999-99"
              className="form-control"
              type="text"
              id="cnpj"
              onChange={handleChange}
              name="cnpj"
              value={form.cnpj || ''}
              placeholder="Informe o seu cnpj"
              invalid={formValidate.cnpj}
              disabled={loading}
            />
            <Form.Control.Feedback type="text">
              {formValidate.cnpj || ''}
            </Form.Control.Feedback>
          </SFormGroup>

          <SFormGroup>
            <Form.Label>*Responsável:</Form.Label>
            <Form.Control
              invalid={formValidate.responsible}
              disabled={loading}
              type="text"
              id="responsible"
              value={form.responsible || ''}
              onChange={handleChange}
              name="responsible"
              placeholder="Insira o name do responsável"
            />
            <Form.Control.Feedback type="text">
              {formValidate.responsible || ''}
            </Form.Control.Feedback>
          </SFormGroup>

          <SFormGroup>
            <Form.Label>*Uf:</Form.Label>
            <Select
              fullWidth
              native
              value={form.uf || ''}
              onChange={handleChange}
              inputProps={{
                name: 'uf',
                id: 'outlined-native-simple'
              }}
            >
              <option value="selecione">selecione</option>
              {uf?.map(({ name, uf }, i) => (
                <option key={i} value={uf}>
                  {uf}
                </option>
              ))}
            </Select>
            <Form.Control.Feedback type="text">
              {formValidate.uf || ''}
            </Form.Control.Feedback>
          </SFormGroup>

          <SFormGroup>
            <Form.Label>*Cidade:</Form.Label>
            <Select
              fullWidth
              native
              value={form.city || ''}
              onChange={handleChange}
              inputProps={{
                name: 'city',
                id: 'outlined-native-simple'
              }}
            >
              <option value="selecione">selecione</option>
              {city?.map((city, i) => (
                <option key={i} value={city}>
                  {city}
                </option>
              ))}
            </Select>
            <Form.Control.Feedback type="text">
              {formValidate.city || ''}
            </Form.Control.Feedback>
          </SFormGroup>
        </Col>

        <Col>
          <SFormGroup>
            <Form.Label>*Telefone:</Form.Label>
            <InputMask
              mask="(99)9999-9999"
              className="form-control"
              type="text"
              id="phone"
              onChange={handleChange}
              name="phone"
              value={form.phone || ''}
              placeholder="Informe o seu telefone"
              invalid={formValidate.phone}
              disabled={loading}
            />
            <Form.Control.Feedback type="text">
              {formValidate.phone || ''}
            </Form.Control.Feedback>
          </SFormGroup>
          <SFormGroup>
            <Form.Label>*Endereço:</Form.Label>
            <Form.Control
              invalid={formValidate.address}
              disabled={loading}
              type="text"
              id="address"
              value={form.address || ''}
              onChange={handleChange}
              name="address"
              placeholder="Informe o seu endereço"
            />
            <Form.Control.Feedback type="text">
              {formValidate.address || ''}
            </Form.Control.Feedback>
          </SFormGroup>
          <SFormGroup>
            <Form.Label>*E-mail:</Form.Label>
            <Form.Control
              invalid={formValidate.email}
              disabled={loading}
              type="email"
              id="email"
              value={form.email || ''}
              onChange={handleChange}
              name="email"
              placeholder="Insira o seu email"
            />
            <Form.Control.Feedback type="text">
              {formValidate.email || ''}
            </Form.Control.Feedback>
          </SFormGroup>
          <SFormGroup>
            <Form.Label>*Senha:</Form.Label>
            <Form.Control
              invalid={formValidate.password}
              disabled={loading}
              type="password"
              id="password"
              value={form.password || ''}
              onChange={handleChange}
              name="password"
              placeholder="Insira a sua senha"
            />
            <Form.Control.Feedback type="text">
              {formValidate.password || ''}
            </Form.Control.Feedback>
          </SFormGroup>
          <SFormGroup>
            <Form.Label>*Confirmar senha:</Form.Label>
            <Form.Control
              invalid={formValidate.confirmPassword}
              disabled={loading}
              type="password"
              id="confirmPassword"
              value={form.confirmPassword || ''}
              onChange={handleChange}
              name="confirmPassword"
              placeholder="Confirme a sua senha"
            />
            <Form.Control.Feedback type="text">
              {formValidate.confirmPassword || ''}
            </Form.Control.Feedback>
          </SFormGroup>
          <SFormGroup>
            {loading ? (
              <>
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Carregando...</span>
                </Spinner>
              </>
            ) : (
              <SButton
                type="button"
                disabled={isNotValid(form, formValidate)}
                onClick={submitForm}
              >
                Cadastrar
              </SButton>
            )}
          </SFormGroup>
        </Col>
      </SContainer>
    </SFormSignup>
  )
}

export default FormSignUpProvider
