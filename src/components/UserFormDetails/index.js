import React, { useEffect, useState, useRef } from 'react'
import Skeleton from 'react-loading-skeleton'
import { useSession, useLanguage, useCustomer } from 'ordering-components'
import { useForm } from 'react-hook-form'
import parsePhoneNumber from 'libphonenumber-js'

import { FormInput, ActionsForm, SkeletonForm } from './styles'

import { Input } from '../styles/Inputs'
import { Button } from '../styles/Buttons'
import { InputPhoneNumber } from '../InputPhoneNumber'
import { Alert } from 'ordering-ui'
import { sortInputFields } from '../../utils'
import validationFields from '../../validationFields';
import { isRequiredField, showField } from '../../utils'

export const UserFormDetailsUI = (props) => {
  const {
    isEdit,
    formState,
    onCancel,
    cleanFormState,
    onCloseProfile,
    handleChangeInput,
    toggleIsEdit,
    isCheckout,
    userData,
    setUpdatingUser,
    isCustomerMode
  } = props
  const formMethods = useForm()
  const [, t] = useLanguage()

  const userFromStorage = localStorage.getItem('user');
  const localUser = userFromStorage ? JSON.parse(userFromStorage) : null;
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(null)
  const [userPhoneNumber, setUserPhoneNumber] = useState(null)
  const [alertState, setAlertState] = useState({ open: false, content: [] })
  const emailInput = useRef(null)
  const nameInput = useRef(null)

  const user = userData || localUser


  const closeAlert = () => {
    setAlertState({
      open: false,
      content: []
    })
    cleanFormState && cleanFormState({ result: { error: false } })
  }

  const showInputPhoneNumber = validationFields?.fields?.checkout?.cellphone?.enabled ?? false

  const setUserCellPhone = (isEdit = false) => {
    setUpdatingUser && setUpdatingUser(true)
    if (userPhoneNumber && !userPhoneNumber.includes('null') && !isEdit) {
      setUserPhoneNumber(userPhoneNumber)
      setUpdatingUser && setUpdatingUser(false)
      return
    }
    if (user?.cellphone) {
      let phone = null
      if (formState.result.error && formState.changes?.cellphone && formState.changes?.country_phone_code) {
        phone = `+${formState.changes?.country_phone_code} ${formState.changes?.cellphone}`
        setUserPhoneNumber(phone)
        setUpdatingUser && setUpdatingUser(false)
        return
      }
      if (user?.country_phone_code) {
        phone = `+${user?.country_phone_code} ${user?.cellphone}`
      } else {
        phone = user?.cellphone
      }
      setUserPhoneNumber(phone)
      setUpdatingUser && setUpdatingUser(false)
      return
    }
    setUserPhoneNumber(user?.cellphone || '')
    setUpdatingUser && setUpdatingUser(false)
  }

  const onSubmit = () => {
    setUpdatingUser && setUpdatingUser(true);
    const isPhoneNumberValid = userPhoneNumber ? isValidPhoneNumber : true
    if (!userPhoneNumber &&
      validationFields?.fields?.checkout?.cellphone?.enabled &&
      validationFields?.fields?.checkout?.cellphone?.required
    ) {
      setAlertState({
        open: true,
        content: [t('VALIDATION_ERROR_MOBILE_PHONE_REQUIRED', 'The field Phone Number is required.')]
      })
      return
    }
    if (!isPhoneNumberValid && userPhoneNumber) {
      if (user?.country_phone_code) {
        setAlertState({
          open: true,
          content: [t('INVALID_ERROR_PHONE_NUMBER', 'The Phone Number field is invalid')]
        })
        return
      }
      setAlertState({
        open: true,
        content: [t('INVALID_ERROR_COUNTRY_CODE_PHONE_NUMBER', 'The country code of the phone number is invalid')]
      })
      return
    }

    if (Object.keys(formState.changes).length > 0 && isPhoneNumberValid) {
      let changes = null
      if (user?.cellphone && !userPhoneNumber) {
        changes = {
          country_phone_code: '',
          cellphone: ''
        }
      }
      if (isCustomerMode) {
        localStorage.setItem('user', JSON.stringify({ ...user, ...formState.changes }));
        formState.changes = {}
        toggleIsEdit && toggleIsEdit()
        setUpdatingUser && setUpdatingUser(false)
      }
    }
  }

  const handleChangePhoneNumber = (number, isValid) => {
    setUserPhoneNumber(number)

    let phoneNumberParser = null
    let phoneNumber = {
      country_phone_code: {
        name: 'country_phone_code',
        value: ''
      },
      cellphone: {
        name: 'cellphone',
        value: ''
      }
    }
    if (isValid) {
      phoneNumberParser = parsePhoneNumber(number)
    }
    if (phoneNumberParser) {
      phoneNumber = {
        country_phone_code: {
          name: 'country_phone_code',
          value: phoneNumberParser.countryCallingCode
        },
        cellphone: {
          name: 'cellphone',
          value: phoneNumberParser.nationalNumber
        }
      }
    }
    handleChangeInput(phoneNumber, true)
  }

  const handleChangeInputName = (e) => {
    setUpdatingUser && setUpdatingUser(true)
    handleChangeInput && handleChangeInput({ target: { name: 'name', value: e.target.value } })
    formMethods.setValue('name', e.target.value)
    nameInput.current.value = e.target.value
    let userName = e.target.value;
    localStorage.setItem('user', JSON.stringify({ ...user, name: userName }))
    setUpdatingUser && setUpdatingUser(false)
  }
  const handleChangeInputEmail = (e) => {
    setUpdatingUser && setUpdatingUser(true)
    handleChangeInput && handleChangeInput({ target: { name: 'email', value: e.target.value.toLowerCase().replace(/[&,()%";:ç?<>{}\\[\]\s]/g, '') } })
    formMethods.setValue('email', e.target.value.toLowerCase().replace(/[&,()%";:ç?<>{}\\[\]\s]/g, ''))
    emailInput.current.value = e.target.value.toLowerCase().replace(/[&,()%";:ç?<>{}\\[\]\s]/g, '')
    let userEmail = e.target.value;
    localStorage.setItem('user', JSON.stringify({ ...user, email: userEmail }))
    setUpdatingUser && setUpdatingUser(false)
  }

  useEffect(() => {
    if (Object.keys(formMethods.errors).length > 0) {
      const content = Object.values(formMethods.errors).map(error => error.message)
      if (!isValidPhoneNumber && userPhoneNumber) {
        content.push(t('INVALID_ERROR_PHONE_NUMBER', 'The Phone Number field is invalid.'))
      }
      setAlertState({
        open: true,
        content
      })
    }
  }, [formMethods.errors])

  useEffect(() => {
    if (formState) {
      if ((!formState?.loading && formState?.result?.error)) {
        setAlertState({
          open: true,
          content: formState.result?.result || [t('ERROR', 'Error')]
        })
      }
    }
  }, [formState?.loading])

  useEffect(() => {
    if (formState) {
      if (!isEdit && onCloseProfile) {
        onCloseProfile()
      }
      if ((user || !isEdit) && !formState?.loading) {
        setUserCellPhone()
        if (!isEdit && !formState?.loading) {
          cleanFormState && cleanFormState({ changes: {} })
          setUserCellPhone(true)
        }
      }
    }
  }, [user, isEdit])

  useEffect(() => {
    if (formState) {
      if (!validationFields.loading && emailInput.current) {
        formMethods.setValue('email', formState?.result?.result
          ? formState?.result?.result?.email
          : formState?.changes?.email ?? (user && user?.email) ?? '')
      }
    }
  }, [validationFields, emailInput.current])

  useEffect(() => {
    if (formState) {
      if (!validationFields.loading && nameInput.current) {
        formMethods.setValue('name', formState?.result?.result
          ? formState?.result?.result?.name
          : formState?.changes?.name ?? (user && user?.name) ?? '')
      }
    }
  }, [validationFields, nameInput.current])

  useEffect(() => {
    formMethods.register('email', {
      required: isRequiredField('email')
        ? t('VALIDATION_ERROR_EMAIL_REQUIRED', 'The field Email is required').replace('_attribute_', t('EMAIL', 'Email'))
        : null,
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: t('INVALID_ERROR_EMAIL', 'Invalid email address').replace('_attribute_', t('EMAIL', 'Email'))
      }
    })
  }, [formMethods])

  return (
    <>
      {props.beforeElements?.map((BeforeElement, i) => (
        <React.Fragment key={i}>
          {BeforeElement}
        </React.Fragment>))}
      {props.beforeComponents?.map((BeforeComponent, i) => (
        <BeforeComponent key={i} {...props} />))}
      <FormInput onSubmit={formMethods.handleSubmit(onSubmit)} isCheckout={isCheckout}>

        <>
          {
            props.beforeMidElements?.map((BeforeMidElements, i) => (
              <React.Fragment key={i}>
                {BeforeMidElements}
              </React.Fragment>))
          }
          {
            props.beforeMidComponents?.map((BeforeMidComponents, i) => (
              <BeforeMidComponents key={i} {...props} />))
          }
          {sortInputFields({ values: validationFields?.fields?.checkout }).filter(field => !isCheckout ? field.code == 'name' : field).map(field =>
            showField && showField(field.code) && (
              <React.Fragment key={field.id}>
                {field.code != 'email' && field.code == 'name' && (
                  <Input
                    key={field.id}
                    type={field.type}
                    name={field.code}
                    className='form'
                    disabled={!isEdit}
                    placeholder={t('ENTER_YOUR_NAME_HERE', 'Enter your name here')}
                    defaultValue={
                      formState?.result?.result
                        ? formState?.result?.result[field.code]
                        : formState?.changes[field.code] ?? (user && user[field.code]) ?? ''
                    }
                    onChange={handleChangeInputName}
                    ref={(e) => {
                      nameInput.current = e
                    }}
                    autoComplete='off'
                  />
                )}
                {field.code === 'email' && field.code != 'name' && (
                  <Input
                    key={field.id}
                    type={field.type}
                    name={field.code}
                    className='form'
                    disabled={!isEdit}
                    placeholder={t(field.code.toUpperCase(), field?.name)}
                    defaultValue={
                      formState?.result?.result
                        ? formState?.result?.result[field.code]
                        : formState?.changes[field.code] ?? (user && user[field.code]) ?? ''
                    }
                    onChange={handleChangeInputEmail}
                    ref={(e) => {
                      emailInput.current = e
                    }}
                    autoComplete='off'
                  />
                )}
                {field.code != 'name' && field.code != 'email' && (
                  <Input
                    key={field.id}
                    type={field.type}
                    name={field.code}
                    className='form'
                    disabled={!isEdit}
                    placeholder={t(field.code.toUpperCase(), field?.name)}
                    defaultValue={
                      formState?.result?.result
                        ? formState?.result?.result[field.code]
                        : formState?.changes[field.code] ?? (user && user[field.code]) ?? ''
                    }
                    onChange={handleChangeInput}
                    ref={formMethods.register({
                      required: isRequiredField(field.code)
                        ? t(`VALIDATION_ERROR_${field.code.toUpperCase()}_REQUIRED`, `${field?.name} is required`).replace('_attribute_', t(field?.name, field.code))
                        : null
                    })}
                    autoComplete='off'
                  />
                )
                }

              </React.Fragment>
            )
          )}
          {isCheckout && !!showInputPhoneNumber && (
            <InputPhoneNumber
              user={user}
              value={userPhoneNumber}
              setValue={handleChangePhoneNumber}
              handleIsValid={setIsValidPhoneNumber}
              disabled={!isEdit}
            />
          )}
          {/* {!isCheckout && (
              <Input
                type='password'
                name='password'
                className='form'
                disabled={!isEdit}
                placeholder={t('FRONT_VISUALS_PASSWORD', 'Password')}
                onChange={handleChangeInput}
                ref={formMethods.register({
                  required: isRequiredField('password')
                    ? t('VALIDATION_ERROR_PASSWORD_REQUIRED', 'The field Password is required').replace('_attribute_', t('PASSWORD', 'Password'))
                    : null,
                  minLength: {
                    value: 8,
                    message: t('VALIDATION_ERROR_PASSWORD_MIN_STRING', 'The Password must be at least 8 characters.').replace('_attribute_', t('PASSWORD', 'Password')).replace('_min_', 8)
                  }
                })}
              />
            )} */}
          {
            props.afterMidElements?.map((MidElement, i) => (
              <React.Fragment key={i}>
                {MidElement}
              </React.Fragment>))
          }
          {
            props.afterMidComponents?.map((MidComponent, i) => (
              <MidComponent key={i} {...props} />))
          }
          <ActionsForm>
            {onCancel && (
              <Button
                outline
                type='button'
                onClick={() => onCancel(false)}
                disabled={formState.loading}
              >
                {t('CANCEL', 'Cancel')}
              </Button>
            )}

            {((formState && Object.keys(formState?.changes).length > 0 && isEdit) || formState?.loading) && (
              <Button
                id='form-btn'
                color='primary'
                type='submit'
                disabled={formState.loading}
              >
                {formState.loading ? t('UPDATING', 'Updating...') : t('UPDATE', 'Update')}
              </Button>
            )}
          </ActionsForm>
        </>
      </FormInput>
      <Alert
        title={t('PROFILE', 'Profile')}
        content={alertState.content}
        acceptText={t('ACCEPT', 'Accept')}
        open={alertState.open}
        onClose={() => closeAlert()}
        onAccept={() => closeAlert()}
        closeOnBackdrop={false}
      />
      {props.afterComponents?.map((AfterComponent, i) => (
        <AfterComponent key={i} {...props} />))}
      {props.afterElements?.map((AfterElement, i) => (
        <React.Fragment key={i}>
          {AfterElement}
        </React.Fragment>))}
    </>
  )
}
