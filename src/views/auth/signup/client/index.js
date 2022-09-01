import React, { useEffect, useState } from 'react'
import * as moment from 'moment'
import { createClient } from '../../../../store/client/client.action'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Form } from 'react-bootstrap'
import InputMask from 'react-input-mask'
import { Select } from '@material-ui/core'
import ufCityFile from '../../../../util/state-city.json'
import {
  SFormSignup,
  STextForm,
  SButton,
  SDesabledButton,
  SContainer,
  SFormGroup
} from '../../styled'
import Loading from '../../../../components/loading'

const SignUpClient = () => {
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.auth.loading)

  const [uf, setUf] = useState([])
  const [city, setCity] = useState([])
  const [formValidate, setFormValidate] = useState({})
  const [form, setForm] = useState({})

  const handleChange = (props) => {
    const { value, name } = props.target
    setForm({
      ...form,
      [name]: value
    })
    fieldValidate(name, value)
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

  const fieldValidate = (name, value) => {
    let message = ''
    let regex = ''
    switch (name) {
      case 'firstName':
        regex = /\d/g
        if (regex.test(value)) {
          message += 'Não pode conter números!'
        } else if (value.trim() === '') {
          message += 'Não pode ser vazio!'
        } else if (value.length <= 3) {
          message += 'Acima de 3 caracteres!'
        }
        break

      case 'lastName':
        regex = /\d/g
        if (regex.test(value)) {
          message += 'Não pode conter números!'
        } else if (value.trim() === '') {
          message += 'Não pode ser vazio!'
        } else if (value.length <= 4) {
          message += 'Acima de 4 caracteres!'
        }
        break

      case 'phone':
        let phone = value.trim().replaceAll('-', '').replaceAll('_', '')

        regex =
          /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/

        if (!regex.test(phone)) {
          message += 'Número de telefone inválido!'
        }
        break

      case 'birthDate':
        var datanasc = value.replaceAll('-', '/')
        var dataAtual = moment().format('YYYY/MM/DD')

        if (!moment(datanasc).isValid) {
          message += 'Data inválida!'
        } else if (moment(datanasc).isAfter(dataAtual)) {
          message += 'Data maior que a atual!'
        } else if (moment().diff(moment(datanasc), 'years') < 18) {
          message += 'O usuário precisa ter no mínimo 18 anos!'
        }
        break

      case 'uf':
        if (value === 'selecione') {
          message += 'Selecione uma uf!'
        }
        break

      case 'city':
        if (value === 'selecione') {
          message += 'Selecione uma cidade!'
        }
        break

      case 'email':
        regex =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if (!regex.test(value)) {
          message += 'E-mail inválido!'
        } else if (value.trim() === '') {
          message += 'Campo em branco!'
        }
        break

      case 'password':
        if (value.length < 6) {
          message += 'Acima de 6 caracteres!'
        }
        break

      case 'confirmPassword':
        if (value?.length !== form.password?.length) {
          message += 'Senhas não conferem!'
        } else if (form.password !== value) {
          message += 'Senhas não conferem!'
        }
        break
    }

    setFormValidate({ ...formValidate, [name]: message })
  }

  const isNotValid = () => {
    const inputs = [
      'firstName',
      'lastName',
      'phone',
      'birthDate',
      'uf',
      'city',
      'email',
      'password',
      'confirmPassword'
    ]
    const invalid = (label) =>
      !Object.keys(form).includes(label) || form[label].length === 0

    const validations =
      Object.values(formValidate).filter((item) => item !== '').length > 0

    return inputs.some((item) => invalid(item)) || validations
  }

  const insertData = () => {
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
    dispatch(createClient(nform))
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
              invalid={formValidate.firstName}
              disabled={loading}
              type="text"
              id="firstName"
              value={form.firstName || ''}
              onChange={handleChange}
              name="firstName"
              placeholder="Insira o seu nome"
            />
            <Form.Control.Feedback type="text">
              {formValidate.firstName || ''}
            </Form.Control.Feedback>
          </SFormGroup>

          <SFormGroup>
            <Form.Label>*Sobrenome:</Form.Label>
            <Form.Control
              invalid={formValidate.lastName}
              disabled={loading}
              type="text"
              id="lastName"
              value={form.lastName || ''}
              onChange={handleChange}
              name="lastName"
              placeholder="Insira o seu sobrenome"
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
              invalid={formValidate.phone}
              disabled={loading}
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
              invalid={formValidate.birthDate}
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
            />
            <Form.Control.Feedback type="text">
              {formValidate.birthDate || ''}
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
              placeholder="Insira seu email"
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

          {isNotValid() || loading ? (
            <SFormGroup>
              <SDesabledButton type="button" disabled={isNotValid()}>
                Cadastrar
              </SDesabledButton>
            </SFormGroup>
          ) : (
            <SFormGroup>
              {loading ? (
                <>
                  <Loading />
                </>
              ) : (
                <SButton
                  type="button"
                  disabled={isNotValid()}
                  onClick={insertData}
                >
                  Cadastrar
                </SButton>
              )}
            </SFormGroup>
          )}
        </Col>
      </SContainer>
    </SFormSignup>
  )
}

export default SignUpClient
