import React from 'react'
import { SignUpForm } from 'ordering-ui/theme_two'
import { HelmetTags } from '../../components/HelmetTags'

export const SignUp = (props) => {
  return (
    <>
      <HelmetTags page='signup' />
      <SignUpForm {...props} />
    </>
  )
}
