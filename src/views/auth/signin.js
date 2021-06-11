import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import styled from 'styled-components'
import { signInAction } from '~/store/auth/auth.action'
import { useDispatch, useSelector } from 'react-redux'
import { CircularProgress } from '@material-ui/core'

export default function SignIn() {
  const dispatch = useDispatch()
  const [form, setForm] = useState({
    email: 'daniel80barboza@gmail.com',
    senha: 'daniel'
  })
  const loading = useSelector((state) => state.auth.loading)

  const handleChange = (props) => {
    const { value, name } = props.target
    setForm({
      ...form,
      [name]: value
    })
  }

  const submitForm = () => {
    dispatch(signInAction(form))
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <SignBox>
        <AvatarStyle>
          <LockOutlinedIcon />
        </AvatarStyle>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <FormStyle noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Informe seu endereço de e-mail"
            name="email"
            autoComplete="email"
            autoFocus
            value={form.email || ''}
            onChange={handleChange}
            disabled={loading}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="senha"
            label="Informe sua senha"
            type="password"
            id="senha"
            autoComplete="current-password"
            value={form.senha || ''}
            onChange={handleChange}
            disabled={loading}
          />
          <Submit>
            <Button
              size="large"
              className="buttonSubmit"
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={submitForm}
              disabled={loading}
            >
              {loading ? <LoadingSubmit size={24} /> : 'Entrar'}
            </Button>
          </Submit>
          <Grid container>
            <Grid item>
              Não possui cadastro?
              <Link href="/cliente_cadastro" variant="body2">
                &ensp;Cliente
                 </Link>
              <Link href="/fornecedor_cadastro" variant="body2">
                &ensp;Fornecedor
              </Link>
            </Grid>
          </Grid>
        </FormStyle>
      </SignBox>
    </Container>
  )
}
const SignBox = styled.div`
  margin-top: ${({ theme }) => theme.spacing(8)}px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const AvatarStyle = styled(Avatar)`
  margin: ${({ theme: t }) => t.spacing(1)}px;
  background-color: ${({ theme: t }) => t.palette.secondary.main};
`

const FormStyle = styled.form`
  width: 100%;
  margin-top: ${({ theme: t }) => t.spacing(1)};
`

const Submit = styled.div`
  margin: ${({ theme: t }) => t.spacing(0.5)};
  .buttonSubmit {
    margin: ${({ theme: t }) => t.spacing(3, 0, 2)};
  }
`
const LoadingSubmit = styled(CircularProgress)`
  color: ${({ theme: t }) => t.palette.primary};
`
