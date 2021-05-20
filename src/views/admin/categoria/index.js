import React, { useState } from 'react'
import {
  CssBaseline,
  TextField,
  Button,
  Grid,
  Paper,
  FormControlLabel,
  Switch,
  LinearProgress
} from '@material-ui/core'
import styled from 'styled-components'
import Title from '~/components/title'

const Categoria = () => {
  const [preview, setPreview] = useState('')
  const previewImg = (e) => {
    const file = e.target.files[0]
    const url = URL.createObjectURL(file)
    setPreview(url)
  }
  return (
    <>
      <Title title="Categoria" subTitle="Pagina de Categorias" />
      <Grid container spacing={2}>
        <CssBaseline />
        <Grid item md={12} xl={8}>
          <Form>
            <Content noValidate>
              {/* <FormControl fullWidth>
              <InputLabel htmlFor="my-input">Email address</InputLabel>
              <Input id="my-input" aria-describedby="my-helper-text" />
              <FormHelperText id="my-helper-text">
                We'll never share your email.
              </FormHelperText>
            </FormControl> */}
              {preview.length > 0
                ? (
                  <Grid container direction="column" md={2}>
                    <img src={preview} />
                    <Button onClick={() => setPreview({})} component="label">
                      Remove
                    </Button>
                  </Grid>
                  )
                : (
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    component="label"
                  >
                    Upload Foto
                    <input
                      accept="image/*"
                      type="file"
                      hidden
                      onChange={previewImg}
                    />
                  </Button>
                  )}

              <TextField
                size="small"
                margin="normal"
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Nome"
                name="nome"
                autoComplete="nome"
                autoFocus
              />
              <TextField
                size="small"
                multiline
                rows={3}
                rowsMax={6}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="senha"
                label="Descrição"
                type="password"
                id="senha"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked
                    onChange={(x) => console.log(x)}
                    name="status"
                    color="primary"
                  />
                }
                label="Status"
              />
              <Submit>
                <Button
                  size="small"
                  className="buttonSubmit"
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Enviar
                </Button>
                <Grid container direction="column">
                  <LinearProgress variant="determinate" value={98} />
                  carregando...
                </Grid>
              </Submit>
            </Content>
          </Form>
        </Grid>
      </Grid>
    </>
  )
}

export default Categoria

const Form = styled(Paper)`
  padding: 16px;
`

const Submit = styled.div`
  margin: ${({ theme: t }) => t.spacing(0.5)};
  .buttonSubmit {
    margin: ${({ theme: t }) => t.spacing(3, 0, 2)};
  }
`
const Content = styled.div`
  margin-bottom: 10px;
`
