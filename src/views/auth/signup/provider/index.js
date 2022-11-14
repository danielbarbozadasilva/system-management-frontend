import React from 'react'
import { useDispatch } from 'react-redux'
import { createProvider } from '../../../../store/provider/provider.action'
import FormSignUpProvider from '../../../../components/portal/auth/signup/provider/index'

const SignUpProvider = () => {
  const dispatch = useDispatch()

  const submitForm = (form) => {
    dispatch(createProvider(form))
  }

  return (
    <>
      <FormSignUpProvider submit={submitForm} />
    </>
  )
}
export default SignUpProvider
