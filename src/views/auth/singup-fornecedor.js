import React, { useEffect, useState } from 'react'
import { createProvider } from '~/store/fornecedor/fornecedor.action'
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
import { ValidarCNPJ } from './validarCNPJ'

const SignUpFornecedor = () => {
  const dispatch = useDispatch()

  const [hasError, setHasError] = useState(false)
  const [success, setSuccess] = useState(false)
  const error = useSelector((state) => state.auth.error)
  const registered = useSelector((state) => state.auth.registered)
  const loading = useSelector((state) => state.auth.loading)
  const [uf, setuf] = useState([])
  const [cidades, setcidade] = useState([])
  const [formValidate, setFormValidate] = useState({})
  const [form, setForm] = useState({})
  const [desableInit, setDesableInit] = useState(true)

  const handleChange = (props) => {
    setDesableInit(false)
    const { value, name } = props.target
    formValidarCampo(name, value)
    setForm({
      ...form,
      [name]: value
    })
  }

  useEffect(() => {
    const estados = ufcidade.estados.map(({ nome, sigla }) => ({ nome, sigla }))
    setuf(estados)
  }, [])

  useEffect(() => {
    const result = ufcidade.estados.find((item) => item.sigla === form.uf)
    if (result) {
      setcidade(result.cidades)
    }
  }, [form.uf])

  const formValidarCampo = (nome, valor) => {
    let menssage = ''
    switch (nome) {
      case 'nomeFantasia':
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

      case 'responsavel':
        var nomeregex = /\d/g
        if (nomeregex.test(valor)) {
          menssage += 'Não pode conter números!'
        } else if (valor.trim() === '') {
          menssage += 'Não pode ser vazio!'
        } else if (valor.length <= 10) {
          menssage += 'Precisa ter mais que 10 caracteres!'
        }
        break

      case 'telefone':
        // var filtraTelefone = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/

        // if (!filtraTelefone.test(valor)) {
        //   menssage += 'Número de telefone inválido!'
        // } else if (valor.replace(' ', '') === '') {
        //   menssage += 'Campo em branco!'
        // }
        break

      case 'endereco':
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

      case 'cidade':
        if (valor === 'selecione') {
          menssage += 'Selecione uma cidade!'
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
    const inputs = [
      'nomeFantasia',
      'cnpj',
      'responsavel',
      'telefone',
      'endereco',
      'uf',
      'cidade',
      'email',
      'senha'
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

  const InserirDados = () => {
    const nform = {
      nomeFantasia: form.nomeFantasia,
      cnpj: form.cnpj,
      responsavel: form.responsavel,
      telefone: form.telefone,
      endereco: form.endereco,
      uf: form.uf,
      cidade: form.cidade,
      email: form.email,
      senha: form.senha
    }

    dispatch(createProvider(nform)).then(() => {
      setDesableInit(true)
    })
  }

  return (
    <Container className="formPainel">
      <Row className="justify-content-lg-center">
        <Col sm={12} md={12} lg={12}>
          <div className="colunasFormularios">
            <div className="coluna1">
              <h2 tag="h4" className="text-cadastro">
                Cadastre-se
              </h2>
              <FormGroup>
                <Label htmlFor="name" className="labelFornecedor">
                  Nome Fantasia:
                </Label>
                <Input
                  invalid={formValidate.nomeFantasia}
                  disabled={loading}
                  type="text"
                  id="nomeFantasia"
                  value={form.nomeFantasia || ''}
                  onChange={handleChange}
                  name="nomeFantasia"
                  placeholder="Insira o seu nome fantasia"
                  minLength="10"
                  maxLength="32"
                />
                <FormFeedback>{formValidate.nomeFantasia || ''}</FormFeedback>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="cnpj" className="labelFornecedor">
                  CNPJ:
                </Label>

                <Input
                  invalid={formValidate.cnpj}
                  disabled={loading}
                  type="text"
                  name="cnpj"
                  id="cnpj"
                  onChange={handleChange}
                  value={form.cnpj || ''}
                  placeholder="Informe o CNPJ (apenas números)"
                  maxLength="18"
                  required
                />
                <FormFeedback>{formValidate.cnpj || ''}</FormFeedback>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="responsavel" className="labelFornecedor">
                  RESPONSÁVEL:
                </Label>
                <Input
                  invalid={formValidate.responsavel}
                  disabled={loading}
                  type="text"
                  id="nome"
                  value={form.responsavel || ''}
                  onChange={handleChange}
                  name="responsavel"
                  placeholder="Insira o nome do responsável"
                  minLength="10"
                  maxLength="32"
                  required
                />
                <FormFeedback>{formValidate.responsavel || ''}</FormFeedback>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="telefone" className="labelFornecedor">
                  TELEFONE:
                </Label>
                <Input
                  invalid={formValidate.telefone}
                  disabled={loading}
                  type="text"
                  id="telefone"
                  value={form.telefone || ''}
                  onChange={handleChange}
                  name="telefone"
                  placeholder="Informe o telefone"
                  minLength="8"
                  maxLength="25"
                  required
                />
                <FormFeedback>{formValidate.telefone || ''}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="endereco" className="labelFornecedor">
                  ENDEREÇO:
                </Label>
                <Input
                  invalid={formValidate.endereco}
                  disabled={loading}
                  type="text"
                  id="endereco"
                  value={form.endereco || ''}
                  onChange={handleChange}
                  name="endereco"
                  placeholder="Informe o endereço"
                  minLength="8"
                  maxLength="40"
                  required
                />
                <FormFeedback>{formValidate.endereco || ''}</FormFeedback>
              </FormGroup>
            </div>

            <div className="coluna2 cadastro-uf" id="infoColuna">
              <FormGroup
                variant="outlined"
                fullWidth
                size="medium"
                margin="normal"
              >
                <Label htmlFor="uf" id="cadastro-uf-forn">
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
                  <option value="">selecione</option>
                  {uf?.map(({ nome, sigla }, i) => (
                    <option key={i} value={sigla}>
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
                <Label htmlFor="uf" className="cidadeLabel">
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

              <FormGroup>
                <Label htmlFor="email" className="labelFornecedor">
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
                  required
                />
                <FormFeedback>{formValidate.email || ''}</FormFeedback>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="senha" className="labelFornecedor">
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
                  required
                />
                <FormFeedback>{formValidate.senha || ''}</FormFeedback>
              </FormGroup>

              <Button
                id="botaoFormularioForn"
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
                  <strong>Fornecedor </strong> cadastrado com sucesso.
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

export default SignUpFornecedor
