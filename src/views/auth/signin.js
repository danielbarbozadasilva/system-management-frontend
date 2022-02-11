import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Form,
  FormGroup,
  Input,
  Card,
  Col,
  CardBody,
  CardFooter,
  Alert,
  Spinner
} from 'reactstrap'
import styled from 'styled-components'
import { Sign } from '../../assets/styled'
import { signInAction } from '../../store/auth/auth.action'
import '../../assets/css/style.css'

const SignIn = () => {
  const dispatch = useDispatch()
  const [hasError, setHasError] = useState(false)
  const error = useSelector((state) => state.auth.error)
  const loading = useSelector((state) => state.auth.loading)

  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const handleChange = (props) => {
    const { value, name } = props.target
    setForm({
      ...form,
      [name]: value
    })
  }

  const closeError = () => setHasError(false)

  const submitForm = (event) => {
    event.preventDefault()
    dispatch(signInAction(form))
  }

  const isNotValid = () => form.email.length === 0 || form.password.length === 0

  useEffect(() => {
    setHasError(error.length > 0)
  }, [error])

  return (
    <Sign>
      <Col sm={12} md={12} lg={4}>
        <Alert color="danger" isOpen={hasError} toggle={closeError}>
          <div>
            <strong>OPS !!! </strong> Aconteceu um erro.
          </div>
          <small>Verifique usuário e password</small>
        </Alert>
        <SCard className="formularioLogar">
          <h2 tag="h4" className="text-login">
            Login
          </h2>
          <CardBody>
            <Form>
              <FormGroup>
                <label className="label" htmlFor="email">
                  E-mail:
                </label>
                <Input
                  className="form-control"
                  disabled={loading}
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleChange}
                  value={form.email || ''}
                  placeholder="Informe seu E-mail"
                />
              </FormGroup>
              <FormGroup>
                <label className="label" htmlFor="password">
                  Senha:
                </label>
                <input
                  className="form-control"
                  disabled={loading}
                  type="password"
                  name="password"
                  id="password"
                  onChange={handleChange}
                  value={form.password || ''}
                  placeholder="Informe sua senha"
                />
              </FormGroup>
              <SButton
                data-testing-id="funnel-survey-select_category-next"
                className="rounded-full px-6 py-2 shadow-redBtn hover:bg-gradient-l-primary-gradient-solid hover:text-white hover:border-none
            bg-gradient-l-primary-gradient text-white font-bold border-none
            "
                type="button"
                color={
                  isNotValid() || loading
                    ? 'style-button-disable'
                    : 'style-button'
                }
                disabled={isNotValid()}
                size="sm"
                onClick={submitForm}
              >
                {loading
                  ? (
                    <>
                      <Spinner size="sm" color="light" /> Carregando...
                    </>
                    )
                  : (
                      'Entrar'
                    )}

                <i className="icon-angle-right ml-2" />
              </SButton>
            </Form>
          </CardBody>
          <CardFooter className="text-muted">
            Não possui cadastro?
            <a className="linkSignin" href="/registrationclient">
              Cliente
            </a>
            <a className="linkSignin" href="/registrationprovider">
              Fornecedor
            </a>
          </CardFooter>
        </SCard>
      </Col>
    </Sign>
  )
}

export default SignIn

const SCard = styled(Card)`
  background-color: #fafafa;
  box-shadow: 0px 2px 15px 6px rgba(0, 0, 0, 0.11);
  padding-top: 15px;
  margin-top: 70px;
`

const SButton = styled(Card)`
  background-color: #fafafa;
  box-shadow: 0px 2px 15px 6px rgba(0, 0, 0, 0.11);
  padding-top: 15px;
  margin-top: 25px;
  width: 95px;
`
