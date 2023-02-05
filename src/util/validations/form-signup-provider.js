import { ValidateCnpj } from './cnpj-validate'

export function isNotValid(form, formValidate) {
  const inputs = [
    'socialName',
    'fantasyName',
    'cnpj',
    'responsible',
    'phone',
    'address',
    'uf',
    'city',
    'email',
    'password',
    'confirmPassword'
  ]
  const invalid = (label) =>
    !Object.keys(form).includes(label) || form[label].length === 0

  const validations =
    Object.values(formValidate).filter((item) => item !== '').length > 0

  return inputs.some((item) => invalid(item)) || validations
}

export function fieldValidate(name, value, form) {
  let message = ''
  let regex = ''

  switch (name) {
    case 'socialName':
      regex = /\d/g
      if (regex.test(value)) {
        message += 'Não pode conter números!'
      } else if (value.trim() === '') {
        message += 'Não pode ser vazio!'
      } else if (value.length <= 3) {
        message += 'Precisa ter mais que 3 caracteres!'
      } else if (value.length >= 30) {
        message += 'Precisa ter menos que 30 caracteres!'
      }
      break

    case 'fantasyName':
      regex = /\d/g
      if (regex.test(value)) {
        message += 'Não pode conter números!'
      } else if (value.trim() === '') {
        message += 'Não pode ser vazio!'
      } else if (value.length <= 3) {
        message += 'Precisa ter mais que 3 caracteres!'
      } else if (value.length >= 30) {
        message += 'Precisa ter menos que 30 caracteres!'
      }
      break

    case 'cnpj':
      if (!ValidateCnpj(value)) {
        message += 'CNPJ inválido!'
      }
      break

    case 'responsible':
      regex = /\d/g
      if (regex.test(value)) {
        message += 'Não pode conter números!'
      } else if (value.trim() === '') {
        message += 'Não pode ser vazio!'
      } else if (value.length <= 5) {
        message += 'Precisa ter mais que 5 caracteres!'
      } else if (value.length >= 30) {
        message += 'Precisa ter menos que 30 caracteres!'
      }
      break

    case 'phone':
      let phone = value.trim().replaceAll('-', '').replaceAll('_', '')

      regex =
        /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/

      if (!regex.test(phone)) {
        message += 'Número de telefone inválido!'
      }
      break

    case 'address':
      if (value === '') {
        message += 'Campo em branco!'
      } else if (value.length <= 10) {
        message += 'Precisa ter menos que 10 caracteres!'
      } else if (value.length >= 30) {
        message += 'Precisa ter mais que 30 caracteres!'
      }
      break

    case 'uf':
      if (value === 'selecione') {
        message += 'Selecione uma uf!'
      }
      break

    case 'city':
      if (value === 'selecione') {
        message += 'Selecione uma cidade!'
      }
      break

    case 'email':
      regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

      if (!regex.test(value)) {
        message += 'E-mail inválido!'
      } else if (value.replace(' ', '') === '') {
        message += 'Campo em branco!'
      }
      break

    case 'password':
      if (value.length < 6) {
        message += 'Acima de 6 caracteres!'
      }
      break

    case 'confirmPassword':
      if (value?.length !== form.password?.length) {
        message += 'Senhas não conferem!'
      } else if (form.password !== value) {
        message += 'Senhas não conferem!'
      }
      break
  }

  return message
}
