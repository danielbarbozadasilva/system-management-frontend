import React, { useEffect, useState } from 'react'
import { createProvider } from '~/store/provider/provider.action'
import { useDispatch, useSelector } from 'react-redux'
import '../../assets/css/style.css'
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
  Col
} from 'reactstrap'
import { Select } from '@material-ui/core'
import ufCityFile from '../../util/state-city.json'
import { ValidateCnpj } from '../../util/validations/cnpj-validate'
import InputMask from 'react-input-mask'

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
    fieldValidate(name, value)
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
        regex = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/

        if (!regex.test(value)) {
          message += 'Número de phone inválido!'
        } else if (value.replace(' ', '') === '') {
          message += 'Campo em branco!'
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
        if (value.length <= 5) {
          message += 'Precisa ter menos que 5 caracteres!'
        } else if (value.length >= 20) {
          message += 'Precisa ter mais que 20 caracteres!'
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
      'password'
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
      password: form.password
    }

    dispatch(createProvider(nform)).then(() => {
      setDisableInit(true)
    })
  }

  return (
    <Container className='formPanel'>
      <Row className='justify-content-lg-center'>
        <Col sm={12} md={12} lg={12}>
          <div className='formCol'>
            <div className='column1'>
              <h2 tag='h4' className='text-subscription'>
                Cadastre-se
              </h2>
              <FormGroup>
                <Label htmlFor='socialName' className='labelprovider'>
                  Nome social:
                </Label>
                <Input
                  invalid={formValidate.socialName}
                  disabled={loading}
                  type='text'
                  id='socialName'
                  value={form.socialName || ''}
                  onChange={handleChange}
                  name='socialName'
                  placeholder='Insira o nome social'
                />
                <FormFeedback>{formValidate.socialName || ''}</FormFeedback>
              </FormGroup>

              <FormGroup>
                <Label htmlFor='fantasyName' className='labelprovider'>
                  Nome fantasia:
                </Label>
                <Input
                  invalid={formValidate.fantasyName}
                  disabled={loading}
                  type='text'
                  id='fantasyName'
                  value={form.fantasyName || ''}
                  onChange={handleChange}
                  name='fantasyName'
                  placeholder='Insira o nome fantasia'
                />
                <FormFeedback>{formValidate.fantasyName || ''}</FormFeedback>
              </FormGroup>

              <FormGroup>
                <Label htmlFor='cnpj' className='labelprovider'>
                  Cnpj:
                </Label>
                <InputMask
                  mask='99.999.999/9999-99'
                  value={form.cnpj || ''}
                  disabled={false}
                  maskChar=' '
                  onChange={handleChange}
                >
                  {() => (
                    <Input
                      invalid={formValidate.cnpj}
                      disabled={loading}
                      type='text'
                      name='cnpj'
                      id='cnpj'
                      value={form.cnpj || ''}
                      placeholder='Informe o CNPJ'
                      required
                    />
                  )}
                </InputMask>
                <FormFeedback>{formValidate.cnpj || ''}</FormFeedback>
              </FormGroup>

              <FormGroup>
                <Label htmlFor='responsible' className='labelprovider'>
                  Responsável:
                </Label>
                <Input
                  invalid={formValidate.responsible}
                  disabled={loading}
                  type='text'
                  id='name'
                  value={form.responsible || ''}
                  onChange={handleChange}
                  name='responsible'
                  placeholder='Insira o name do responsável'
                  required
                />
                <FormFeedback>{formValidate.responsible || ''}</FormFeedback>
              </FormGroup>

              <FormGroup>
                <Label htmlFor='phone' className='labelprovider'>
                  Telefone:
                </Label>
                <InputMask
                  mask='+55 (99) 9999-9999'
                  disabled={false}
                  maskChar=' '
                  value={form.phone || ''}
                  onChange={handleChange}
                >
                  {() => (
                    <Input
                      invalid={formValidate.phone}
                      disabled={loading}
                      type='text'
                      id='phone'
                      value={form.phone || ''}
                      onChange={handleChange}
                      name='phone'
                      placeholder='Informe o seu telefone'
                      required
                    />
                  )}
                </InputMask>
                <FormFeedback>{formValidate.phone || ''}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label htmlFor='address' className='labelprovider'>
                  Endereço:
                </Label>
                <Input
                  invalid={formValidate.address}
                  disabled={loading}
                  type='text'
                  id='address'
                  value={form.address || ''}
                  onChange={handleChange}
                  name='address'
                  placeholder='Informe o endereço'
                  required
                />
                <FormFeedback>{formValidate.address || ''}</FormFeedback>
              </FormGroup>
            </div>

            <div className='column2 subscription-uf' id='infoColumn'>
              <FormGroup
                variant='outlined'
                fullWidth
                size='medium'
                margin='normal'
              >
                <Label htmlFor='uf' id='subscription-uf-forn'>
                  Uf:
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
                  <option className='ufForm' value=''>selecione</option>
                  {uf?.map(({ name, uf }, i) => (
                    <option className='ufForm' key={i} value={uf}>{uf}</option>
                  ))}
                  <FormFeedback>{formValidate.uf || ''}</FormFeedback>
                </Select>
              </FormGroup>

              <FormGroup
                id='subscription-city'
                variant='outlined'
                size='small'
                fullWidth
                margin='normal'
              >
                <Label htmlFor='uf' className='labelCity'>
                  Cidade:
                </Label>

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
                  <option value=''>selecione</option>

                  {city?.map((city, i) => (
                    <option key={i} value={city}>
                      {city}
                    </option>
                  ))}
                </Select>
                <FormFeedback>{formValidate.city || ''}</FormFeedback>
              </FormGroup>

              <FormGroup>
                <Label htmlFor='email' className='labelprovider'>
                  E-mail:
                </Label>
                <Input
                  invalid={formValidate.email}
                  disabled={loading}
                  type='email'
                  id='email'
                  value={form.email || ''}
                  onChange={handleChange}
                  name='email'
                  placeholder='Insira seu email'
                  required
                />
                <FormFeedback>{formValidate.email || ''}</FormFeedback>
              </FormGroup>

              <FormGroup>
                <Label htmlFor='password' className='labelprovider'>
                  Senha:
                </Label>
                <Input
                  invalid={formValidate.password}
                  disabled={loading}
                  type='password'
                  name='password'
                  id='password'
                  onChange={handleChange}
                  value={form.password || ''}
                  placeholder='Informe sua password'
                  required
                />
                <FormFeedback>{formValidate.password || ''}</FormFeedback>
              </FormGroup>

              <Button
                id='buttonFormProvider'
                className={
                  isNotValid() || loading
                    ? 'style-button-disable'
                    : 'style-button'
                }
                disabled={isNotValid()}
                size='md'
                block
                onClick={insertData}
              >
                {loading
                  ? (
                    <>
                      <Spinner size='sm' color='light' /> Carregando...
                    </>
                    )
                  : (
                      'Cadastrar'
                    )}
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default SignUpProvider
