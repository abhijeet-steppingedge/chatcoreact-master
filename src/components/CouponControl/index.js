import React from 'react'
import { useLanguage, useOrder } from 'ordering-components'
import { CouponControl as CouponController } from '../../controllers/CouponControl';
import { useSelector } from 'react-redux'
import {
  CouponContainer
} from './styles'

import { Input } from '../styles/Inputs'
import { Button } from '../styles/Buttons'

import { Alert, Confirm } from 'ordering-ui'

const CouponControlUI = (props) => {
  const {
    couponDefault,
    couponInput,
    handleButtonApplyClick,
    handleRemoveCouponClick,
    onChangeInputCoupon,
    confirm,
    setConfirm,
    setAlertState,
    alertState,
    closeAlert,

  } = props

  const [, t] = useLanguage()
  const [orderState] = useOrder()
  const shop = useSelector(state => state.shop)

  const onRemoveCoupon = () => {
    setConfirm({
      open: true,
      content: t('QUESTION_DELETE_COUPON', 'Are you sure that you want to delete the coupon?')
    })
  }

  const handleOnAccept = () => {
    if (!confirm.error) {
      handleRemoveCouponClick && handleRemoveCouponClick()
    }
    setConfirm({ ...confirm, open: false, error: false })
    onChangeInputCoupon('')
  }

  const handleClose = () => {
    setConfirm({ ...confirm, open: false, error: false })
    onChangeInputCoupon('')
  }

  return (
    <>
      {props.beforeElements?.map((BeforeElement, i) => (
        <React.Fragment key={i}>
          {BeforeElement}
        </React.Fragment>))}
      {props.beforeComponents?.map((BeforeComponent, i) => (
        <BeforeComponent key={i} {...props} />))}
      <CouponContainer>
        {couponDefault ? (
          <Button onClick={() => onRemoveCoupon()}>
            {t('REMOVE_COUPON', 'Remove Coupon')} {couponDefault}
          </Button>
        ) : (
          <>
            <Input
              placeholder={t('DISCOUNT_COUPON', 'Discount coupon')}
              onChange={(e) => onChangeInputCoupon(e.target.value)}
              autoComplete='off'
            />
            <Button
              color='primary'
              disabled={!couponInput || orderState.loading || shop.offerId}
              onClick={handleButtonApplyClick}
            >
              {t('APPLY', 'Apply')}
            </Button>
          </>
        )}
        <Confirm
          title={t('COUPON', 'Coupon')}
          content={confirm?.content}
          acceptText={t('ACCEPT', 'Accept')}
          open={confirm?.open}
          onClose={handleClose}
          onCancel={!confirm?.error ? () => setConfirm({ ...confirm, open: false, error: false }) : null}
          onAccept={handleOnAccept}
          closeOnBackdrop={false}
        />
        <Alert
          title={t('COUPON_DETAILS', 'Coupon Details')}
          content={alertState.content}
          acceptText={t('ACCEPT', 'Accept')}
          open={alertState.open}
          onClose={() => closeAlert()}
          onAccept={() => closeAlert()}
          closeOnBackdrop={false}
        />
      </CouponContainer>
      {props.afterComponents?.map((AfterComponent, i) => (
        <AfterComponent key={i} {...props} />))}
      {props.afterElements?.map((AfterElement, i) => (
        <React.Fragment key={i}>
          {AfterElement}
        </React.Fragment>))}
    </>
  )
}

export const CouponControl = (props) => {
  const couponProp = {
    ...props,
    UIComponent: CouponControlUI
  }
  return (
    <CouponController {...couponProp} />
  )
}
