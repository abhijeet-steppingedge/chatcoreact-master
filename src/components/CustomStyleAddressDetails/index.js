import React, { useState, useEffect } from 'react'
import { useOrder, useLanguage, useCustomer } from 'ordering-components'
import { AddressDetails as AddressDetailsController } from '../../controllers/CustomStyleAddressDetails'
import {
  AddressContainer,
  Map,
  Text,
  WrappMap
} from './styles'

import { Modal } from '../Modal'
import { AddressForm } from '../AddressForm'
import { Alert } from 'ordering-ui'

const CustomStyleAddressDetailsUI = (props) => {
  const {
    addressToShow,
    isCartPending,
    googleMapsUrl,
    business,
    isCustomerMode
  } = props

  const [orderState] = useOrder()
  const [, t] = useLanguage()
  const [openModal, setOpenModal] = useState(false)
  const [alertState, setAlertState] = useState({ open: false, content: [] })
  const userCustomer = JSON.parse(window.localStorage.getItem('user-customer'))
  const [{ user }] = useCustomer()

  const handleFindBusinesses = () => {
    if (!orderState?.options?.address?.location) {
      setAlertState({ open: true, content: [t('SELECT_AN_ADDRESS_TO_SEARCH', 'Select or add an address to search')] })
      return
    }
    setOpenModal(false)
  }

  useEffect(() => {
    return () => setOpenModal(false)
  }, [])

  return (
    <>
      {props.beforeElements?.map((BeforeElement, i) => (
        <React.Fragment key={i}>
          {BeforeElement}
        </React.Fragment>))}
      {props.beforeComponents?.map((BeforeComponent, i) => (
        <BeforeComponent key={i} {...props} />))}
      <Text>
        <h4 style={{ margin: '7px' }}>2. {t('SELECT_LOCATION', 'Select Location')} {orderState?.options?.type === 1 && !isCartPending && (
          <a onClick={() => setOpenModal(true)}>{t('CHANGE', 'Change')}</a>
        )}</h4>
      </Text>
      <AddressContainer>
        <WrappMap>
          <Map>
            <img src={googleMapsUrl} id='google-maps-image' alt='google-maps-location' width='288px' height='162px' loading='lazy' />
          </Map>
          <h4>{addressToShow || orderState?.options?.address?.address}</h4>
        </WrappMap>

        <Modal
          open={openModal}
          width='70%'
          onClose={() => setOpenModal(false)}
          closeOnBackdrop={false}
        >
          <AddressForm
            business={business}
            useValidationFileds
            address={orderState?.options?.address || {}}
            onCancel={() => setOpenModal(false)}
            onSaveAddress={() => setOpenModal(false)}
          />
        </Modal>

        <Alert
          title={t('ADDRESS', 'Address')}
          content={alertState.content}
          acceptText={t('ACCEPT', 'Accept')}
          open={alertState.open}
          onClose={() => setAlertState({ open: false, content: [] })}
          onAccept={() => setAlertState({ open: false, content: [] })}
          closeOnBackdrop={false}
        />
      </AddressContainer>
      {props.afterComponents?.map((AfterComponent, i) => (
        <AfterComponent key={i} {...props} />))}
      {props.afterElements?.map((AfterElement, i) => (
        <React.Fragment key={i}>
          {AfterElement}
        </React.Fragment>))}
    </>
  )
}

export const CustomStyleAddressDetails = (props) => {
  const addressDetailsProps = {
    ...props,
    UIComponent: CustomStyleAddressDetailsUI
  }
  return (
    <AddressDetailsController {...addressDetailsProps} />
  )
}
