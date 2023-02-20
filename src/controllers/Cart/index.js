import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useOrder } from 'ordering-components'
import { useConfig } from 'ordering-components'
import { useApi } from 'ordering-components'
import { useSession } from 'ordering-components'
import { useToast, ToastType } from 'ordering-components'

export const Cart = (props) => {
  const {
    cart,
    UIComponent,
    handleEditProduct
  } = props

  /**
   * Order context manager
   */
  const [orderState, { updateProduct, removeProduct, clearCart, removeOffer }] = useOrder()

  /**
   * Config context manager
   */
  const [stateConfig] = useConfig()

  /**
   * Api context
   */
  const [ordering] = useApi()

  /**
   * Session content
   */
  const [{ token }] = useSession()

  /**
   * Toast state
   */
  const [, { showToast }] = useToast()

  /**
   * Comment state
   */
  const [commentState, setCommentState] = useState({ loading: false, result: null, error: null })

  /**
   * Total product in cart
   */
  const totalBalance = stateConfig.order?.quantity || 0

  /**
   * Max total product in cart by config
   */
  const maxCartProductConfig = (stateConfig.configs.max_product_amount ? parseInt(stateConfig.configs.max_product_amount) : 100) - totalBalance
  /**
   * Timeout for update cart comment
   */
  let timeout = null
  /**
   * Cart comment stagged
   */
  let previousComment
  /**
   * Calc balance by product id
   */
  const getProductMax = (product) => {
    const productMax = (product.inventoried ? product.stock : maxCartProductConfig)
    const max = product.quantity + productMax - product.balance
    return max < product.quantity ? product.quantity : max
  }

  /**
   * Calc balance by product id
   */
  const offsetDisabled = (product) => {
    const productMax = (product.inventoried ? product.stock : maxCartProductConfig)
    return productMax - (product.balance - product.quantity)
  }

  /**
   * change comment for cart
   */
  const handleChangeComment = (value) => {
    try {
      if (previousComment !== value) {
        clearTimeout(timeout)
        timeout = setTimeout(async function () {
          setCommentState({ ...commentState, loading: true })
          const uuid = cart?.uuid
          const response = await fetch(`${ordering.root}/carts/${uuid}`, {
            'Content-Type': 'application/json',
            method: 'PUT',
            body: JSON.stringify({
              comment: value
            }),
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          })
          const { result, error } = await response.json()
          if (error) {
            setCommentState({ ...commentState, loading: false, error: true, result })
            showToast(ToastType.Error, result)
            return
          }
          setCommentState({ ...commentState, loading: false, error: null, result })
        }, 750)
      }
      previousComment = value
    } catch (err) {
      setCommentState({ ...commentState, loading: false, error: true, result: err.message })
      showToast(ToastType.Error, err.message)
    }
  }

  /**
   * method to manage remove offer assigned
   */
  const handleRemoveOfferClick = (id) => {
    removeOffer({
      business_id: cart?.business_id,
      offer_id: id
    })
  }
  return (
    <>
      {UIComponent && (
        <UIComponent
          {...props}
          carts={orderState.carts}
          clearCart={clearCart}
          removeProduct={removeProduct}
          commentState={commentState}
          getProductMax={getProductMax}
          offsetDisabled={offsetDisabled}
          handleEditProduct={handleEditProduct}
          handleChangeComment={handleChangeComment}
          handleRemoveOfferClick={handleRemoveOfferClick}
        />
      )}
    </>
  )
}

Cart.propTypes = {
  /**
   * UI Component, this must be containt all graphic elements and use parent props
   */
  UIComponent: PropTypes.elementType,
  /**
   * Function to edit product behavior
   */
  handleEditProduct: PropTypes.func,
  /**
   * String filter to fetch validation fields
   */
  validationFieldsType: PropTypes.string
}
