import React, { useEffect, useState } from 'react'
import FcCancel from '@meronex/icons/fc/FcCancel'
import TiPencil from '@meronex/icons/ti/TiPencil'
import Skeleton from 'react-loading-skeleton'
import BsChevronDown from '@meronex/icons/bs/BsChevronDown'
import BsChevronUp from '@meronex/icons/bs/BsChevronUp'
import { Container, Header, SideForm, UserData } from './styles'
import { useTheme } from 'styled-components'

import {
  UserFormDetails as UserFormController,
  useLanguage,
  useSession
} from 'ordering-components'

import { UserFormDetailsUI } from '../UserFormDetails'

const UserDetailsUI = (props) => {
  const {
    isEdit,
    formState,
    cleanFormState,
    cartStatus,
    toggleIsEdit,
    validationFields,
    isUserDetailsEdit,
    isCustomerMode,
    userState,
    setUpdatingUser
  } = props
  const [, t] = useLanguage()
  const theme = useTheme()
  const [isShow, setIsShow] = useState(true);

  const user = localStorage.getItem('user');
  const userData = user ? JSON.parse(user) : null;

  useEffect(() => {
    if (isUserDetailsEdit) {
      !isEdit && toggleIsEdit()
    }
  }, [isUserDetailsEdit])

  const toggleEditState = () => {
    toggleIsEdit()
    cleanFormState({ changes: {} })
  }
  const toggleIsShow = () => {
    setIsShow(!isShow)
  }
  return (
    <>
      {props.beforeElements?.map((BeforeElement, i) => (
        <React.Fragment key={i}>
          {BeforeElement}
        </React.Fragment>))}
      {props.beforeComponents?.map((BeforeComponent, i) => (
        <BeforeComponent key={i} {...props} />))}
      {(validationFields.loading || formState.loading || userState.loading) && (
        <UserData>
          <Skeleton width={250} height={25} />
          <Skeleton width={180} height={25} />
          <Skeleton width={210} height={25} />
        </UserData>
      )}

      {!(validationFields.loading || formState.loading || userState.loading) && (
        <Container>
          <Header className='user-form'>
            <h1>{t('CUSTOMER_DETAILS', 'Customer Details')}</h1>
            {cartStatus !== 2 && (
              !isEdit ? (
                <TiPencil className='edit' onClick={() => toggleIsEdit()} />
              ) : (
                <FcCancel className='cancel' onClick={() => toggleEditState()} />
              )
            )
            }
          </Header>

          {isShow &&
            <>
              {!isEdit ? (
                <UserData>
                  {(userData?.name) && (
                    <p>
                      <strong>{t('NAME', 'Name')}:</strong> {userData?.name}
                    </p>
                  )}
                  {userData?.email && (
                    <p><strong>{t('EMAIL', 'Email')}:</strong> {userData?.email}</p>
                  )}
                  {(userData?.cellphone) && (
                    <p>
                      <strong>{t('CELLPHONE', 'Cellphone')}:</strong>
                      {(userData?.country_phone_code) && `+${(userData?.country_phone_code)} `}{(userData?.cellphone)}
                    </p>
                  )}
                </UserData>
              ) : (
                <SideForm>
                  <UserFormDetailsUI
                    {...props}
                    userData={userData}
                    isCustomerMode={isCustomerMode}
                    setUpdatingUser={setUpdatingUser}
                  />
                </SideForm>
              )}
            </>}
        </Container>
      )}
      {props.afterComponents?.map((AfterComponent, i) => (
        <AfterComponent key={i} {...props} />))}
      {props.afterElements?.map((AfterElement, i) => (
        <React.Fragment key={i}>
          {AfterElement}
        </React.Fragment>))}
    </>
  )
}

export const UserDetails = (props) => {
  const userDetailsProps = {
    ...props,
    UIComponent: UserDetailsUI
  }

  return <UserFormController {...userDetailsProps} />
}
