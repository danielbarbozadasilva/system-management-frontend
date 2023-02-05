import React from 'react'
import { useDispatch } from 'react-redux'
import { signInAction } from '../../../store/auth/auth.action'
import FormSignIn from '../../../components/portal/auth/signin'

const SignIn = () => {
  const dispatch = useDispatch()

  const submitForm = (form) => {
    dispatch(signInAction(form))
  }

  return (
    <>
      <FormSignIn submit={submitForm} />
    </>
  )
}
export default SignIn
