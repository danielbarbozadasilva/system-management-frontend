import React, { useState } from 'react'
import { Container, Row, Col, Form, Spinner } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { SFormSign, SColFooter, STextForm, SButton, STextLink } from '../styled'

const SignIn = ({ submit }) => {
  const loading = useSelector((state) => state.auth.loading)
  const [form, setForm] = useState({})

  const handleChange = (props) => {
    const { value, name } = props.target
    setForm({
      ...form,
      [name]: value
    })
  }

  const submitForm = () => {
    submit(form)
  }

  const isNotValid = () => form.email?.length === 0 || form.password?.length === 0

  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <SFormSign>
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
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Carregando...</span>
                </Spinner>
              </>
            ) : (
              <SButton
                type="button"
                disabled={isNotValid()}
                onClick={submitForm}
              >
                Entrar
              </SButton>
            )}

            <SColFooter className="text-muted">
              <h6>Não possui cadastro?</h6>
              <STextLink href="/registrationclient">Cliente</STextLink>
              <STextLink href="/registrationprovider">Fornecedor</STextLink>
            </SColFooter>
          </SFormSign>
        </Col>
      </Row>
    </Container>
  )
}
export default SignIn
