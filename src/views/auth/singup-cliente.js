import React, * as react from 'react'
import * as moment from 'moment'
import { create as createCliente } from '~/store/cliente/cliente.action'
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
import ufcidade from '~/util/estados-cidades.json'

const SignUpCliente = () => {
  const dispatch = useDispatch()

  const [hasError, setHasError] = react.useState(false)
  const [success, setSuccess] = react.useState(false)
  const error = useSelector((state) => state.auth.error)
  const registered = useSelector((state) => state.auth.registered)
  const loading = useSelector((state) => state.auth.loading)
  const [uf, setuf] = react.useState([])
  const [cidades, setcidade] = react.useState([])
  const [formValidate, setFormValidate] = react.useState({})
  const [form, setForm] = react.useState({})
  const [desableInit, setDesableInit] = react.useState(true)

  const handleChange = (props) => {
    setDesableInit(false)
    const { value, name } = props.target
    formValidarCampo(name, value)
    setForm({
      ...form,
      [name]: value
    })
  }

  react.useEffect(() => {
    const estados = ufcidade.estados.map(({ nome, sigla }) => ({ nome, sigla }))
    setuf(estados)
  }, [])

  react.useEffect(() => {
    const result = ufcidade.estados.find((item) => item.sigla === form.uf)
    if (result) {
      setcidade(result.cidades)
    }
  }, [form.uf])

  const formValidarCampo = (nome, valor) => {
    let menssage = ''
    switch (nome) {
      case 'nome':
        var nomeregex = /\d/g
        if (nomeregex.test(valor)) {
          menssage += 'Não pode conter números!'
        } else if (valor.trim() == '') {
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

        if (uf == 'uf') {
          menssage += 'Selecione uma uf!'
        }
        break

      case 'cidade':
        const cidade = valor

        if (cidade == 'cidade') {
          menssage += 'Selecione uma cidade!'
        }
        break

      case 'email':
        var filtraEmail =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if (!filtraEmail.test(valor)) {
          menssage += 'E-mail inválido!'
        } else if (valor.replace(' ', '') == '') {
          menssage += 'Campo em branco!'
        }
        break

      case 'senha':
        if (valor.length < 6) {
          menssage += 'Não ter menos que 6 caracteres!'
        }
        break
    }

    setFormValidate({ ...formValidate, [nome]: menssage })
  }

  const closeError = () => setHasError(false)

  const isNotValid = () => {
    const inputs = ['nome', 'data_nascimento', 'uf', 'cidade', 'email', 'senha']
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

  const InserirDados = () => {
    const nform = {
      nome: form.nome,
      data_nascimento:
        new Date(form.data_nascimento)
          .toLocaleDateString('pt-br')
          .replaceAll('-', '/') || '',
      uf: form.uf,
      cidade: form.cidade,
      email: form.email,
      senha: form.senha
    }

    dispatch(createCliente(nform)).then(() => {
      setDesableInit(true)
    })
  }

  return (
    <Container className="formCad">
      <Row className="justify-content-lg-center">
        <Col sm={12} md={12} lg={12}>
          <div className="colunasFormularios">
            <div className="coluna1">
              <h2 tag="h4" className="text-cadastro">
                Cadastre-se
              </h2>
              <FormGroup>
                <Label htmlFor="name" className="labelCli">
                  NOME:
                </Label>
                <Input
                  invalid={formValidate.nome}
                  disabled={loading}
                  type="text"
                  id="nome"
                  value={form.nome || ''}
                  onChange={handleChange}
                  name="nome"
                  placeholder="Insira o seu nome"
                  minLength="10"
                  maxLength="32"
                  autoFocus
                  required
                />
                <FormFeedback>{formValidate.nome || ''}</FormFeedback>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="data_nascimento" className="labelCli">
                  DATA DE NASCIMENTO:
                </Label>
                <Input
                  invalid={formValidate.data_nascimento}
                  disabled={loading}
                  type="date"
                  id="data_nascimento"
                  value={
                    form.data_nascimento
                      ? moment(form.data_nascimento)
                        .format('YYYY/MM/DD')
                        .replaceAll('/', '-')
                      : ''
                  }
                  onChange={handleChange}
                  name="data_nascimento"
                />
                <FormFeedback>
                  {formValidate.data_nascimento || ''}
                </FormFeedback>
              </FormGroup>

              <FormGroup
                variant="outlined"
                fullWidth
                size="medium"
                margin="larger"
              >
                <Label htmlFor="uf" className="labelCli" id="cadastro-uf-cli">
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
                  <option className="ufForm" value="">
                    uf
                  </option>
                  {uf?.map(({ nome, sigla }, i) => (
                    <option className="ufForm" key={i} value={sigla}>
                      {sigla}
                    </option>
                  ))}
                  <FormFeedback>{formValidate.uf || ''}</FormFeedback>
                </Select>
              </FormGroup>

              <FormGroup
                id="cadastro-cidade"
                variant="outlined"
                size="small"
                fullWidth
                margin="normal"
              >
                <Label htmlFor="uf" className="labelCidade">
                  CIDADE:
                </Label>

                <Select
                  fullWidth
                  native
                  value={form.cidade || ''}
                  onChange={handleChange}
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
                <FormFeedback>{formValidate.cidade || ''}</FormFeedback>
              </FormGroup>
            </div>

            <div className="coluna2" id="infoColuna">
              <FormGroup>
                <Label htmlFor="email" className="labelCli">
                  E-MAIL:
                </Label>
                <Input
                  invalid={formValidate.email}
                  disabled={loading}
                  type="email"
                  id="email"
                  value={form.email || ''}
                  onChange={handleChange}
                  name="email"
                  placeholder="Insira seu email"
                />
                <FormFeedback>{formValidate.email || ''}</FormFeedback>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="senha" className="labelCli">
                  SENHA:
                </Label>
                <Input
                  invalid={formValidate.senha}
                  disabled={loading}
                  type="password"
                  name="senha"
                  id="senha"
                  onChange={handleChange}
                  value={form.senha || ''}
                  placeholder="Informe sua senha"
                  minLength="6"
                  maxLength="10"
                />
                <FormFeedback>{formValidate.senha || ''}</FormFeedback>
              </FormGroup>

              <Button
                id="botaoFormularioCli"
                className={
                  isNotValid() || loading
                    ? 'estilo-botao-desable'
                    : 'estilo-botao'
                }
                disabled={isNotValid()}
                size="md"
                block
                onClick={InserirDados}
              >
                {loading
                  ? (
                    <>
                      <Spinner size="sm" color="light" /> Carregando...
                    </>
                    )
                  : (
                      'Cadastrar'
                    )}
              </Button>
              <Alert
                color="success"
                isOpen={success}
                toggle={() => setSuccess(!success)}
              >
                <div>
                  <strong>Usuario </strong> cadastrado com sucesso.
                </div>
                <div>Você será redirecionado em 5 segundos.</div>
              </Alert>
              <Alert color="danger" isOpen={hasError} toggle={closeError}>
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

export default SignUpCliente
