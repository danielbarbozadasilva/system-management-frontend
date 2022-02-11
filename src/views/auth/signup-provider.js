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
import ufcity from '~/util/state-city.json'
import { ValidarCNPJ } from './validateCnpj'

const SignUpprovider = () => {
  const dispatch = useDispatch()

  const [hasError, setHasError] = useState(false)
  const [success, setSuccess] = useState(false)
  const error = useSelector((state) => state.auth.error)
  const registered = useSelector((state) => state.auth.registered)
  const loading = useSelector((state) => state.auth.loading)
  const [uf, setuf] = useState([])
  const [citys, setcity] = useState([])
  const [formValidate, setFormValidate] = useState({})
  const [form, setForm] = useState({})
  const [disableInit, setDisableInit] = useState(true)

  const handleChange = (props) => {
    setDisableInit(false)
    const { value, name } = props.target
    formValidate(name, value)
    setForm({
      ...form,
      [name]: value
    })
  }

  useEffect(() => {
    const estados = ufcity.estados.map(({ nome, sigla }) => ({ nome, sigla }))
    setuf(estados)
  }, [])

  useEffect(() => {
    const result = ufcity.estados.find((item) => item.sigla === form.uf)
    if (result) {
      setcity(result.citys)
    }
  }, [form.uf])

  const formValidate = (nome, valor) => {
    let menssage = ''
    switch (nome) {
      case 'fantasyName':
        var fantasyRegex = /\d/g
        if (fantasyRegex.test(valor)) {
          menssage += 'Não pode conter números!'
        } else if (valor.trim() === '') {
          menssage += 'Não pode ser vazio!'
        } else if (valor.length <= 10) {
          menssage += 'Precisa ter mais que 10 caracteres!'
        }
        break

      case 'cnpj':
        if (!ValidarCNPJ(valor)) {
          menssage += 'CNPJ inválido!'
        }
        break

      case 'responsible':
        var nomeregex = /\d/g
        if (nomeregex.test(valor)) {
          menssage += 'Não pode conter números!'
        } else if (valor.trim() === '') {
          menssage += 'Não pode ser vazio!'
        } else if (valor.length <= 10) {
          menssage += 'Precisa ter mais que 10 caracteres!'
        }
        break

      case 'phone':
        // var filtraphone = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/

        // if (!filtraphone.test(valor)) {
        //   menssage += 'Número de phone inválido!'
        // } else if (valor.replace(' ', '') === '') {
        //   menssage += 'Campo em branco!'
        // }
        break

      case 'address':
        if (valor === '') {
          menssage += 'Campo em branco!'
        } else if (valor.length < 8) {
          menssage += 'Endereço precisa ter mais que 8 caracteres!'
        }
        break

      case 'uf':
        if (valor === 'selecione') {
          menssage += 'Selecione uma uf!'
        }
        break

      case 'city':
        if (valor === 'selecione') {
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
    const inputs = [
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
                <Label htmlFor='name' className='labelprovider'>
                  Nome Fantasia:
                </Label>
                <Input
                  invalid={formValidate.fantasyName}
                  disabled={loading}
                  type='text'
                  id='fantasyName'
                  value={form.fantasyName || ''}
                  onChange={handleChange}
                  name='fantasyName'
                  placeholder='Insira o seu nome fantasia'
                  minLength='10'
                  maxLength='32'
                />
                <FormFeedback>{formValidate.fantasyName || ''}</FormFeedback>
              </FormGroup>

              <FormGroup>
                <Label htmlFor='cnpj' className='labelprovider'>
                  CNPJ:
                </Label>

                <Input
                  invalid={formValidate.cnpj}
                  disabled={loading}
                  type='text'
                  name='cnpj'
                  id='cnpj'
                  onChange={handleChange}
                  value={form.cnpj || ''}
                  placeholder='Informe o CNPJ (apenas números)'
                  maxLength='18'
                  required
                />
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
                  id='nome'
                  value={form.responsible || ''}
                  onChange={handleChange}
                  name='responsible'
                  placeholder='Insira o nome do responsável'
                  minLength='10'
                  maxLength='32'
                  required
                />
                <FormFeedback>{formValidate.responsible || ''}</FormFeedback>
              </FormGroup>

              <FormGroup>
                <Label htmlFor='phone' className='labelprovider'>
                  phone:
                </Label>
                <Input
                  invalid={formValidate.phone}
                  disabled={loading}
                  type='text'
                  id='phone'
                  value={form.phone || ''}
                  onChange={handleChange}
                  name='phone'
                  placeholder='Informe o seu telefone'
                  minLength='8'
                  maxLength='25'
                  required
                />
                <FormFeedback>{formValidate.phone || ''}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label htmlFor='address' className='labelprovider'>
                  ENDEREÇO:
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
                  minLength='8'
                  maxLength='40'
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
                  UF:
                </Label>
                <div />
                <Select
                  native
                  value={form.uf || ''}
                  onChange={handleChange}
                  inputProps={{
                    name: 'uf',
                    id: 'outlined-native-simple'
                  }}
                >
                  <option value=''>selecione</option>
                  {uf?.map(({ nome, sigla }, i) => (
                    <option key={i} value={sigla}>
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
                <Label htmlFor='uf' className='labelCity'>
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

              <FormGroup>
                <Label htmlFor='email' className='labelprovider'>
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
                  required
                />
                <FormFeedback>{formValidate.email || ''}</FormFeedback>
              </FormGroup>

              <FormGroup>
                <Label htmlFor='password' className='labelprovider'>
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
              <Alert
                color='success'
                isOpen={success}
                toggle={() => setSuccess(!success)}
              >
                <div>
                  <strong>provider </strong> cadastrado com sucesso.
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

export default SignUpprovider
