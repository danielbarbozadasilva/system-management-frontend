import React, { useState } from 'react'
import { TextField, Button, Grid, LinearProgress } from '@material-ui/core'
import { SBox, Image, Submit, SButton } from '../styled'
import { useSelector } from 'react-redux'
import { getUser } from '../../../../../config/storage'
import { makeStyles } from '@material-ui/core/styles'
import { formatPriceField } from '~/util/validations/price-validation'
import {
  fieldValidate,
  isNotValid
} from '../../../../../util/validations/form-category'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200
    }
  }
}))

const FormCategoryUpdate = ({ submit }) => {
  const classes = useStyles()
  const selected = useSelector((state) => state.category.selected)
  const [form, setForm] = useState({ ...selected })
  const [preview, setPreview] = useState(selected.image)
  const percent = useSelector((state) => state.product.upload?.percent || 0)
  const loading = useSelector((state) => state.product.loading)
  const [formValidate, setFormValidate] = useState({})

  const handleChange = (props) => {
    const { value, name } = props.target
    const message = fieldValidate(name, value)
    setFormValidate({ ...formValidate, [name]: message })
    setForm({
      ...form,
      [name]: value
    })
  }

  const submitForm = () => {
    const newForm = {
      ...form,
      category: form.category,
      provider: getUser().id,
      price: formatPriceField(form.price)
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
        <div>
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
        </div>
        <div>
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
            multiline
            minRows={2}
            maxRows={4}
          />
        </div>
        <Submit>
          {loading ? (
            <>
              <Grid container direction="column">
                <LinearProgress variant="determinate" value={percent} />
              </Grid>
            </>
          ) : (
            <SButton
              type="button"
              disabled={isNotValid(form, formValidate)}
              onClick={submitForm}
            >
              Atualizar
            </SButton>
          )}
        </Submit>
      </form>
    </SBox>
  )
}

export default FormCategoryUpdate
