import React, { useEffect, useState } from 'react'
import { createProvider } from '../../../../store/provider/provider.action'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Form } from 'react-bootstrap'
import InputMask from 'react-input-mask'
import { Select } from '@material-ui/core'
import ufCityFile from '../../../../util/state-city.json'
import {
  SForm,
  STextForm,
  SButton,
  SDesabledButton,
  SContainer,
  SFormGroup
} from '../../styled'
import Loading from '../../../../components/loading'

const SignUpProvider = () => {
  const dispatch = useDispatch()

  const [hasError, setHasError] = useState(false)
  const [success, setSuccess] = useState(false)
  const error = useSelector((state) => state.auth.error)
  const registered = useSelector((state) => state.auth.registered)
  const loading = useSelector((state) => state.auth.loading)
  const [uf, setUf] = useState([])
  const [city, setCity] = useState([])
  const [formValidate, setFormValidate] = useState({})
  const [form, setForm] = useState({})
  const [disableInit, setDisableInit] = useState(true)

  const handleChange = (props) => {
    setDisableInit(false)
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
      case 'socialName':
        regex = /\d/g
        if (regex.test(value)) {
          message += 'Não pode conter números!'
        } else if (value.trim() === '') {
          message += 'Não pode ser vazio!'
        } else if (value.length <= 3) {
          message += 'Precisa ter mais que 3 caracteres!'
        } else if (value.length >= 30) {
          message += 'Precisa ter menos que 30 caracteres!'
        }
        break

      case 'fantasyName':
        regex = /\d/g
        if (regex.test(value)) {
          message += 'Não pode conter números!'
        } else if (value.trim() === '') {
          message += 'Não pode ser vazio!'
        } else if (value.length <= 3) {
          message += 'Precisa ter mais que 3 caracteres!'
        } else if (value.length >= 30) {
          message += 'Precisa ter menos que 30 caracteres!'
        }
        break

      case 'cnpj':
        if (!ValidateCnpj(value)) {
          message += 'CNPJ inválido!'
        }
        break

      case 'responsible':
        regex = /\d/g
        if (regex.test(value)) {
          message += 'Não pode conter números!'
        } else if (value.trim() === '') {
          message += 'Não pode ser vazio!'
        } else if (value.length <= 5) {
          message += 'Precisa ter mais que 5 caracteres!'
        } else if (value.length >= 30) {
          message += 'Precisa ter menos que 30 caracteres!'
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

      case 'address':
        if (value === '') {
          message += 'Campo em branco!'
        } else if (value.length <= 10) {
          message += 'Precisa ter menos que 10 caracteres!'
        } else if (value.length >= 30) {
          message += 'Precisa ter mais que 30 caracteres!'
        }
        break

      case 'uf':
        if (value === 'selecione') {
          message += 'Selecione uma uf!'
        }
        break

      case 'city':
        if (value === 'selecione') {
          message += 'Selecione uma city!'
        }
        break

      case 'email':
        regex =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if (!regex.test(value)) {
          message += 'E-mail inválido!'
        } else if (value.replace(' ', '') === '') {
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

  const closeError = () => setHasError(false)

  const isNotValid = () => {
    const inputs = [
      'socialName',
      'fantasyName',
      'cnpj',
      'responsible',
      'phone',
      'address',
      'uf',
      'city',
      'email',
      'password',
      'confirmPassword'
    ]
    const invalid = (label) =>
      !Object.keys(form).includes(label) || form[label].length === 0

    const validacoes =
      Object.values(formValidate).filter((item) => item !== '').length > 0

    return inputs.some((item) => invalid(item)) || validacoes
  }

  useEffect(() => {
    if (error.length > 0) {
      setHasError(true)
    } else {
      setHasError(false)
    }

    if (registered) {
      setSuccess(true)
      setForm({})
    }
  }, [error, registered])

  const insertData = () => {
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
      password: form.password,
      auth: true
    }

    dispatch(createProvider(nform)).then(() => {
      setDisableInit(true)
    })
  }

  return (
    <SForm autoComplete="off">
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
              autoFocus
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
              placeholder="Informe o seu telefone"
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
              required
            />
            <Form.Control.Feedback>
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
              required
            />
            <Form.Control.Feedback>
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

          {isNotValid() || loading ? (
            <SFormGroup>
              <SDesabledButton
                type="button"
                disabled={isNotValid()}
                onClick={insertData}
              >
                Cadastrar
              </SDesabledButton>
            </SFormGroup>
          ) : (
            <SFormGroup>
              <SButton
                type="button"
                disabled={isNotValid()}
                onClick={insertData}
              >
                {loading ? (
                  <>
                    <Loading />
                  </>
                ) : (
                  'Cadastrar'
                )}
              </SButton>
            </SFormGroup>
          )}
        </Col>
      </SContainer>
    </SForm>
  )
}

export default SignUpProvider
