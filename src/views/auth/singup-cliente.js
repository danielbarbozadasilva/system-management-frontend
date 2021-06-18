
import React, { useEffect, useState } from 'react'
import UfCidade from '~/util/estados-cidades.json'
import { create as createcliente } from '~/store/cliente/cliente.action'
import { useDispatch, useSelector } from 'react-redux'
import '../../assets/css/style.css'
import { FormGroup, Label, Input, Alert, Button, Spinner, FormFeedback } from 'reactstrap'
import InputMask from 'react-input-mask'
import { Select } from '@material-ui/core'

const SignUpCliente = () => {
  const dispatch = useDispatch()
  const [success, setSuccess] = useState(false)
  const error = useSelector(state => state.auth.error)
  const registered = useSelector(state => state.auth.registered)
  const [uf, setUf] = useState([])
  const [cidades, setCidade] = useState([])
  const [hasError, setHasError] = useState(false)
  const loading = useSelector(state => state.auth.loading)

  const [formValidate, setFormValidate] = useState({})
  const [form, setForm] = useState({
    nome: '',
    nascimento: '',
    uf: '',
    cidade: '',
    email: '',
    senha: '',
  })

  const HandleChange = (props) => {
    const { value, name } = props.target
    formValidarCampo(name, value)
    setForm({
      ...form,
      [name]: value,
    })
  }

  const SubmitForm = () => {
    dispatch(createcliente(form))
  }

  useEffect(() => {
    const estados = UfCidade.estados.map(({ nome, sigla }) => ({ nome, sigla }))
    setUf(estados)
  }, [])

  useEffect(() => {
    const result = UfCidade.estados.find((item) => item.sigla === form.uf)
    if (result) {
      setCidade(result.cidades)
    }
  }, [form.uf])

  const formValidarCampo = (nome, valor) => {
    let menssage = ''
    switch (nome) {
      case 'nome':
        var nomeregex = /\d/g
        if (nomeregex.test(valor)) {
          menssage += 'Não pode conter números!'
        } else if (valor.trim() === '') {
          menssage += 'Não pode ser vazio!'
        } else if (valor.length <= 10) {
          menssage += 'Precisa ter mais que 10 caracteres!'
        }
        break

        // case 'nascimento':
        //   const datanasc = valor.replaceAll('-', '/')

        //   const dataAtual = moment().format('YYYY/MM/DD')

        //   if (!moment(datanasc).isValid) {
        //     menssage += 'Data inválida!'
        //   } else if (moment(datanasc).isAfter(dataAtual)) {
        //     menssage += 'Data maior que a atual!'
        //   }

        //   break

      case 'email':
        var filtraEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

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

  const formatDate = (date) => {
    return (
      new Date(date).toLocaleDateString('pt-BR', { timeZone: 'UTC' })
    )
  }

  const closeError = () => setHasError(false)

  const isNotValid = () => {
    const inputs = ['nome', 'nascimento', 'email', 'senha']
    const invalid = (label) => !Object.keys(form).includes(label) || form[label].length === 0

    const validacoes = Object.values(formValidate).filter(item => item !== '').length > 0

    return inputs.some(item => invalid(item)) || validacoes
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

  return (
    <div className="colunasFormularios">
      <div className="coluna1">
        <h2 tag="h4" className="text-cadastro">Cadastro cliente</h2>
        <FormGroup>
          <Label htmlFor="nome" className="label">Nome:</Label>
          <Input invalid={!!formValidate.nome} disabled={loading} type="text" name="nome" id="nome" onChange={HandleChange} value={form.nome || ''} placeholder="Informe o seu nome:" minLength="10" maxLength="32" />
          <FormFeedback>{formValidate.nome || ''}</FormFeedback>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="nascimento" className="label">Data de Nascimento:</Label>
          <InputMask
            mask="99/99/9999"
            value={form.nascimento || ''}
            disabled={false}
            maskChar=" "
            onChange={HandleChange}
          >
            {() => (
              <Input invalid={!!formValidate.nascimento} disabled={loading} type="date" name="nascimento" id="nascimento" onChange={HandleChange} mask="99/99/9999" maskChar=" " value={form.nascimento || ''} />
            )}
          </InputMask>

          <FormFeedback>{formValidate.nascimento || ''}</FormFeedback>
        </FormGroup>

        <FormGroup
          variant="outlined"
          fullWidth
          size="small"
          margin="normal"
        >
          <Select
            native
            value={form.uf || ''}
            onChange={HandleChange}
            inputProps={{
              name: 'uf',
              id: 'outlined-native-simple'
            }}
          >
            <option value="">Uf</option>
            {uf?.map(({ nome, sigla }, i) => (
              <option key={i} value={sigla}>
                {sigla}
              </option>
            ))}
          </Select>
        </FormGroup>
        <FormGroup
          variant="outlined"
          size="small"
          fullWidth
          margin="normal"
          disabled={!form.uf}
        >
          <Select
            fullWidth
            native
            value={form.cidade || ''}
            onChange={HandleChange}
            inputProps={{
              name: 'cidade',
              id: 'outlined-native-simple'
            }}
          >
            <option value="">Cidade</option>

            {cidades?.map((cidade, i) => (
              <option key={i} value={cidade}>
                {cidade}
              </option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="email" className="label">E-mail:</Label>
          <Input invalid={!!formValidate.email} disabled={loading} type="email" name="email" id="email" onChange={HandleChange} value={form.email || ''} placeholder="Informe seu E-mail" />
          <FormFeedback>{formValidate.email || ''}</FormFeedback>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="senha" className="label">Senha:</Label>
          <Input invalid={!!formValidate.senha} disabled={loading} type="password" name="senha" id="senha" onChange={HandleChange} value={form.senha || ''} placeholder="Informe sua senha" minLength="6" maxLength="10" />
          <FormFeedback>{formValidate.senha || ''}</FormFeedback>
        </FormGroup>

        <Button id="botaoFormulario" className={isNotValid() || loading ? 'estilo-botao-desable' : 'estilo-botao'} disabled={isNotValid()} size="md" block onClick={SubmitForm}>
          {loading ? (<><Spinner size="sm" color="light" /> Carregando...</>) : 'Cadastrar'}
        </Button>
        <Alert color="success" isOpen={success} toggle={() => setSuccess(!success)}>
          <div><strong>Usuario </strong> cadastrado com sucesso.</div>
          <div>Você será redirecionado em 5 segundos.</div>

        </Alert>
        <Alert color="danger" isOpen={hasError} toggle={closeError}>
          <div><strong>OPS !!! </strong> Aconteceu um erro.</div>
          <small>Verifique seus dados.</small>
        </Alert>

      </div>
    </div>
  )
}

export default SignUpCliente
