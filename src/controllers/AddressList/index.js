import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useSession } from 'ordering-components'
import { useOrder } from 'ordering-components'
import { useApi } from 'ordering-components'
import { useCustomer } from 'ordering-components'
import systemConfig from '../../config.json'

/**
 * Component to control a address list
 * @param {object} props Props of AddressList component
 */
export const AddressList = (props) => {
  const {
    UIComponent,
    changeOrderAddressWithDefault,
    handleClickSetDefault,
    handleClickDelete
  } = props

  const [ordering] = useApi()
  const user = systemConfig.ordering_customer
  const token = systemConfig.ordering_customer.session.access_token
  const [, { setUserCustomer }] = useCustomer()
  const userId = user?.id
  const accessToken = token

  const [addressList, setAddressList] = useState({ loading: true, error: null, addresses: [] })
  const [actionStatus, setActionStatus] = useState({ loading: false, error: null })
  const [, { changeAddress }] = useOrder()
  const requestsState = {}

  /**
   * Function to load addresses from API
   */
  const loadAddresses = async () => {
    try {
      setAddressList({ ...addressList, loading: true })
      const source = {}
      requestsState.list = source
      const { content } = await ordering.setAccessToken(accessToken).users(userId).addresses().get({ cancelToken: source })
      setAddressList({
        loading: false,
        error: content.error ? content.result : null,
        addresses: content.error ? [] : Array.isArray(content.result) ? content.result : []
      })
    } catch (err) {
      if (err.constructor.name !== 'Cancel') {
        setAddressList({ ...addressList, loading: false, error: [err.message] })
      }
    }
  }

  useEffect(() => {
    loadAddresses()
    return () => {
      if (requestsState.list) {
        requestsState.list.cancel()
      }
    }
  }, [userId])

  /**
   * Function to make an address as default address
   * @param {object} address Address to make as default
   */
  const handleSetDefault = async (address, userCustomerSetup, sameAddress, dontSetUserCustomer) => {
    if (userCustomerSetup && !dontSetUserCustomer) {
      setUserCustomer({
        ...userCustomerSetup,
        address: address?.address,
        address_notes: address?.address_notes,
        internal_number: address?.internal_number,
        zipcode: address?.zipcode
      }, true)
    }
    if (handleClickSetDefault) {
      return handleClickSetDefault(address)
    }
    if (sameAddress) {
      changeAddress(address?.id)
      return
    }
    try {
      setActionStatus({ ...actionStatus, loading: true })
      const { content } = await ordering.setAccessToken(accessToken).users(userId).addresses(address.id).save({ default: true })
      setActionStatus({
        loading: false,
        error: content.error ? content.result : null
      })
      if (!content.error && content.result.default) {
        addressList.addresses.map(_address => {
          _address.default = _address.id === address.id
          return _address
        })
        if (changeOrderAddressWithDefault) {
          changeAddress(content.result.id)
        }
        setAddressList({ ...addressList })
      }
    } catch (err) {
      setActionStatus({ ...actionStatus, loading: false, error: [err.message] })
    }
  }
  /**
   * Function to delete an address
   * @param {object} address Address to delete
   */
  const handleDelete = async (address) => {
    if (handleClickDelete) {
      return handleClickDelete(address)
    }
    try {
      setActionStatus({ ...actionStatus, loading: true })
      const { content } = await ordering.users(userId).addresses(address.id).delete({ accessToken })
      setActionStatus({
        loading: false,
        error: content.error ? content.result : null
      })
      if (!content.error) {
        const addresses = addressList.addresses.filter(_address => {
          return _address.id !== address.id
        })
        setAddressList({ ...addressList, addresses })
      }
    } catch (err) {
      setActionStatus({ ...actionStatus, loading: false, error: [err.message] })
    }
  }

  return (
    <>
      {UIComponent && (
        <UIComponent
          {...props}
          addressList={addressList}
          setAddressList={setAddressList}
          actionStatus={actionStatus}
          handleSetDefault={handleSetDefault}
          handleDelete={handleDelete}
        />
      )}
    </>
  )
}

AddressList.propTypes = {
  /**
   * UI Component, this must be containt all graphic elements and use parent props
   */
  UIComponent: PropTypes.elementType,
  /**
   * Behavior when click on address
   * @param {object} address Addres that was clicked
   */
  handleClickAddress: PropTypes.func,
  /**
   * Custom set default address
   * @param {object} address Address to make to as default
   */
  handleClickSetDefault: PropTypes.func,
  /**
   * Custom delete address
   * @param {object} address Address to make to as default
   */
  handleClickDelete: PropTypes.func,
  /**
   * User id to get address from this user
   * If you don't provide one it is used by the current session by default
   */
  userId: PropTypes.number,
  /**
   * Access token to get addresses
   * If you don't provide one it is used by the current session by default
   */
  accessToken: PropTypes.string,
  /**
   * Components types before addresses list
   * Array of type components, the parent props will pass to these components
   */
  beforeComponents: PropTypes.arrayOf(PropTypes.elementType),
  /**
   * Components types after addresses list
   * Array of type components, the parent props will pass to these components
   */
  afterComponents: PropTypes.arrayOf(PropTypes.elementType),
  /**
   * Elements before addresses list
   * Array of HTML/Components elements, these components will not get the parent props
   */
  beforeElements: PropTypes.arrayOf(PropTypes.element),
  /**
   * Elements after addresses list
   * Array of HTML/Components elements, these components will not get the parent props
   */
  afterElements: PropTypes.arrayOf(PropTypes.element)
}

AddressList.defaultProps = {
  changeOrderAddressWithDefault: true,
  beforeComponents: [],
  afterComponents: [],
  beforeElements: [],
  afterElements: []
}
