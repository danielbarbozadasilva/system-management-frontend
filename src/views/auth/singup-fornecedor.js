import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import { Link } from '@reach/router'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import UfCidade from '~/util/estados-cidades.json'

import { create as createCliente } from '~/store/cliente/cliente.action'
import { useDispatch, useSelector } from 'react-redux'
import { SignBox, FormStyle, Submit, LoadingSubmit } from './styles'
import { FormControl, Select } from '@material-ui/core'
import InputMask from 'react-input-mask'

const ClienteNovo = () => {
  const dispatch = useDispatch()
  const [uf, setUf] = useState([])
  const [cidades, setCidade] = useState([])
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
    dispatch(createCliente(form))
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

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <SignBox>
        <Typography component="h1" variant="h5">
          Cadastro de Fornecedor
        </Typography>
        <FormStyle noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="nome"
            label="Informe seu nome"
            name="nome"
            autoComplete="nome"
            autoFocus
            value={form.nome || ''}
            onChange={handleChange}
            disabled={loading}
            size="small"
          />
          <InputMask
            mask="99/99/9999"
            value={form.nascimento || ''}
            disabled={false}
            maskChar=" "
            onChange={handleChange}
          >
            {() => (
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="nascimento"
                label="Informe sua data de nascimento"
                name="nascimento"
                autoComplete="nascimento"
                autoFocus
                value={form.nascimento || ''}
                disabled={loading}
                size="small"
              />
            )}
          </InputMask>
          <Grid container spacing={2}>
            <Grid item sm={4} md={4} xl={4}>
              <FormControl
                variant="outlined"
                fullWidth
                size="small"
                margin="normal"
              >
                <Select
                  native
                  value={form.uf || ''}
                  onChange={handleChange}
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
              </FormControl>
            </Grid>
            <Grid item sm={8} md={8} xl={8}>
              <FormControl
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
                  onChange={handleChange}
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
              </FormControl>
            </Grid>
          </Grid>

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
            size="small"
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
            size="small"
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
              {loading ? <LoadingSubmit size={24} /> : 'Cadastrar'}
            </Button>
          </Submit>
          <Grid container>
            <Grid item>
              Já possui cadastro?
              <Link to="/signin" variant="body2">
                &ensp;Faça o Login
              </Link>
            </Grid>
          </Grid>
        </FormStyle>
      </SignBox>
    </Container>
  )
}

export default ClienteNovo

// "nome": "teste",
// "nascimento": "10/03/2012",
// "uf": "RJ",
// "cidade": "tanguá",
// "email": "cliente@email.com",
// "senha": "123123"
