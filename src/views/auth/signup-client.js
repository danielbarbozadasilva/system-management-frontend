import React, * as react from 'react'
import * as moment from 'moment'
import { create as createclient } from '~/store/client/client.action'
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
import ufcity from '~/util/state-city.json'

const SignUpclient = () => {
  const dispatch = useDispatch()

  const [hasError, setHasError] = react.useState(false)
  const [success, setSuccess] = react.useState(false)
  const error = useSelector((state) => state.auth.error)
  const registered = useSelector((state) => state.auth.registered)
  const loading = useSelector((state) => state.auth.loading)
  const [uf, setuf] = react.useState([])
  const [citys, setcity] = react.useState([])
  const [formValidate, setFormValidate] = react.useState({})
  const [form, setForm] = react.useState({})
  const [disableInit, setDisableInit] = react.useState(true)

  const handleChange = (props) => {
    setDisableInit(false)
    const { value, name } = props.target
    formValidate(name, value)
    setForm({
      ...form,
      [name]: value
    })
  }

  react.useEffect(() => {
    const estados = ufcity.estados.map(({ nome, sigla }) => ({ nome, sigla }))
    setuf(estados)
  }, [])

  react.useEffect(() => {
    const result = ufcity.estados.find((item) => item.sigla === form.uf)
    if (result) {
      setcity(result.citys)
    }
  }, [form.uf])

  const formValidate = (nome, valor) => {
    let menssage = ''
    switch (nome) {
      case 'nome':
        var validRegex = /\d/g
        if (validRegex.test(valor)) {
          menssage += 'Não pode conter números!'
        } else if (valor.trim() === '') {
          menssage += 'Não pode ser vazio!'
        } else if (valor.length <= 10) {
          menssage += 'Precisa ter mais que 10 caracteres!'
        }
        break

      case 'data_nascimento':
        const datanasc = valor.replaceAll('-', '/')

        const dataAtual = moment().format('YYYY/MM/DD')

        if (!moment(datanasc).isValid) {
          menssage += 'Data inválida!'
        } else if (moment(datanasc).isAfter(dataAtual)) {
          menssage += 'Data maior que a atual!'
        }

        break

      case 'uf':
        const uf = valor

        if (uf === 'uf') {
          menssage += 'Selecione uma uf!'
        }
        break

      case 'city':
        const city = valor

        if (city === 'city') {
          menssage += 'Selecione uma city!'
        }
        break

      case 'email':
        var filtraEmail =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if (!filtraEmail.test(valor)) {
          menssage += 'E-mail inválido!'
        } else if (valor.replace(' ', '') === '') {
          menssage += 'Campo em branco!'
        }
        break

      case 'password':
        if (valor.length < 6) {
          menssage += 'Não ter menos que 6 caracteres!'
        }
        break
    }

    setFormValidate({ ...formValidate, [nome]: menssage })
  }

  const closeError = () => setHasError(false)

  const isNotValid = () => {
    const inputs = ['nome', 'data_nascimento', 'uf', 'city', 'email', 'password']
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
      nome: form.nome,
      data_nascimento:
        new Date(form.data_nascimento)
          .toLocaleDateString('pt-br')
          .replaceAll('-', '/') || '',
      uf: form.uf,
      city: form.city,
      email: form.email,
      password: form.password
    }

    dispatch(createclient(nform)).then(() => {
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
                  invalid={formValidate.nome}
                  disabled={loading}
                  type='text'
                  id='nome'
                  value={form.nome || ''}
                  onChange={handleChange}
                  name='nome'
                  placeholder='Insira o seu nome'
                  minLength='10'
                  maxLength='32'
                  autoFocus
                  required
                />
                <FormFeedback>{formValidate.nome || ''}</FormFeedback>
              </FormGroup>

              <FormGroup>
                <Label htmlFor='data_nascimento' className='labelCli'>
                  DATA DE NASCIMENTO:
                </Label>
                <Input
                  invalid={formValidate.data_nascimento}
                  disabled={loading}
                  type='date'
                  id='data_nascimento'
                  value={
                    form.data_nascimento
                      ? moment(form.data_nascimento)
                          .format('YYYY/MM/DD')
                          .replaceAll('/', '-')
                      : ''
                  }
                  onChange={handleChange}
                  name='data_nascimento'
                />
                <FormFeedback>
                  {formValidate.data_nascimento || ''}
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
                    uf
                  </option>
                  {uf?.map(({ nome, sigla }, i) => (
                    <option className='ufForm' key={i} value={sigla}>
                      {sigla}
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
                  city:
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

                  {citys?.map((city, i) => (
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
                  password:
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
                  <strong>Usuario </strong> cadastrado com sucesso.
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

export default SignUpclient
