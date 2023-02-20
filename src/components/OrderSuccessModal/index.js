import React, { useEffect, useState } from 'react'
import { useTheme } from 'styled-components'
import moment from 'moment'
import FiClock from '@meronex/icons/fi/FiClock'
import HiOutlineLocationMarker from '@meronex/icons/hi/HiOutlineLocationMarker'
import FaWhatsapp from '@meronex/icons/fa/FaWhatsapp';
import {
  useLanguage,
  useOrder,
  useUtils,
  useEvent
} from 'ordering-components'

import { getHourMin, getIconCard } from '../../utils'

import {
  Container,
  Title,
  StatusImage,
  OrderContent,
  OrderItem,
  ModalActions,
} from './styles'
import { Button } from '../styles/Buttons'
import { useDispatch } from 'react-redux'

export const OrderSuccessModal = (props) => {
  const {
    cardData,
    businessData,
    isCheckOut,
    products,
    order,
    isOrderDetail
  } = props

  const [, t] = useLanguage()
  const theme = useTheme()
  const [orderState] = useOrder()
  const [events] = useEvent()
  const dispatch = useDispatch()
  const [{ parseDate }] = useUtils()
  const [formattedTime, setFormattedTime] = useState('')
  const businessAddress = () => {
    if (isCheckOut && businessData) {
      return businessData?.address
    }

    if (isOrderDetail) {
      return JSON.parse(window.localStorage.getItem('business-address'))
    }

    return JSON.parse(window.localStorage.getItem('user-customer'))
  }

  const getProducts = () => {
    if (businessData && products.length > 0) {
      return products.length
    }
    return 1
  }
  const orderType = () => {
    let type = '';
    if (orderState?.options?.type == 1) {
      type = t('DELIVERY', 'Delivery');
    }
    if (orderState?.options?.type == 2) {
      type = t('PICKUP', 'Pickup');
    }
    if (orderState?.options?.type == 3) {
      type = t('EAT_IN', 'Dine-In');
    }
    return type
  }
  const convertH2M = (timeInHour) => {
    if (timeInHour) {
      var timeParts = timeInHour.split(":");
      return Number(timeParts[0]) * 60 + Number(timeParts[1]);
    }
    return 0;
  }
  const formatCurrentTime = (delivery_datetime) => {
    let currentTime = moment(delivery_datetime);
    let hours = orderState.options.type == 2 ? businessData?.pickup_time : businessData?.delivery_time;
    let minToAdd = convertH2M(hours)
    let formatted = currentTime;
    if (order?.status != 13) {
      formatted = currentTime.add(minToAdd, 'minutes');
    }
    if (formatted && (orderState.options.type == 1 || orderState.options.type == 2)) setFormattedTime(` (${formatted.format('hh:mm A')})`);
  }

  const goToOrderDetails = () => {
    dispatch({ type: 'EMPTY_CART' })
    events.emit('go_to_page', { page: 'order_detail', params: { orderId: order?.id }, replace: true })
  }

  const gotToWhatsApp = () => {
    let product_name = '';
    for (let i = 0; i < order?.products.length; i++) {
      product_name = product_name + order?.products[i].name + ' ';
    }
    product_name = product_name.replace(/(.+),$/, '$1');
    let currentTime = moment(order?.delivery_datetime);
    let hours = orderState.options.type == 2 ? businessData?.pickup_time : businessData?.delivery_time;
    let minToAdd = convertH2M(hours)
    let formatted = currentTime;
    if (order?.status != 13) {
      formatted = currentTime.add(minToAdd, 'minutes');
    }
    let time = ''
    if (formatted && (orderState.options.type == 1 || orderState.options.type == 2)) {
      // time = formatted.format('hh:mm A');
      time = formatted.format('DD MMM YYYY hh:mm A');
    }

    let url = `https://api.whatsapp.com/send/?phone=+6531294545&text=`;
    if (order.delivery_type == 1) {
      url += `*Order%23%20${order?.id}*%20%F0%9F%9B%B5%0A%0A%F0%9F%8E%89%F0%9F%8E%8A%F0%9F%93%A3%20Congratulations%20your%20*${orderType()}*%20%F0%9F%9B%B5%20Order%20successfully%20placed%20with%20${order?.business?.name}%0A%0A%E2%96%AA%20${product_name}%0A%0ATotal%3A%20%F0%9F%92%B0S%24%20${order?.summary?.total}%0A%0A%F0%9F%95%93%20Date%20%26%20Time%20%0A%20*${time}*%0A%0A----------------------------%0APayment%20by%20${order?.paymethod?.name}%0A%0A%F0%9F%93%92%20Note%20for%20kitchen%0A*${order?.comment}*`
    } else if (order.delivery_type == 2) {
      url += `*Order%23%20${order?.id}*%20%F0%9F%8F%AC%0A%0A%F0%9F%8E%89%F0%9F%8E%8A%F0%9F%93%A3%20Congratulations%20your%20*${orderType()}*%20%F0%9F%8F%AC%20Order%20successfully%20placed%20with%20${order?.business?.name}%0A%0A%E2%96%AA%20${product_name}%0A%0ATotal%3A%20%F0%9F%92%B0S%24%20${order?.summary?.total}%0A%0A%F0%9F%95%93%20Date%20%26%20Time%20%0A%20*${time}*%0A%0A----------------------------%0APayment%20by%20${order?.paymethod?.name}%0A%0A%F0%9F%93%92%20Note%20for%20kitchen%0A*${order?.comment}*`
    } else if (order.delivery_type == 3) {
      url += `*Order%23%20${order?.id}*%20%F0%9F%8F%AC%0A%0A%F0%9F%8E%89%F0%9F%8E%8A%F0%9F%93%A3%20Congratulations%20your%20*${orderType()}*%20%F0%9F%8F%AC%20Order%20successfully%20placed%20with%20${order?.business?.name}%0A%0AYour%20Table%23%3A%20${order?.customer?.internal_number}%0A%0A%E2%96%AA%20${product_name}%0A%0ATotal%3A%20%F0%9F%92%B0S%24%20${order?.summary?.total}%0A%0A%F0%9F%95%93%20Date%20%26%20Time%20%0A%20*${time}*%0A%0A-----------------------------%0APayment%20by%20${order?.paymethod?.name}%0A%0A%F0%9F%93%92%20Note%20for%20kitchen%0A*${order?.comment}*`
    }




    // let url = `https://api.whatsapp.com/send/?phone=+6531294545&text=
    // Order%23%20%7B${order?.id}%7D%20%F0%9F%8F%AC` +
    //   `%0A%0A` +
    //   `%F0%9F%8E%89%F0%9F%8E%8A%F0%9F%93%A3%20Congratulations%20your%20${orderType()}%20%F0%9F%8F%AC%20Order%20successfully%20placed%20with%20%7B${order.business?.name}%7D` +
    //   `%0A%0A` +
    //   `Your Table%23%3A%20%7B${order?.customer?.internal_number}%7D` +
    //   `%0A%0A` +
    //   `${product_name}` +
    //   `%0A` +
    //   `Total%3A%20%F0%9F%92%B0S%24%20%7B${order?.summary?.total}%7D` +
    //   `%0A%0A` +
    //   `-----------------------------` +
    //   `%0A` +
    //   `Payment by%20${order?.paymethod?.name}` +
    //   `%0A%0A
    //   +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //   ${orderType()}+Time+${time}+++++++++++++++
    //   ` +
    //   `%F0%9F%93%92%20Note%20for%20kitchen` +
    //   `%0A` +
    //   `%7B${order?.comment}%7D&app_absent=0`;

    // window.open(url, '_blank');
    window.location.href = url
  }


  useEffect(() => {
    if (businessData?.address) {
      localStorage.setItem('business-address', JSON.stringify(businessData?.address))
    }
  }, [businessData?.address])

  useEffect(() => {
    formatCurrentTime(order.delivery_datetime)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      gotToWhatsApp();
    }, 4000);
  }, [])


  return (
    <Container>
      <Title>
        <h3>{'Your order successfully placed with ' + businessData?.name}</h3>
      </Title>
      <OrderContent>
        <OrderItem>
          <span className='item-text'>{t('ORDER_NUMBER', 'Order Number')} : {order?.id}</span>
        </OrderItem>
        <OrderItem>
          <span className='item-text'>{t('ADDRESS', 'Address')} : {businessAddress()}</span>
        </OrderItem>
        {isCheckOut && products && orderState?.options?.type && (orderState?.options?.type === 1 || orderState?.options?.type === 2) && (
          <OrderItem>
            <span className='item-text'>
              {orderState?.options?.type === 1
                ? <>{t('DELIVERY_TIME', 'Delivery Time')}</>
                : <>{t('PICK_UP', 'Pick Time')}</>}
              :
              {formattedTime}
            </span>
          </OrderItem>
        )}
        {isCheckOut && cardData && cardData?.card && (
          <PaymentOptions card={cardData?.card} />
        )}
        {isCheckOut && (
          <OrderItem>
            <span className='item-text'> {t('NO_OF_PRODUCTS', 'No of Products')} : {getProducts()} </span>
          </OrderItem>
        )}
        {isCheckOut && Object.keys(order).length > 0 && (orderState?.options?.type === 1 || orderState?.options?.type === 2 || orderState?.options?.type === 1 || orderState?.options?.type === 3) && (
          <>
            {/* <OrderItem>
              <span className='item-icon'></span>
              <span className='item-text' style={{ display: 'flex', flexDirection: 'row' }}>
                <span>
                  {t('ORDER_ID', 'Order Id')}
                  <span style={{ fontSize: '12px', fontWeight: '500', color: theme.colors.mediumGray }}>
                    {t('NOTE_ORDER_ID_FOR_TRACKING', ' ( Please make sure to save this to track order )')}
                  </span>
                </span>
                <span>{order?.id}</span>
              </span>
            </OrderItem> */}
            {order.delivery_type != 3 &&
              <>
                <OrderItem>
                  <span className='item-text'>
                    {t('NAME', 'Customer Name')} : {order?.customer?.name}
                  </span>
                </OrderItem>
                <OrderItem>
                  <span className='item-text'>
                    {t('PHONE', 'Customer Phone')} : {order?.customer?.cellphone}
                  </span>
                </OrderItem>
                <OrderItem>
                  <span className='item-text'>
                    {t('EMAIL', 'Customer Email')} : {order?.customer?.email}
                  </span>
                </OrderItem>
              </>}
            <OrderItem>
              <span className='item-text'>
                {t('SPECIAL_COMMENTS', 'Special Notes')} : {order?.comment}
              </span>
            </OrderItem>
          </>
        )}
        {/* <ModalActions>
          <Button
            // className={`${(Object.keys(order).length <= 0) ? 'disabled' : ''}`}
            onClick={() => gotToWhatsApp()}
            // disabled={Object.keys(order).length <= 0 || orderState.loading}
            style={{ marginRight: '10px', background: '#25D366' }}
          >
            <div style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center', display: 'flex', flexDirection: 'row' }}>
              <div style={{ paddingTop: '7px', marginRight: '10px' }}><FaWhatsapp className='span-svg' size={20} /></div>
              {orderState.loading ? (
                <div>{t('LOADING', 'Loading')}</div>
              ) : (
                <div>
                  {t('GO_TO_WHATSAPP', 'Go To WhatsApp')}
                </div>
              )}
            </div>
          </Button>
          <Button
            className={`${(Object.keys(order).length <= 0) ? 'disabled' : ''}`}
            color='primary'
            onClick={() => goToOrderDetails()}
            disabled={Object.keys(order).length <= 0}
            style={{ marginLeft: '10px', paddingTop: '4px', paddingBottom: '2px' }}
          >
            <span>
              {t('GO_TO_WHATSAPP', 'Go To Order Details')}
            </span>
          </Button>
        </ModalActions> */}
      </OrderContent>
    </Container >
  )
}

export const PaymentOptions = (props) => {
  const {
    card
  } = props

  return (
    <>
      <OrderItem>
        <span className='item-icon card-icon'>
          {getIconCard(card?.brand)}
        </span>
        <span className='item-text'>
          XXXX-XXXX-XXXX-{card?.last4}
        </span>
      </OrderItem>
    </>
  )
}
