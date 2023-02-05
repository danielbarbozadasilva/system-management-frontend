import React from 'react'
import { useDispatch } from 'react-redux'
import { createClient } from '../../../../store/client/client.action'
import FormSignUpClient from '../../../../components/portal/auth/signup/client/index'

const SignUpClient = () => {
  const dispatch = useDispatch()

  const submitForm = (form) => {
    dispatch(createClient(form))
  }

  return (
    <>
      <FormSignUpClient submit={submitForm} />
    </>
  )
}
export default SignUpClient
