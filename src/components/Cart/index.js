import React, { useState, useEffect } from 'react'
import { useOrder, useLanguage, useEvent, useUtils, useValidationFields, useConfig } from 'ordering-components'
import { Cart as CartController } from '../../controllers/Cart'
import { useTheme } from 'styled-components'
import { Button } from '../styles/Buttons'
import { ProductItemAccordion } from '../ProductItemAccordion'
import { BusinessItemAccordion } from '../BusinessItemAccordion'
import { Confirm } from 'ordering-ui'
import { OrderTypeSelectorHeader } from '../OrderTypeSelectorHeader'
import { Modal } from 'ordering-ui'
import { CouponControl } from 'ordering-ui'
import ProductForm from '../ProductForm'
import { UpsellingPage } from 'ordering-ui'
import { useWindowSize } from 'ordering-ui'
import { TaxInformation } from 'ordering-ui'
import { MomentControl } from '../MomentControl'
import FiMinusCircle from '@meronex/icons/fi/FiMinusCircle'
import FiPlusCircle from '@meronex/icons/fi/FiPlusCircle'
import VscTrash from '@meronex/icons/vsc/VscTrash'
import VscWarning from '@meronex/icons/vsc/VscWarning'

import {
  CartContainer,
  OrderBill,
  CheckoutAction,
  CouponContainer,
  CartSticky,
  WarningMessage,
  IconContainer,
  Spinner,
  CommentContainer,
  Divider,
  ProductActions,
  SectionProduct,
  ProductQuantity,
  SavedContainer
} from './styles'
import { verifyDecimals } from '../../utils'
import BsInfoCircle from '@meronex/icons/bs/BsInfoCircle'
import { TextArea } from '../styles/Inputs'
import { SpinnerLoader } from 'ordering-ui'
import MdCloseCircle from '@meronex/icons/ios/MdCloseCircle'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

