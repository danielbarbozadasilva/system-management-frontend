import React, { useEffect, useState } from 'react'
import * as moment from 'moment'
import { useSelector } from 'react-redux'
import { Col, Form, Spinner } from 'react-bootstrap'
import InputMask from 'react-input-mask'
import { Select } from '@material-ui/core'
import ufCityFile from '../../../../../util/state-city.json'
import {
  fieldValidate,
  isNotValid
} from '../../../../../util/validations/form-signup-client'
import {
  SFormSignup,
  STextForm,
  SButton,
  SContainer,
  SFormGroup
} from '../../styled'

const FormSignUpClient = ({ submit }) => {
  const loading = useSelector((state) => state.auth.loading)
  const [uf, setUf] = useState([])
  const [city, setCity] = useState([])
  const [formValidate, setFormValidate] = useState({})
  const [form, setForm] = useState({})

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
      firstName: form.firstName,
      lastName: form.lastName,
      phone: form.phone,
      birthDate: form.birthDate,
      uf: form.uf,
      city: form.city,
      email: form.email,
      password: form.password,
      auth: true
    }
    submit(nform)
  }

  return (
    <SFormSignup autoComplete="off">
      <STextForm>Cadastre-se</STextForm>
      <SContainer>
        <Col>
          <SFormGroup>
            <Form.Label>*Nome:</Form.Label>
            <Form.Control
              autoFocus
              disabled={loading}
              type="text"
              id="firstName"
              value={form.firstName || ''}
              onChange={handleChange}
              name="firstName"
              placeholder="Insira o seu nome"
              invalid={formValidate.firstName}
            />
            <Form.Control.Feedback type="text">
              {formValidate.firstName || ''}
            </Form.Control.Feedback>
          </SFormGroup>

          <SFormGroup>
            <Form.Label>*Sobrenome:</Form.Label>
            <Form.Control
              disabled={loading}
              type="text"
              id="lastName"
              value={form.lastName || ''}
              onChange={handleChange}
              name="lastName"
              placeholder="Insira o seu sobrenome"
              invalid={formValidate.lastName}
            />
            <Form.Control.Feedback type="text">
              {formValidate.lastName || ''}
            </Form.Control.Feedback>
          </SFormGroup>

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
              disabled={loading}
              invalid={formValidate.phone}
            />
            <Form.Control.Feedback type="text">
              {formValidate.phone || ''}
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
            <Form.Label>*Data de nascimento:</Form.Label>
            <Form.Control
              disabled={loading}
              type="date"
              id="birthDate"
              value={
                form.birthDate
                  ? moment(form.birthDate)
                      .format('YYYY/MM/DD')
                      .replaceAll('/', '-')
                  : ''
              }
              onChange={handleChange}
              name="birthDate"
              invalid={formValidate.birthDate}
            />
            <Form.Control.Feedback type="text">
              {formValidate.birthDate || ''}
            </Form.Control.Feedback>
          </SFormGroup>

          <SFormGroup>
            <Form.Label>*E-mail:</Form.Label>
            <Form.Control
              disabled={loading}
              type="email"
              id="email"
              value={form.email || ''}
              onChange={handleChange}
              name="email"
              placeholder="Insira seu email"
              invalid={formValidate.email}
            />
            <Form.Control.Feedback type="text">
              {formValidate.email || ''}
            </Form.Control.Feedback>
          </SFormGroup>

          <SFormGroup>
            <Form.Label>*Senha:</Form.Label>
            <Form.Control
              disabled={loading}
              type="password"
              id="password"
              value={form.password || ''}
              onChange={handleChange}
              name="password"
              placeholder="Insira a sua senha"
              invalid={formValidate.password}
            />
            <Form.Control.Feedback type="text">
              {formValidate.password || ''}
            </Form.Control.Feedback>
          </SFormGroup>

          <SFormGroup>
            <Form.Label>*Confirmar senha:</Form.Label>
            <Form.Control
              disabled={loading}
              type="password"
              id="confirmPassword"
              value={form.confirmPassword || ''}
              onChange={handleChange}
              name="confirmPassword"
              placeholder="Confirme a sua senha"
              invalid={formValidate.confirmPassword}
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

export default FormSignUpClient
