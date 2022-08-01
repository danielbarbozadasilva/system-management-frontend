import React, { useState } from 'react'
import {
  TextField,
  Button,
  Grid,
  LinearProgress,
  Select,
  MenuItem,
  FormHelperText,
  FormControl
} from '@material-ui/core'
import { SBox, Image, Submit } from './styled'
import { useSelector } from 'react-redux'
import { getUser } from '../../../../config/storage'
import { makeStyles } from '@material-ui/core/styles'
import { getMoney } from '~/util/validations/price-validation'

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
  const percent = useSelector((state) => state.product.upload?.percent || 0)
  const loading = useSelector((state) => state.product.loading)
  const [formValidate, setFormValidate] = useState({})
  const categorias = useSelector((state) => state.category.all)

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
    const inputs = ['name', 'description', 'image', 'category', 'price']
    const invalid = (label) =>
      !Object.keys(form).includes(label) || form[label].length === 0

    const validate =
      Object.values(formValidate).filter((item) => item !== '').length > 0

    return inputs.some((item) => invalid(item)) || validate
  }

  const fieldValidate = (nome, value) => {
    let menssage = ''
    let regex = ''
    switch (nome) {
      case 'name':
        regex = /\d/g
        if (regex.test(value)) {
          menssage += 'Não pode conter números!'
        } else if (value.trim() === '') {
          menssage += 'Não pode ser vazio!'
        } else if (value.length <= 5) {
          menssage += 'Precisa ter mais que 5 caracteres!'
        }
        break

      case 'description':
        regex = /\d/g
        if (regex.test(value)) {
          menssage += 'Nome não pode conter números!'
        } else if (value.trim() === '') {
          menssage += 'Nome não pode ser vazio!'
        } else if (value.length <= 10) {
          menssage += 'Precisa ter mais que 10 caracteres!'
        }
        break

      case 'price':
        if (value === 'R$0,0') {
          menssage += 'O preço não pode ser nulo!'
        }
        break

      case 'category':
        if (value == 0) {
          menssage += 'Selecione uma categoria!'
        }
        break
    }
    setFormValidate({ ...formValidate, [nome]: menssage })
  }

  const handleSubmit = () => {
    const newForm = {
      ...form,
      category: form.category,
      provider: getUser().id,
      price: getMoney(form.price).replace('R$', '').replace(',', '.')
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
    <SBox>
      <form className={classes.root} noValidate autoComplete="off">
        {preview.length > 0 ? (
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
              Enviar Foto
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
          autoFocus
          size="small"
          error={!!formValidate.name}
          margin="normal"
          id="standard-error-helper-text"
          label="Nome"
          name="name"
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

        <TextField
          size="small"
          error={!!formValidate.price}
          margin="normal"
          name="price"
          label="Preço"
          type="text"
          id="standard-error-helper-text"
          value={getMoney(form.price) || ''}
          onChange={handleChange}
          helperText={formValidate.price || ''}
          disabled={loading}
        />

        <FormControl
          margin="normal"
          className={classes.formControl}
          style={{ padding: '5px 10px' }}
          error={form.category === 0}
        >
          <Select
            name="category"
            label="Categoria"
            inputProps={{
              name: 'category',
              id: 'outlined-native-simple'
            }}
            value={form.category || '0'}
            onChange={handleChange}
            disabled={loading}
          >
            <MenuItem value="0">Selecione</MenuItem>
            {categorias?.map(({ id, name }, i) => (
              <MenuItem key={i} value={id}>
                {name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText error>{formValidate.category || ''}</FormHelperText>
        </FormControl>
        <Submit>
          <Button
            size="small"
            disabled={isNotValid() || loading ? true : false}
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
    </SBox>
  )
}

export default Form

