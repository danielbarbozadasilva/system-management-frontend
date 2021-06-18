
import React, { useEffect, useState } from 'react'
import UfCidade from '~/util/estados-cidades.json'
import { create as createcliente } from '~/store/cliente/cliente.action'
import { useDispatch, useSelector } from 'react-redux'
import * as moment from 'moment'
import '../../assets/css/style.css'
import { FormGroup, Label, Input, Alert, Button, Spinner, FormFeedback } from 'reactstrap'

const SignUpFornecedor = () => {
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
    nomeusuario: '',
    datanascimentoparticipante: '',
    nomeparticipante: '',
    cpf: '',
    telefone: '',
    endereco: '',
    email: '',
    senha: '',
  })

  const HandleChange = (props) => {
    const { value, name } = props.target
    ParseCnpj(name)

    formValidarCampo(name, value)
    setForm({
      ...form,
      [name]: value,
    })
  }

  const ParseCnpj = (name) => {
    if (name === 'cnpj') {
      console.log('teste')
    }
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
      case 'nomeusuario':
        var nomeregex = /\d/g
        if (nomeregex.test(valor)) {
          menssage += 'Não pode conter números!'
        } else if (valor.trim() == '') {
          menssage += 'Não pode ser vazio!'
        } else if (valor.length <= 10) {
          menssage += 'Precisa ter mais que 10 caracteres!'
        }
        break

      case 'datanascimentoparticipante':
        const datanasc = valor.replaceAll('-', '/')

        const dataAtual = moment().format('YYYY/MM/DD')

        if (!moment(datanasc).isValid) {
          menssage += 'Data inválida!'
        } else if (moment(datanasc).isAfter(dataAtual)) {
          menssage += 'Data maior que a atual!'
        }

        break

      case 'nomeparticipante':
        var nomeregex = /\d/g
        if (nomeregex.test(valor)) {
          menssage += 'Nome não pode conter números!'
        } else if (valor.trim() == '') {
          menssage += 'Nome não pode ser vazio!'
        } else if (valor.length <= 10) {
          menssage += 'Precisa ter mais que 10 caracteres!'
        }
        break

      case 'cpf':
        // Aceita apenas traço(-), ponto(.) e números (0 a 9)
        var filtraCpf = /(?:\.|-|[0-9])*/

        if (!filtraCpf.test(valor)) {
          menssage += 'CPF inválido'
        } else if (valor.trim() == '') {
          menssage += 'Não pode ser vazio!'
        } else if (valor.length < 11 && valor.length > 14) {
          menssage += 'CPF inválido!'
        }
        break

      case 'telefone':
        // Nenhum DDD iniciado por 0 é aceito, e nenhum número de telefone pode iniciar com 0 ou 1.
        // +55 (11) 98888-8888 / 9999-9999 / 21 98888-8888 / 5511988888888
        var filtraTelefone = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/

        if (!filtraTelefone.test(valor)) {
          menssage += 'Número de telefone inválido!'
        } else if (valor.replace(' ', '') == '') {
          menssage += 'Campo em branco!'
        }
        break

      case 'endereco':
        if ((valor) === '') {
          menssage += 'Campo em branco!'
        } else if (valor.length < 8) {
          menssage += 'Endereço precisa ter mais que 8 caracteres!'
        }
        break

      case 'email':
        var filtraEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

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

  const formatDate = (date) => {
    return (
      new Date(date).toLocaleDateString('pt-BR', { timeZone: 'UTC' })
    )
  }

  const closeError = () => setHasError(false)

  const isNotValid = () => {
    const inputs = ['nomeusuario', 'datanascimentoparticipante', 'nomeparticipante', 'cpf', 'telefone', 'endereco', 'email', 'senha']
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
        <h2 tag="h4" className="text-cadastro">Cadastre-se</h2>
        <FormGroup>
          <Label htmlFor="nomeusuario" className="label">Nome do Responsável:</Label>
          <Input invalid={!!formValidate.nomeusuario} disabled={loading} type="text" name="nomeusuario" id="nomeusuario" onChange={HandleChange} value={form.nomeusuario || ''} placeholder="Informe o nome do usuário" minLength="10" maxLength="32" />
          <FormFeedback>{formValidate.nomeusuario || ''}</FormFeedback>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="datanascimentoparticipante" className="label">Data de Nascimento:</Label>
          <Input invalid={!!formValidate.datanascimentoparticipante} disabled={loading} type="date" name="datanascimentoparticipante" id="datanascimentoparticipante" onChange={HandleChange} value={form.datanascimentoparticipante || ''} />
          <FormFeedback>{formValidate.datanascimentoparticipante || ''}</FormFeedback>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="nomeparticipante" className="label">Nome do Participante:</Label>
          <Input invalid={!!formValidate.nomeparticipante} disabled={loading} type="text" name="nomeparticipante" id="nomeparticipante" onChange={HandleChange} value={form.nomeparticipante || ''} placeholder="Informe o nome do participante" minLength="10" maxLength="32" />
          <FormFeedback>{formValidate.nomeparticipante || ''}</FormFeedback>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="cpf" className="label">Cpf:</Label>
          <Input invalid={!!formValidate.cpf} disabled={loading} type="text" name="cpf" id="cpf" onChange={HandleChange} value={form.cpf || ''} placeholder="Informe o cpf (apenas números)" minLength="11" maxLength="14" />
          {/* 11 digitos - sem caracteres ou 14 digitos com traços(-) e ponto(.) */}
          <FormFeedback>{formValidate.cpf || ''}</FormFeedback>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="telefone" className="label">Telefone:</Label>
          <Input invalid={!!formValidate.telefone} disabled={loading} type="text" name="telefone" id="telefone" onChange={HandleChange} value={form.telefone || ''} placeholder="Informe o telefone" minLength="8" maxLength="25" />
          <FormFeedback>{formValidate.telefone || ''}</FormFeedback>
        </FormGroup>
      </div>
      <div className="coluna2">
        <FormGroup>
          <Label htmlFor="endereco" className="label">Endereço:</Label>
          <Input invalid={!!formValidate.endereco} disabled={loading} type="text" name="endereco" id="endereco" onChange={HandleChange} value={form.endereco || ''} placeholder="Informe o endereço" minLength="8" maxLength="40" />
          <FormFeedback>{formValidate.endereco || ''}</FormFeedback>
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

        <Button className="botaoFormulario" className={isNotValid() || loading ? 'estilo-botao-desable' : 'estilo-botao'} disabled={isNotValid()} size="md" block onClick={SubmitForm}>
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

export default SignUpFornecedor
