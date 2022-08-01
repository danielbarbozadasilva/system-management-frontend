import React, { useState } from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import { signInAction } from '../../../store/auth/auth.action'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../../components/loading/index'
import { SForm, SColFooter, STextForm, SButton, STextLink } from '../styled'

const SignIn = (props) => {
  const dispatch = useDispatch()
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

  const submitForm = (event) => {
    event.preventDefault()
    dispatch(signInAction(form))
  }

  const isNotValid = () => form.email.length === 0 || form.password.length === 0

  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <SForm>
            <STextForm>Login</STextForm>
            <Form.Group className="mb-3">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                disabled={loading}
                type="text"
                name="email"
                id="email"
                onChange={handleChange}
                value={form.email || ''}
                placeholder="Informe o seu email"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                disabled={loading}
                type="password"
                name="password"
                id="password"
                onChange={handleChange}
                value={form.password || ''}
                placeholder="Informe a sua senha"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check type="checkbox" label="Lembrar credenciais" />
            </Form.Group>

            {loading ? (
              <>
                <Loading />
              </>
            ) : (
              <SButton
                type="button"
                disabled={isNotValid()}
                onClick={submitForm}
              >
                {!loading ? 'Entrar' : ''}
                <i className="icon-angle-right ml-2" />
              </SButton>
            )}

            <SColFooter className="text-muted">
              Não possui cadastro?{' '}
              <STextLink href="/registrationclient">Cliente</STextLink>
              <STextLink href="/registrationprovider">Fornecedor</STextLink>
            </SColFooter>
          </SForm>
        </Col>
      </Row>
    </Container>
  )
}
export default SignIn
