import React, { useState } from 'react'
import {
  TextField,
  Button,
  Grid,
  Paper,
  LinearProgress
} from '@material-ui/core'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200
    }
  }
}))

const Form = ({ submit, ...props }) => {
  const classes = useStyles()

  const [preview, setPreview] = useState('')
  const [form, setForm] = useState({})
  const [isEdit, setEdit] = useState(false)
  const percent = useSelector((state) => state.category.upload?.percent || 0)
  const loading = useSelector((state) => state.category.loading)
  const [formValidate, setFormValidate] = useState({})

  if (Object.keys(props).length > 0 && !isEdit) {
    setPreview(props?.data?.image)
    setForm(props.data)
    setEdit(true)
  }

  const handleChange = (props) => {
    const { value, name } = props.target
    fieldValidate(name, value)
    setForm({
      ...form,
      [name]: value
    })
  }

  const isNotValid = () => {
    const inputs = ['name', 'description', 'image']
    const invalid = (label) =>
      !Object.keys(form).includes(label) || form[label].length === 0

    const validate =
      Object.values(formValidate).filter((item) => item !== '').length > 0

    return inputs.some((item) => invalid(item)) || validate
  }

  const fieldValidate = (nome, value) => {
    let menssage = ''
    const regex = /\d/g

    switch (nome) {
      case 'name':
        if (regex.test(value)) {
          menssage += 'Não pode conter números!'
        } else if (value.trim() === '') {
          menssage += 'Não pode ser vazio!'
        } else if (value.length <= 5) {
          menssage += 'Precisa ter mais que 5 caracteres!'
        }
        break

      case 'description':
        if (regex.test(value)) {
          menssage += 'Nome não pode conter números!'
        } else if (value.trim() === '') {
          menssage += 'Nome não pode ser vazio!'
        } else if (value.length <= 10) {
          menssage += 'Precisa ter mais que 10 caracteres!'
        }
        break
    }
    setFormValidate({ ...formValidate, [nome]: menssage })
  }

  const handleSubmit = () => {
    const newForm = {
      ...form
    }
    submit(newForm)
  }

  const removeImage = () => {
    delete form.image
    setForm(form)
    setPreview('')
  }

  const previewImg = (props) => {
    const image = props.target.files[0]
    const url = URL.createObjectURL(image)
    setPreview(url)
    setForm({
      ...form,
      image
    })
  }

  return (
    <Box>
      <form className={classes.root} noValidate autoComplete="off">
        {preview?.length > 0 ? (
          <Grid container direction="column">
            <Grid item sm={1} md={1} xl={1}>
              <Image src={preview} />
              <Button onClick={removeImage} component="label">
                Remove
              </Button>
            </Grid>
          </Grid>
        ) : (
          <Grid container direction="column">
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
                name="image"
                hidden
                onChange={previewImg}
                disabled={loading}
              />
            </Button>
          </Grid>
        )}

        <TextField
          size="small"
          error={!!formValidate.name}
          margin="normal"
          id="standard-error-helper-text"
          label="Nome"
          name="name"
          autoFocus
          value={form.name || ''}
          onChange={handleChange}
          helperText={formValidate.name || ''}
          disabled={loading}
        />

        <TextField
          size="small"
          error={!!formValidate.description}
          margin="normal"
          name="description"
          label="Descrição"
          type="text"
          id="standard-error-helper-text"
          value={form.description || ''}
          onChange={handleChange}
          helperText={formValidate.description || ''}
          disabled={loading}
        />

        <Submit>
          <Button
            size="small"
            className={
              isNotValid() || loading
                ? 'buttonSubmit button-style-disable'
                : 'buttonSubmit button-style'
            }
            disabled={isNotValid()}
            type="submit"
            variant="contained"
            onClick={handleSubmit}
          >
            {isEdit ? 'Atualizar' : 'Enviar'}
          </Button>
          <Grid container direction="column">
            <LinearProgress variant="determinate" value={percent} />
          </Grid>
        </Submit>
      </form>
    </Box>
  )
}

export default Form

const Box = styled(Paper)`
  padding: 25px;
`
const Image = styled.img`
  max-width: 170px;
  max-height: 170px;
  margin: 10px;
  border: thin solid #eee;
  border-radius: 5%;
  overflow: hidden;
  object-fit: cover;
`

const Submit = styled.div`
  margin: ${({ theme: t }) => t.spacing(0.5)};
  .buttonSubmit {
    margin: ${({ theme: t }) => t.spacing(3, 0, 2)};
  }
`
