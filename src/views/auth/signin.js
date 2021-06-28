import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'

import { signInAction } from '~/store/auth/auth.action'
import { useDispatch, useSelector } from 'react-redux'
import {
  SignBox,
  AvatarStyle,
  FormStyle,
  Submit,
  LoadingSubmit
} from './styles'


export default function SignIn() {
  const dispatch = useDispatch()
  const [form, setForm] = useState({})
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
              Não tem cadastro?
              <Link href="#" variant="body2">
                &ensp;Cadastre-se aqui
              </Link>
            </Grid>
          </Grid>
        </FormStyle>
      </SignBox>
    </Container>
  )
}
