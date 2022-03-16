import React, { useState } from 'react'
import {
  TextField,
  Button,
  Grid,
  Paper,
  LinearProgress,
  Select
} from '@material-ui/core'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { getUser } from '../../../config/storage'

const Form = ({ submit, ...props }) => {
  const [preview, setPreview] = useState('')
  const [form, setForm] = useState({
    status: false
  })

  const percent = useSelector((state) => state.product.upload?.percent || 0)
  const loading = useSelector((state) => state.product.loading)
  const categorias = useSelector((state) => state.category.all)
  const [isEdit, setEdit] = useState(false)

  if (Object.keys(props).length > 0 && !isEdit) {
    setPreview(process.env.REACT_APP_API + props?.data?.image)
    setForm(props.data)
    setEdit(true)
  }

  const handleChange = (props) => {
    const { value, name } = props.target
    setForm({
      ...form,
      [name]: value
    })
  }
  const handleSwitch = () => setForm({ ...form, status: !form.status })

  const handleSubmit = () => {
    const newForm = {
      ...form,
      category: form.category,
      provider: (getUser().id),
      price: (form.price).replace('R$', '').replace(',', '.'),
      image: form.image
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
      <Content noValidate>
        {preview.length > 0
          ? (
            <Grid container direction='column'>
              <Grid item sm={1} md={1} xl={1}>
                <Image src={preview} />
                <Button onClick={removeImage} component='label'>
                  Remove
                </Button>
              </Grid>
            </Grid>
            )
          : (
            <Button
              variant='contained'
              color='primary'
              size='small'
              component='label'
            >
              Enviar Foto
              <input
                accept='image/*'
                type='file'
                name='image'
                hidden
                onChange={previewImg}
              />
            </Button>
            )}
        <TextField
          size='small'
          margin='normal'
          variant='outlined'
          required
          fullWidth
          id='name'
          label='name'
          name='name'
          autoComplete='name'
          autoFocus
          value={form.name || ''}
          onChange={handleChange}
          disabled={loading}
        />
        <TextField
          size='small'
          multiline
          rows={3}
          rowsMax={6}
          variant='outlined'
          margin='normal'
          required
          fullWidth
          name='description'
          label='Descrição'
          type='text'
          id='description'
          disabled={loading}
          onChange={handleChange}
          value={form.description || ''}
        />

        <TextField
          size='small'
          margin='normal'
          variant='outlined'
          required
          fullWidth
          name='price'
          label='Preço'
          type='text'
          id='price'
          disabled={loading}
          onChange={handleChange}
          value={form.price || ''}
        />
        <Select
          size='small'
          variant='outlined'
          fullWidth
          native
          value={form.category || ''}
          onChange={handleChange}
          inputProps={{
            name: 'category',
            id: 'outlined-native-simple'
          }}
        >
          <option value=''>Selecione</option>
          {categorias?.map(({ id, name }, i) => (
            <option key={i} value={id}>
              {name}
            </option>
          ))}
        </Select>
        <Submit>
          <Button
            size='small'
            className='buttonSubmit'
            type='submit'
            variant='contained'
            color='primary'
            onClick={handleSubmit}
            disabled={loading}
          >
            {isEdit ? 'Atualizar' : 'Cadastrar'}
          </Button>
          <Grid container direction='column'>
            <LinearProgress variant='determinate' value={percent} />
            {loading && percent > 0 ? percent : ''}
          </Grid>
        </Submit>
      </Content>
    </Box>
  )
}

export default Form

const Content = styled.div`
  margin-bottom: 10px;
`

const Submit = styled.div`
  margin: ${({ theme: t }) => t.spacing(0.5)};
  .buttonSubmit {
    margin: ${({ theme: t }) => t.spacing(3, 0, 2)};
  }
`
const Box = styled(Paper)`
  padding: 16px;
`
const Image = styled.img`
  max-width: 170px;
  max-height: 170px;
  margin: 10px;
  border: thin solid #eee;
  border-radius: 20%;
  overflow: hidden;
  object-fit: cover;
`
