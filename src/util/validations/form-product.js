export function isNotValid(form, formValidate) {
  const inputs = ['name', 'description', 'image', 'category', 'price']

  const invalid = (label) =>
    !Object.keys(form).includes(label) || form[label].length === 0

  const validations =
    Object.values(formValidate).filter((item) => item !== '').length > 0

  return inputs.some((item) => invalid(item)) || validations
}

export function fieldValidate(name, value) {
  let message = ''
  let regex = ''
  switch (name) {
    case 'name':
      regex = /\d/g
      if (regex.test(value)) {
        message += 'Não pode conter números!'
      } else if (value.trim() === '') {
        message += 'Não pode ser vazio!'
      } else if (value.length <= 5) {
        message += 'Precisa ter mais que 5 caracteres!'
      }
      break

    case 'description':
      regex = /\d/g
      if (regex.test(value)) {
        message += 'Nome não pode conter números!'
      } else if (value.trim() === '') {
        message += 'Nome não pode ser vazio!'
      } else if (value.length <= 10) {
        message += 'Precisa ter mais que 10 caracteres!'
      }
      break

    case 'price':
      if (value === 'R$0,0') {
        message += 'O preço não pode ser nulo!'
      }
      break

    case 'category':
      if (value == 0) {
        message += 'Selecione uma categoria!'
      }
      break
  }
  
  return message
}
