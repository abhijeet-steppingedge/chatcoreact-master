import React from 'react'
import { ForgotPasswordForm } from 'ordering-ui/theme_two'
import { HelmetTags } from '../../components/HelmetTags'

export const ForgotPassword = (props) => {
  return (
    <>
      <HelmetTags page='forgotpassword' />
      <ForgotPasswordForm {...props} />
    </>
  )
}
