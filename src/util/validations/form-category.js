export function isNotValid(form, formValidate) {
  const inputs = ['name', 'description', 'image']

  const invalid = (label) =>
    !Object.keys(form).includes(label) || form[label].length === 0

  const validations =
    Object.values(formValidate).filter((item) => item !== '').length > 0

  return inputs.some((item) => invalid(item)) || validations
}

export function fieldValidate(name, value) {
  let message = ''
  const regex = /\d/g

  switch (name) {
    case 'name':
      if (regex.test(value)) {
        message += 'Não pode conter números!'
      } else if (value.trim() === '') {
        message += 'Não pode ser vazio!'
      } else if (value.length <= 5) {
        message += 'Precisa ter mais que 5 caracteres!'
      }
      break

    case 'description':
      if (regex.test(value)) {
        message += 'Nome não pode conter números!'
      } else if (value.trim() === '') {
        message += 'Nome não pode ser vazio!'
      } else if (value.length <= 10) {
        message += 'Precisa ter mais que 10 caracteres!'
      }
      break
  }

  return message
}
