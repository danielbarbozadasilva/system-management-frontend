import React, * as react from 'react'
import * as moment from 'moment'
import { createClient } from '~/store/client/client.action'
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

const SignUpClient = () => {
  const dispatch = useDispatch()

  const [hasError, setHasError] = react.useState(false)
  const [success, setSuccess] = react.useState(false)
  const error = useSelector((state) => state.auth.error)
  const registered = useSelector((state) => state.auth.registered)
  const loading = useSelector((state) => state.auth.loading)
  const [uf, setUf] = react.useState([])
  const [city, setCity] = react.useState([])
  const [formValidate, setFormValidate] = react.useState({})
  const [form, setForm] = react.useState({})
  const [disableInit, setDisableInit] = react.useState(true)

  const handleChange = (props) => {
    setDisableInit(false)
    const { value, name } = props.target
    fieldValidate(name, value)
    setForm({
      ...form,
      [name]: value
    })
  }

  react.useEffect(() => {
    const localization = ufCityFile.states.map(({ name, uf }) => ({ name, uf }))
    setUf(localization)
  }, [])

  react.useEffect(() => {
    const result = ufCityFile.states.find((item) => item.uf === form.uf)
    if (result) {
      setCity(result.city)
    }
  }, [form.uf])

  const fieldValidate = (name, value) => {
    let message = ''
    switch (name) {
      case 'name':
        var validRegex = /\d/g
        if (validRegex.test(value)) {
          message += 'Não pode conter números!'
        } else if (value.trim() === '') {
          message += 'Não pode ser vazio!'
        } else if (value.length <= 10) {
          message += 'Precisa ter mais que 10 caracteres!'
        }
        break

      case 'birthDate':
        const datanasc = value.replaceAll('-', '/')

        const dataAtual = moment().format('YYYY/MM/DD')

        if (!moment(datanasc).isValid) {
          message += 'Data inválida!'
        } else if (moment(datanasc).isAfter(dataAtual)) {
          message += 'Data maior que a atual!'
        }

        break

      case 'uf':
        const uf = value

        if (uf === 'uf') {
          message += 'Selecione uma uf!'
        }
        break

      case 'city':
        const city = value

        if (city === 'city') {
          message += 'Selecione uma cidade!'
        }
        break

      case 'email':
        var filterEmail =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if (!filterEmail.test(value)) {
          message += 'E-mail inválido!'
        } else if (value.replace(' ', '') === '') {
          message += 'Campo em branco!'
        }
        break

      case 'password':
        if (value.length < 6) {
          message += 'Não ter menos que 6 caracteres!'
        }
        break
    }

    setFormValidate({ ...formValidate, [name]: message })
  }

  const closeError = () => setHasError(false)

  const isNotValid = () => {
    const inputs = ['name', 'birthDate', 'uf', 'city', 'email', 'password']
    const invalid = (label) =>
      !Object.keys(form).includes(label) || form[label].length === 0

    const validacoes =
      Object.values(formValidate).filter((item) => item !== '').length > 0

    return inputs.some((item) => invalid(item)) || validacoes
  }

  react.useEffect(() => {
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
      name: form.name,
      birthDate:
        new Date(form.birthDate)
          .toLocaleDateString('pt-br')
          .replaceAll('-', '/') || '',
      uf: form.uf,
      city: form.city,
      email: form.email,
      password: form.password
    }

    dispatch(createClient(nform)).then(() => {
      setDisableInit(true)
    })
  }

  return (
    <Container className='formCad'>
      <Row className='justify-content-lg-center'>
        <Col sm={12} md={12} lg={12}>
          <div className='formCol'>
            <div className='column1'>
              <h2 tag='h4' className='text-subscription'>
                Cadastre-se
              </h2>
              <FormGroup>
                <Label htmlFor='name' className='labelCli'>
                  NOME:
                </Label>
                <Input
                  invalid={formValidate.name}
                  disabled={loading}
                  type='text'
                  id='name'
                  value={form.name || ''}
                  onChange={handleChange}
                  name='name'
                  placeholder='Insira o seu name'
                  minLength='10'
                  maxLength='32'
                  autoFocus
                  required
                />
                <FormFeedback>{formValidate.name || ''}</FormFeedback>
              </FormGroup>

              <FormGroup>
                <Label htmlFor='birthDate' className='labelCli'>
                  DATA DE NASCIMENTO:
                </Label>
                <Input
                  invalid={formValidate.birthDate}
                  disabled={loading}
                  type='date'
                  id='birthDate'
                  value={
                    form.birthDate
                      ? moment(form.birthDate)
                          .format('YYYY/MM/DD')
                          .replaceAll('/', '-')
                      : ''
                  }
                  onChange={handleChange}
                  name='birthDate'
                />
                <FormFeedback>
                  {formValidate.birthDate || ''}
                </FormFeedback>
              </FormGroup>

              <FormGroup
                variant='outlined'
                fullWidth
                size='medium'
                margin='larger'
              >
                <Label htmlFor='uf' className='labelCli' id='subscription-uf-cli'>
                  UF:
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
                  <option className='ufForm' value=''>
                  selecione
                  </option>
                  {uf?.map(({ name, uf }, i) => (
                    <option className='ufForm' key={i} value={uf}>
                      {uf}
                    </option>
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
                <Label htmlFor='uf' className='labelcity'>
                  CIDADE:
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
            </div>

            <div className='column2' id='infoColumn'>
              <FormGroup>
                <Label htmlFor='email' className='labelCli'>
                  E-MAIL:
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
                />
                <FormFeedback>{formValidate.email || ''}</FormFeedback>
              </FormGroup>

              <FormGroup>
                <Label htmlFor='password' className='labelCli'>
                  SENHA:
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
                  minLength='6'
                  maxLength='10'
                />
                <FormFeedback>{formValidate.password || ''}</FormFeedback>
              </FormGroup>

              <Button
                id='buttonFormClient'
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
              <Alert
                color='success'
                isOpen={success}
                toggle={() => setSuccess(!success)}
              >
                <div>
                  <strong>user </strong> cadastrado com sucesso.
                </div>
                <div>Você será redirecionado em 5 segundos.</div>
              </Alert>
              <Alert color='danger' isOpen={hasError} toggle={closeError}>
                <div>
                  <strong>OPS !!! </strong> Aconteceu um erro.
                </div>
                <small>Verifique seus dados.</small>
              </Alert>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default SignUpClient
