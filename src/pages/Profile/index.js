import React from 'react'
import { UserProfileForm } from 'ordering-ui/theme_two'
import { HelmetTags } from '../../components/HelmetTags'

export const Profile = (props) => {
  return (
    <>
      <HelmetTags page='profile' />
      <UserProfileForm {...props} />
    </>
  )
}
