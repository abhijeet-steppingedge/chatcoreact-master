import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useOrder } from 'ordering-components'
import { useLanguage } from 'ordering-components'
import { useCustomer } from 'ordering-components'
import { useConfig } from 'ordering-components'
import { useDispatch, useSelector } from 'react-redux'
import systemConfig from '../../config.json';
import Moment from 'moment'
import { extendMoment } from 'moment-range'
import { getFixedFromPercentage, getOrderTypetext, dateCheck } from '../../utils';

const moment = extendMoment(Moment)

/**
 * Component to manage coupon form behavior without UI component
 */
export const CouponControl = (props) => {
  const {
    businessId,
    price,
    UIComponent
  } = props

  const [{ configs }] = useConfig()
  const dispatch = useDispatch()
  const [orderState, { setStateValues }] = useOrder()
  const [confirm, setConfirm] = useState({ open: false, content: null, error: false })
  const [alertState, setAlertState] = useState({ open: false, content: [] })
  const [, t] = useLanguage()
  const shop = useSelector(state => state.shop)

  const couponDefault = shop.couponCode

  const [couponInput, setCouponInput] = useState(null)

  /**
   * method to manage coupon apply button
   */
  const handleButtonApplyClick = async () => {
    if (!configs?.advanced_offers_module?.value) {
      setStateValues({ ...orderState, loading: true })
      const requestOptions = { method: 'GET', headers: { Accept: 'application/json', 'x-api-key': systemConfig.api.key } };
      const response = await fetch(`https://apiv4.ordering.co/${systemConfig.api.version}/${systemConfig.api.language}/${systemConfig.project}/business/${businessId}/offers`, requestOptions)
      const { result, error } = await response.json();
      if (!error) {
        let offer = result.filter((bOffer) => bOffer?.coupon == couponInput)
        if (Object.keys(offer).length >= 1) {
          offer = offer[0]
          const offerPrice = offer.rate_type == 1 ? (offer.rate / 100) * shop.totalPrice : offer.rate;
          // var startDate = new Date(offer.start)
          //   , endDate = new Date(offer.end)
          //   , date = moment()
          //   , range = moment().range(startDate, endDate)
          //   , validDate = range.contains(date);
          let validDate = dateCheck(moment(offer.start), moment(offer.end), moment());
          console.log('validDate', validDate)

          let allowed = offer.order_types_allowed === null || (offer.order_types_allowed !== null && Object.values(offer.order_types_allowed).length && Object.values(offer.order_types_allowed).includes(orderState.options.type))
          if (!validDate || !offer.enabled || !allowed || shop.totalPrice < offer.minimum) {
            dispatch({ type: 'ADD_OFFER_RATE_TYPE', payload: null })
            dispatch({ type: 'ADD_OFFER_RATE', payload: 0 })
            dispatch({ type: 'ADD_OFFER_PRICE', payload: 0 })
            dispatch({ type: 'ADD_OFFER_ID', payload: null })
            dispatch({ type: 'ADD_COUPON_CODE', payload: null })
            let errors = [];
            if (!validDate) {
              errors.push(`This Coupon is only applicable from ${offer.start} to ${offer.end}`)
            }
            if (!offer.enabled) {
              errors.push(`This Coupon is not available!`)
            }
            if (!allowed) {
              let str_types = offer.order_types_allowed !== null && Object.keys(offer.order_types_allowed).length > 0 ? getOrderTypetext(offer.order_types_allowed) : 'Sorry, Coupon is not available!';
              errors.push(`This Coupon is only applicable for ${str_types}`)
            }
            if (shop.totalPrice < offer.minimum) {
              errors.push(`To use this coupon you must have a purchase of $ ${offer.minimum}`)
            }

            setAlertState({
              open: true,
              content: errors
            })
            setStateValues({ ...orderState, loading: false })
            return
          }
          dispatch({ type: 'ADD_OFFER_RATE', payload: offer.rate })
          dispatch({ type: 'ADD_OFFER_RATE_TYPE', payload: offer.rate_type })
          dispatch({ type: 'ADD_OFFER_PRICE', payload: offerPrice })
          dispatch({ type: 'ADD_OFFER_ID', payload: offer.id })
          dispatch({ type: 'ADD_COUPON_CODE', payload: offer.coupon })
          setCouponInput('')
        } else {
          const errors = [];
          errors.push(`Invalid Coupon Code!`)
          setAlertState({
            open: true,
            content: errors
          })
        }

      }
      setStateValues({ ...orderState, loading: false })
    }
  }

  /**
   * method to manage remove coupon assigned
   */
  const handleRemoveCouponClick = () => {
    dispatch({ type: 'ADD_OFFER_RATE_TYPE', payload: null })
    dispatch({ type: 'ADD_OFFER_RATE', payload: 0 })
    dispatch({ type: 'ADD_OFFER_PRICE', payload: 0 })
    dispatch({ type: 'ADD_OFFER_ID', payload: null })
    dispatch({ type: 'ADD_COUPON_CODE', payload: null })
    // applyCoupon({
    //   business_id: businessId,
    //   coupon: null
    // })
  }
  const closeAlert = () => {
    setAlertState({
      open: false,
      content: []
    })
  }
  useEffect(() => {
    if (price < 0) {
      handleRemoveCouponClick()
      setConfirm({ ...confirm, open: true, content: t('COUPON_TOTAL_ERROR', 'The total value of the cart with discount must be positive'), error: true })
    }
  }, [price])

  return (
    <>
      {UIComponent && (
        <UIComponent
          {...props}
          couponDefault={couponDefault}
          couponInput={couponInput}
          onChangeInputCoupon={(val => setCouponInput(val))}
          handleButtonApplyClick={handleButtonApplyClick}
          handleRemoveCouponClick={handleRemoveCouponClick}
          confirm={confirm}
          setConfirm={setConfirm}
          alertState={alertState}
          setAlertState={setAlertState}
          closeAlert={closeAlert}
        />
      )}
    </>
  )
}

CouponControl.propTypes = {
  /**
   * UI Component, this must be containt all graphic elements and use parent props
   */
  UIComponent: PropTypes.elementType,
  /**
   * isDisabled, flag to enable/disable coupon input
   */
  isDisabled: PropTypes.bool,
  /**
   * Components types before coupon control
   * Array of type components, the parent props will pass to these components
   */
  beforeComponents: PropTypes.arrayOf(PropTypes.elementType),
  /**
   * Components types after coupon control
   * Array of type components, the parent props will pass to these components
   */
  afterComponents: PropTypes.arrayOf(PropTypes.elementType),
  /**
   * Elements before coupon control
   * Array of HTML/Components elements, these components will not get the parent props
   */
  beforeElements: PropTypes.arrayOf(PropTypes.element),
  /**
   * Elements after coupon control
   * Array of HTML/Components elements, these components will not get the parent props
   */
  afterElements: PropTypes.arrayOf(PropTypes.element)
}

CouponControl.defaultProps = {
  beforeComponents: [],
  afterComponents: [],
  beforeElements: [],
  afterElements: []
}