const CartUI = (props) => {
  const {
    business,
    // currentCartUuid,
    // cart,
    clearCart,
    // isProducts,
    // changeQuantity,
    configTypes,
    getProductMax,
    offsetDisabled,
    removeProduct,
    onClickCheckout,
    isCheckout,
    isCartPending,
    isCartPopover,
    isForceOpenCart,
    isCartOnProductsList,
    handleCartOpen,
    handleChangeComment,
    handleRemoveOfferClick,
    commentState
  } = props

  const shop = props.shop;
  const cart = shop.cart;
  const addItemToCart = props.addItemToCart;
  const removeItemFromCart = props.removeItemFromCart;
  const changeQuantity = props.changeQuantity;
  const theme = useTheme()
  const [, t] = useLanguage()
  const [orderState] = useOrder()
  const [events] = useEvent()
  const history = useHistory()
  const [{ parsePrice, parseNumber, parseDate }] = useUtils()
  const [validationFields] = useValidationFields()
  const [{ configs }] = useConfig()

  const [confirm, setConfirm] = useState({ open: false, content: null, handleOnAccept: null, id: null, title: null })
  const [openProduct, setModalIsOpen] = useState(false)
  const [curProduct, setCurProduct] = useState({})
  const [openUpselling, setOpenUpselling] = useState(false)
  const [canOpenUpselling, setCanOpenUpselling] = useState(false)
  const [openTaxModal, setOpenTaxModal] = useState({ open: false, data: null, type: '' })
  const windowSize = useWindowSize()
  const isCouponEnabled = validationFields?.fields?.checkout?.coupon?.enabled

  const momentFormatted = !orderState?.option?.moment
    ? t('RIGHT_NOW', 'Right Now')
    : parseDate(orderState?.option?.moment, { outputFormat: 'YYYY-MM-DD HH:mm' })

  const handleDeleteClick = (product) => {
    setConfirm({
      open: true,
      content: t('QUESTION_DELETE_PRODUCT', 'Are you sure that you want to delete the product?'),
      title: null,
      handleOnAccept: () => {
        removeProduct(product, cart)
        setConfirm({ ...confirm, open: false })
      }
    })
  }
  const handleCheckoutAction = () => {
    history.push(`/checkout`);
  }

  const handleEditProduct = (product) => {
    setCurProduct(product)
    setModalIsOpen(true)
  }

  const handleClickCheckout = () => {
    events.emit('go_to_page', { page: 'checkout', params: { cartUuid: cart.uuid } })
    events.emit('cart_popover_closed')
    onClickCheckout && onClickCheckout()
  }

  const handleStoreRedirect = (slug) => {
    events.emit('go_to_page', { page: 'business', params: { store: slug } })
    if (windowSize.width <= 768) {
      onClickCheckout && onClickCheckout()
    }
  }

  useEffect(() => {
    events.emit('get_current_view')
    return () => {
      setConfirm({ ...confirm, open: false })
    }
  }, [])

  const handlerProductAction = (product) => {
    if (Object.keys(product).length) {
      setModalIsOpen(false)
    }
  }

  const handleClearProducts = () => {
    setConfirm({
      open: true,
      content: t('QUESTION_DELETE_PRODUCTS', 'Are you sure that you want to delete all products?'),
      title: null,
      handleOnAccept: () => {
        props.emptyCart()
        setConfirm({ ...confirm, open: false })
      }
    })
  }

  const handleUpsellingPage = () => {
    setOpenUpselling(false)
    setCanOpenUpselling(false)
    handleClickCheckout()
  }

  const getIncludedTaxes = () => {
    if (business?.tax_type == 2) {
      return (shop?.taxPercentage / 100) * shop?.totalPrice
    }
    return 0;
  }
  const getServiceFee = () => {
    return (shop?.serviceFeePrice / 100) * shop?.totalPrice
  }

  const increment = async (productId, productPrice, productQty) => {
    let qty = productQty + 1;
    props.changeQuantity(productId, qty, 'plus', productPrice)
    return;
  }
  const decrement = async (productId, productQty, productPrice) => {
    let qty = productQty - 1;
    if (qty >= 1) {
      props.changeQuantity(productId, qty, 'minus', productPrice)
    } else {
      props.removeItemFromCart(productId, productPrice)
    }
  }

  const getIncludedTaxesDiscounts = () => {
    return cart?.taxes?.filter(tax => tax?.type === 1)?.reduce((carry, tax) => carry + (tax?.summary?.tax_after_discount ?? tax?.summary?.tax), 0)
  }

  const onRemoveOffer = (id) => {
    setConfirm({
      open: true,
      content: t('QUESTION_DELETE_OFFER', 'Are you sure that you want to delete the offer?'),
      title: t('OFFER', 'Offer'),
      handleOnAccept: () => {
        setConfirm({ ...confirm, open: false })
        handleRemoveOfferClick(id)
      }
    })
  }

  return (
    <>
      {props.beforeElements?.map((BeforeElement, i) => (
        <React.Fragment key={i}>
          {BeforeElement}
        </React.Fragment>))}
      {props.beforeComponents?.map((BeforeComponent, i) => (
        <BeforeComponent key={i} {...props} />))}
      <CartContainer className='cart'>
        <CartSticky isCartOnProductsList={isCartOnProductsList}>
          <BusinessItemAccordion
            cart={cart}
            // orderTotal={props.shop.totalPrice + (business?.delivery_price ? business.delivery_price : 0) - props.shop.offerPrice}
            orderTotal={0}
            isCartPending={isCartPending}
            isCheckout={isCheckout}
            isClosed={false}
            isProducts={true}
            isValidProducts={true}
            isForceOpenAccordion={isForceOpenCart}
            isCartOnProductsList={isCartOnProductsList}
            handleClearProducts={handleClearProducts}
            handleStoreRedirect={handleStoreRedirect}
            handleCartOpen={handleCartOpen}
            business={business}
          >
            <div style={{ textAlign: 'center', marginTop: '15px', paddingLeft: '10px' }}>
              <OrderTypeSelectorHeader
                configTypes={configTypes}
                width={windowSize.width >= 440 ? '90%' : '85vw'}
              />
            </div>
            {isCheckout &&
              <div style={{ marginTop: '15px' }}>
                <h2 style={{ textAlign: 'center' }}>{business?.name}</h2>
              </div>
            }
            <div style={{ marginTop: '15px' }}>
              <MomentControl
                isModalBehavior
                business={business}
                disableOnClickMoment={isCheckout ? true : false}
              />
            </div>

            {cart.length > 0 ?
              (
                <> {cart?.length > 0 && cart?.map(product => (
                  <ProductItemAccordion
                    key={product.code}
                    isCartPending={false}
                    isCartProduct
                    product={product}
                    changeQuantity={changeQuantity}
                    getProductMax={getProductMax}
                    offsetDisabled={offsetDisabled}
                    onEditProduct={handleEditProduct}
                    increment={increment}
                    decrement={decrement}
                    onDeleteProduct={removeItemFromCart}
                  />
                ))}

                  {!isCheckout &&
                    <OrderBill>
                      <table>
                        <tbody>
                          <tr>
                            <td>{t('SUBTOTAL', 'Subtotal')}</td>
                            <td>{parsePrice(shop?.totalPrice)}</td>
                          </tr>
                          <tr>
                            <td>
                              <Divider />
                            </td>
                            <td>
                              <Divider />
                            </td>
                          </tr>
                          {getServiceFee() > 0 && (
                            <>
                              <tr>
                                <td>
                                  {t('SERVICE_FEE', 'Service fee')}
                                  <span>{`(${verifyDecimals(shop?.serviceFeePrice, parseNumber)}%)`}</span>
                                </td>
                                <td>{parsePrice(getServiceFee() || 0)}</td>
                              </tr>
                              <tr>
                                <td>
                                  <Divider />
                                </td>
                                <td>
                                  <Divider />
                                </td>
                              </tr>
                            </>
                          )
                          }
                          {getIncludedTaxes() > 0 && (
                            <>
                              <tr>
                                <td>
                                  {t('TAX', 'Tax')}
                                  <span>{`(${verifyDecimals(shop?.taxPercentage, parseNumber)}%)`}</span>
                                </td>
                                <td>{parsePrice(getIncludedTaxes() || 0)}</td>
                              </tr>
                              <tr>
                                <td>
                                  <Divider />
                                </td>
                                <td>
                                  <Divider />
                                </td>
                              </tr>
                            </>
                          )
                          }
                          {orderState?.options?.type === 1 && business?.delivery_price > 0 && (
                            <>
                              <tr>
                                <td>{t('DELIVERY_FEE', 'Delivery Fee')}</td>
                                <td>{parsePrice(business?.delivery_price)}</td>
                              </tr>
                              <tr>
                                <td>
                                  <Divider />
                                </td>
                                <td>
                                  <Divider />
                                </td>
                              </tr>
                            </>
                          )}
                          {shop?.offerPrice > 0 && shop?.totalPrice >= 0 && (
                            <tr>
                              <td>{t('DISCOUNT', 'Discount')}
                                {shop.offerRateType == 1 && <span>{`(${verifyDecimals(shop?.offerRate, parseNumber)}%)`}</span>}
                              </td>
                              <td>- {parsePrice(shop?.offerPrice || 0)}</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                      <table className='total'>
                        <tbody>
                          <tr>
                            <td>{t('TOTAL', 'Total')}</td>
                            <td>{parsePrice(shop?.totalPrice + getIncludedTaxes() + getServiceFee() + shop?.serviceFeePrice + (business?.delivery_price ? business.delivery_price : 0) - shop?.offerPrice >= 0 ? shop?.totalPrice + getIncludedTaxes() + getServiceFee() + (business?.delivery_price ? business.delivery_price : 0) - shop?.offerPrice : 0)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </OrderBill>
                  }

                  {(onClickCheckout || isForceOpenCart) && !isCheckout && (
                    <CheckoutAction>
                      <Button
                        className={`checkout ${(cart.length <= 0 || orderState.loading || (orderState?.options?.type == 1 && shop.totalPrice < business?.minimum)) ? 'disabled' : ''}`}
                        color='primary'
                        onClick={() => handleCheckoutAction()}
                        disabled={cart.length <= 0 || orderState.loading || (orderState?.options?.type == 1 && shop.totalPrice < business?.minimum)}
                      >
                        {orderState.loading ? (
                          <span>{t('LOADING', 'Loading')}</span>
                        ) : (
                          <span>
                            {t('PROCEED_TO_CHECKOUT', 'Proceed To Checkout')}
                          </span>
                        )}
                      </Button>
                    </CheckoutAction>
                  )}
                  {(orderState?.options?.type == 1 && shop.totalPrice < business?.minimum) &&
                    <WarningMessage style={{ marginTop: 20 }}>
                      <h1>
                        {t(`Minimum subtotal amount for delivery is ${parsePrice(business?.minimum)}`)}
                      </h1>
                    </WarningMessage>}
                </>
              )
              :
              (
                <div style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center', marginTop: 10 }}>
                  <img src={theme.images.general?.businessEmptyCart} alt='empty cart' />
                  <p>{t('ADD_ITEMS_TO_GET_STARTED', 'Add items to get started')}</p>
                </div>
              )
            }
          </BusinessItemAccordion>
          <Confirm
            title={confirm?.title ?? t('PRODUCT', 'Product')}
            content={confirm.content}
            acceptText={t('ACCEPT', 'Accept')}
            open={confirm.open}
            onClose={() => setConfirm({ ...confirm, open: false, title: null })}
            onCancel={() => setConfirm({ ...confirm, open: false, title: null })}
            onAccept={confirm.handleOnAccept}
            closeOnBackdrop={false}
          />
          {/* <Modal
            width='70%'
            open={openProduct}
            padding='0'
            closeOnBackdrop
            onClose={() => setModalIsOpen(false)}
          >
            <ProductForm
              isCartProduct
              productCart={curProduct}
              businessSlug={business?.slug}
              businessId={business?.id}
              categoryId={curProduct?.category_id}
              productId={curProduct?.id}
              onSave={handlerProductAction}
            />
          </Modal> */}
          <Modal
            width='70%'
            open={openTaxModal.open}
            padding='20px'
            closeOnBackdrop
            title={`${openTaxModal.data?.name ||
              t('INHERIT_FROM_BUSINESS', 'Inherit from business')} ${openTaxModal.data?.rate_type !== 2 ? `(${typeof openTaxModal.data?.rate === 'number' ? `${openTaxModal.data?.rate}%` : `${parsePrice(openTaxModal.data?.fixed ?? 0)} + ${openTaxModal.data?.percentage}%`})` : ''}  `}
            onClose={() => setOpenTaxModal({ open: false, data: null, type: '' })}
            modalTitleStyle={{ display: 'flex', justifyContent: 'center' }}
          >
            <TaxInformation
              type={openTaxModal.type}
              data={openTaxModal.data}
              products={cart.products}
            />
          </Modal>
          {openUpselling && (
            <UpsellingPage
              businessId={business?.id}
              cartProducts={cart.products}
              business={cart.business}
              handleUpsellingPage={handleUpsellingPage}
              openUpselling={openUpselling}
              canOpenUpselling={canOpenUpselling}
              setCanOpenUpselling={setCanOpenUpselling}
            />
          )}
        </CartSticky>
      </CartContainer>
      {
        props.afterComponents?.map((AfterComponent, i) => (
          <AfterComponent key={i} {...props} />))
      }
      {
        props.afterElements?.map((AfterElement, i) => (
          <React.Fragment key={i}>
            {AfterElement}
          </React.Fragment>))
      }
    </>
  )
}

const Cart = (props) => {
  const cartProps = {
    ...props,
    UIComponent: CartUI
  }

  return (
    <CartController {...cartProps} />
  )
}

const mapStateToProps = state => {
  return {
    shop: state.shop
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addItemToCart: (product) => dispatch({ type: 'ADD_TO_CART', payload: { product: product, code: product.code } }),
    removeItemFromCart: (productId, productPrice) => dispatch({ type: 'REMOVE_FROM_CART', payload: { code: productId, productPrice } }),
    changeQuantity: (productId, qty, operation, productPrice) => dispatch({ type: 'ADJUST_ITEM_QTY', payload: { code: productId, qty, operation, productPrice } }),
    emptyCart: () => dispatch({ type: 'EMPTY_CART' }),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Cart);
