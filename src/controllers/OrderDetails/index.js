import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useSession } from 'ordering-components'
import { useApi } from 'ordering-components'
import { useWebsocket } from 'ordering-components'
import { useToast, ToastType } from 'ordering-components'
import { useLanguage } from 'ordering-components'
import { useEvent } from 'ordering-components'
import systemConfig from '../../config.json'
import { useParams } from 'react-router-dom'

export const OrderDetails = (props) => {
  const {
    order_id,
    cell_phone,
    business_slug,
    hashKey,
    UIComponent,
    userCustomerId,
    isFetchDrivers,
    driverAndBusinessId,
    sendCustomMessage,
    isDisabledOrdersRoom
  } = props

  const user = systemConfig.ordering_customer
  const token = systemConfig.ordering_customer.session.access_token

  const accessToken = props.accessToken || token
  const [ordering] = useApi()
  const [, t] = useLanguage()
  const [events] = useEvent()
  const { orderId, cellphone, businessSlug } = useParams()
  const [orderState, setOrderState] = useState({ order: props.order ?? null, businessData: {}, loading: !props.order, error: null })
  const [drivers, setDrivers] = useState({ drivers: [], loadingDriver: false, error: null })
  const [messageErrors, setMessageErrors] = useState({ status: null, loading: false, error: null })
  const [messages, setMessages] = useState({ loading: true, error: null, messages: [] })
  const socket = useWebsocket()
  const [driverLocation, setDriverLocation] = useState(props.order?.driver?.location || orderState.order?.driver?.location || null)
  const [messagesReadList, setMessagesReadList] = useState(false)
  const [driverUpdateLocation, setDriverUpdateLocation] = useState({ loading: false, error: null, newLocation: null })
  const [forceUpdate, setForceUpdate] = useState(null)

  const propsToFetch = []

  const deliveryMessages = {
    delivery: {
      text: 'outside delivery area, insert reasons to force update',
      value: 11
    },
    pickup: {
      text: 'outside pickup area, insert reasons to force update',
      value: 9
    },
  }

  const requestsState = {}

  /**
   * Method to format a price number
   * @param {Number} price
   */
  const formatPrice = price => price && `$ ${price.toFixed(2)}`

  /**
   * Method to Load message for first time
   */
  // const loadMessages = async () => {
  //   try {
  //     setMessages({ ...messages, loading: true })
  //     const url = (userCustomerId || driverAndBusinessId)
  //       ? `${ordering.root}/orders/${orderState.order?.id}/messages?mode=dashboard`
  //       : `${ordering.root}/orders/${orderState.order?.id}/messages`
  //     const response = await fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` } })
  //     const { error, result } = await response.json()
  //     if (!error) {
  //       setMessages({
  //         messages: result,
  //         loading: false,
  //         error: null
  //       })
  //     } else {
  //       setMessages({
  //         ...messages,
  //         loading: false,
  //         error: result
  //       })
  //     }
  //   } catch (error) {
  //     setMessages({ ...messages, loading: false, error: [error.Messages] })
  //   }
  // }

  /**
   * Method to send a message
   * @param {string} spot
   */
  const sendMessage = async (spot) => {
    if (sendCustomMessage) {
      return sendCustomMessage(spot)
    }
    try {
      setMessageErrors({
        ...messageErrors,
        loading: true
      })
      const { status } = await fetch(`${ordering.root}/orders/${orderState.order?.id}/messages`, {
        method: 'post',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          can_see: '0,2,3',
          comment: `I am on the parking number: ${spot}`,
          order_id: orderState.order?.id,
          type: 2
        })
      })
      setMessageErrors({
        ...messageErrors,
        loading: false,
        status
      })
    } catch (e) {
      setMessageErrors({
        ...messageErrors,
        loading: false,
        error: [e.message]
      })
    }
  }

  /**
   * Method to update differents orders status
  */
  const handleChangeOrderStatus = async (status, isAcceptOrReject = {}) => {
    try {
      const bodyToSend = Object.keys(isAcceptOrReject || {}).length > 0 ? isAcceptOrReject : { status }
      setOrderState({ ...orderState, loading: true })
      const { content: { result, error } } = await ordering.setAccessToken(token).orders(orderState.order?.id ?? order_id).save(bodyToSend)

      if (!error) {
        setOrderState({ ...orderState, order: result, loading: false })
      }
      if (error) {
        const selected = result.includes(deliveryMessages.delivery.text) ? deliveryMessages.delivery
          : result.includes(deliveryMessages.pickup.text)
            ? deliveryMessages.pickup
            : null
        if (selected) {
          setForceUpdate(null)
          setOrderState({ ...orderState, loading: false })
          setForceUpdate(selected.value)
        } else {
          const message = Array.isArray(result) ? result[0] : typeof result === 'string' ? result : 'INTERNAL_ERROR'
          const defaultMessage = message !== 'INTERNAL_ERROR' ? message : t('INTERNAL_ERROR', 'Internal Error')

          setOrderState({ ...orderState, error: [defaultMessage], loading: false })
        }
      }
    } catch (err) {
      setOrderState({ ...orderState, loading: false, error: [err?.message || t('NETWORK_ERROR', 'Network Error')] })
    }
  }

  const updateDriverPosition = async (newLocation = {}) => {
    try {
      setDriverLocation({ ...driverUpdateLocation, loading: true })
      const { content: { error, result } } = await ordering.setAccessToken(token).users(user?.id).driverLocations().save(newLocation)
      if (error) {
        setDriverUpdateLocation({ ...driverUpdateLocation, loading: false, error: [result[0] || result || t('ERROR_UPDATING_POSITION', 'Error updating position')] })
      } else {
        setDriverUpdateLocation({ ...driverUpdateLocation, loading: false, newLocation: { ...newLocation, ...result } })
      }
    } catch (error) {
      setDriverUpdateLocation({ ...driverUpdateLocation, loading: false, error: [error?.message || t('NETWORK_ERROR', 'Network Error')] })
    }
  }

  /**
     * Method to assign a driver for order
  */
  const handleAssignDriver = async (driverId) => {
    try {
      const bodyToSend = { driver_id: driverId }
      setOrderState({ ...orderState, loading: true })
      const { content: { error, result } } = await ordering
        .setAccessToken(token)
        .orders(orderState?.order?.id ?? order_id)
        .save(bodyToSend)

      setOrderState({
        ...orderState,
        loading: false,
        order: result,
        error: error ? result : null
      })
    } catch (e) {
      setOrderState({
        ...orderState,
        loading: false,
        error: e?.message ? drivers.error?.push(e?.message) : ['ERROR']
      })
    }
  }

  /**
   * handler send message with spot info
   * @param {number} param0
   */
  // const handlerSubmitSpotNumber = ({ spot }) => {
  //   sendMessage(spot)
  // }

  /**
   * Method to get order from API
   */
  const getOrder = async () => {
    const source = {}
    requestsState.order = source
    requestsState.business = source
    const options = {}
    if (hashKey) {
      options.headers = {
        'X-uuid-access-X': hashKey
      }
    }
    if (userCustomerId || driverAndBusinessId) {
      options.query = {
        mode: 'dashboard'
      }
    }
    try {
      // const { content: { error, result } } = await ordering.setAccessToken(token).orders(order_id).get({ ...options, cancelToken: source })
      const options = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'x-api-key': systemConfig.api.key
        }
      }
      const response = await fetch(`https://apiv4.ordering.co/${systemConfig.api.version}/${systemConfig.api.language}/${systemConfig.project}/orders/${orderId || order_id}?mode=dashboard`, options)
      const { error, result } = await response.json();
      let order = error ? null : result
      const err = error ? result : []
      let businessData = null
      try {
        const { content } = await ordering.setAccessToken(token).businesses(order.business_id).select(propsToFetch).get({ cancelToken: source })
        businessData = content.result
        content.error && err.push(content.result[0])
      } catch (e) {
        err.push(e.message)
      }
      let phone = cellphone || cell_phone;
      let slug = businessSlug || business_slug;
      if ((result?.customer?.cellphone != phone) || (businessData?.slug != slug)) {
        err.push(t('REQUESTED_ORDER_WAS_NOT_FOUND', 'Sorry, Requested order was not found'))
        businessData = null;
        order = null;
      }

      // if (isFetchDrivers) {
      //   getDrivers(order?.id ?? order_id)
      // }

      setOrderState({
        ...orderState,
        loading: false,
        order,
        businessData,
        error: err.length > 0 ? err : null
      })
    } catch (e) {
      setOrderState({
        ...orderState,
        loading: false,
        error: e.message ? orderState.error?.push(e?.message) : ['ERROR']
      })
    }
  }

  const readMessages = async () => {
    const messageId = messages?.messages[messages?.messages?.length - 1]?.id
    if (!messageId) return
    try {
      const response = await fetch(`${ordering.root}/orders/${orderState.order?.id}/messages/${messageId}/read`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      const { result } = await response.json()

      setMessagesReadList(result)
    } catch (e) {
      console.log(e.message)
    }
  }

  const getDrivers = async (order_id) => {
    try {
      setDrivers({ ...drivers, loadingDriver: true })
      const { content: { error, result } } = await ordering
        .setAccessToken(token)
        .controls(order_id)
        .get()

      setDrivers({
        ...drivers,
        loadingDriver: false,
        drivers: result.drivers,
        error: error ? result : null
      })
    } catch (e) {
      setDrivers({
        ...drivers,
        loadingDriver: false,
        error: e?.message ? drivers.error?.push(e?.message) : ['ERROR']
      })
    }
  }

  // useEffect(() => {
  //   !orderState.loading && loadMessages()
  // }, [order_id, orderState?.order?.status, orderState.loading])

  useEffect(() => {
    if (props.order) {
      setOrderState({
        ...orderState,
        loading: false,
        order: props.order
      })
    } else {
      getOrder()
    }

    return () => {
      if (requestsState.orders) {
        requestsState.orders.cancel()
      }
      if (requestsState.business) {
        requestsState.business.cancel()
      }
    }
  }, [props.order])

  // useEffect(() => {
  //   if (orderState.loading || loading) return
  //   const handleUpdateOrder = (order) => {
  //     if (order?.id !== orderState.order?.id) return
  //     showToast(ToastType.Info, t('UPDATING_ORDER', 'Updating order...'), 1000)
  //     delete order.total
  //     delete order.subtotal
  //     setOrderState({
  //       ...orderState,
  //       order: Object.assign(orderState.order, order)
  //     })

  //     // loadMessages()
  //   }
  //   const handleTrackingDriver = ({ location }) => {
  //     const newLocation = location ?? { lat: -37.9722342, lng: 144.7729561 }
  //     setDriverLocation(newLocation)
  //   }
  //   const ordersRoom = user?.level === 0 ? 'orders' : `orders_${userCustomerId || user?.id}`
  //   if (!isDisabledOrdersRoom) socket.join(ordersRoom)
  //   socket.join(`drivers_${orderState.order?.driver_id}`)
  //   socket.on('tracking_driver', handleTrackingDriver)
  //   socket.on('update_order', handleUpdateOrder)
  //   return () => {
  //     if (!isDisabledOrdersRoom) socket.leave(ordersRoom)
  //     socket.leave(`drivers_${orderState.order?.driver_id}`)
  //     socket.off('update_order', handleUpdateOrder)
  //     socket.off('tracking_driver', handleTrackingDriver)
  //   }
  // }, [orderState.order, socket, loading, userCustomerId])

  // useEffect(() => {
  //   if (messages.loading) return
  //   const handleNewMessage = (message) => {
  //     const found = messages.messages.find(_message => _message.id === message.id)
  //     if (!found) {
  //       setMessages({
  //         ...messages,
  //         messages: [...messages.messages, message]
  //       })
  //     }
  //   }
  //   socket.on('message', handleNewMessage)
  //   return () => {
  //     socket.off('message', handleNewMessage)
  //   }
  // }, [messages, socket, orderState.order?.status, userCustomerId])

  // useEffect(() => {
  //   const messagesOrdersRoom = user?.level === 0 ? 'messages_orders' : `messages_orders_${userCustomerId || user?.id}`
  //   socket.join(messagesOrdersRoom)
  //   return () => {
  //     // neccesary refactor
  //     if (!isDisabledOrdersRoom) socket.leave(messagesOrdersRoom)
  //   }
  // }, [socket, userCustomerId])

  useEffect(() => {
    const handleCustomerReviewed = (review) => {
      setOrderState({
        ...orderState,
        order: { ...orderState.order, user_review: review }
      })
    }
    events.on('customer_reviewed', handleCustomerReviewed)
    return () => {
      events.off('customer_reviewed', handleCustomerReviewed)
    }
  }, [orderState])

  return (
    <>
      {UIComponent && (
        <UIComponent
          {...props}
          order={orderState}
          updateDriverPosition={updateDriverPosition}
          driverLocation={driverLocation}
          messageErrors={messageErrors}
          formatPrice={formatPrice}
          handleAssignDriver={handleAssignDriver}
          // handlerSubmit={handlerSubmitSpotNumber}
          handleChangeOrderStatus={handleChangeOrderStatus}
          // messages={messages}
          drivers={drivers}
          setMessages={setMessages}
          // readMessages={readMessages}
          // messagesReadList={messagesReadList}
          driverUpdateLocation={driverUpdateLocation}
          setDriverUpdateLocation={setDriverUpdateLocation}
          forceUpdate={forceUpdate}
        />
      )}
    </>
  )
}

OrderDetails.propTypes = {
  /**
   * UI Component, this must be containt all graphic elements and use parent props
   */
  UIComponent: PropTypes.elementType,
  /**
   * This must be contains order_id to fetch
   */
  order_id: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  /**
   * Order, this must be contains an object with all order info
   */
  order: PropTypes.object,
  /**
   * Components types before order details
   * Array of type components, the parent props will pass to these components
   */
  beforeComponents: PropTypes.arrayOf(PropTypes.elementType),
  /**
   * Components types after order details
   * Array of type components, the parent props will pass to these components
   */
  afterComponents: PropTypes.arrayOf(PropTypes.elementType),
  /**
   * Elements before order details
   * Array of HTML/Components elements, these components will not get the parent props
   */
  beforeElements: PropTypes.arrayOf(PropTypes.element),
  /**
   * Elements after order details
   * Array of HTML/Components elements, these components will not get the parent props
   */
  afterElements: PropTypes.arrayOf(PropTypes.element)
}

OrderDetails.defaultProps = {
  beforeComponents: [],
  afterComponents: [],
  beforeElements: [],
  afterElements: []
}
