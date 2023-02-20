import React, { useState, useEffect, useCallback, useRef, createRef } from 'react'
import Skeleton from 'react-loading-skeleton'
import { useLocation } from 'react-router-dom'
import Moment from 'moment'
import { extendMoment } from 'moment-range'
import FaRegClock from '@meronex/icons/fa/FaRegClock'
import { LanguageSelector } from 'ordering-ui'
import settings from '../../config.json'

import {
  useEvent,
  useLanguage,
  useOrder,
  useSession,
  useConfig,
  useUtils
} from 'ordering-components'
import { BusinessAndProductList } from '../../controllers/BusinessAndProductList'

import {
  Container,
  ProductsContainer,
  WrapContent,
  ProductLoading,
  SkeletonItem,
  WrapperSearch,
  WrappLayout,
  BusinessCartContainer,
  BusinessCartInnerContainer,
  ProductsHeader,
  DeliveryInfo,
  DeliveryTime,
  DeliveryPrice,
  BusinessHeader,
  WrapperBusinessLogo,
  BusinessLogo,
  BusinessContent,
  BusinessInfo,
  BusinessInfoItem,
  Preorder,
  FormInput,
  ActionsForm,
  TrackOrderSection,


} from './styles'

import { Alert, NotFoundSource } from 'ordering-ui'
import { BusinessBasicInformation } from '../BusinessBasicInformation'
// import { BusinessProductsCategories } from 'ordering-ui/theme_two'
import { BusinessProductsCategories } from '../BusinessProductsCategories'
import { BusinessProductsList } from '../BusinessProductsList'
import { AddressForm } from '../AddressForm'
// import { BusinessProductsList } from 'ordering-ui/theme_two'
import { PageNotFound } from 'ordering-ui'
import ProductForm from '../ProductForm'
import { FloatingButton } from 'ordering-ui'
import { Modal } from '../Modal'
import { SearchBar } from 'ordering-ui/theme_two'
import { UpsellingPage } from 'ordering-ui'
import Cart from '../Cart'
import { MomentControl } from '../MomentControl'
import { Select } from 'ordering-ui'
import { useWindowSize } from 'ordering-ui'
import { convertHoursToMinutes } from 'ordering-ui'
import { HeaderOption } from 'ordering-ui'
import { useTheme } from 'styled-components'
import { connect, useDispatch, useSelector } from 'react-redux'
import { UserFormDetailsUI } from '../UserFormDetails'
import { Button } from '../styles/Buttons'
import { Input } from '../styles/Inputs'
import { getOrderTypeInt, dateCheck } from '../../utils'
import systemConfig from '../../config.json'
import { useParams, useHistory } from 'react-router-dom'
import { OrderTypeSelectorHeader } from '../OrderTypeSelectorHeader'
import { CustomStyleAddressDetails } from '../CustomStyleAddressDetails'
import useIntersection from '../../hooks/useIntersection'

const mapConfigs = {
  mapZoom: 16,
  mapSize: {
    width: 640,
    height: 190
  }
}
const PIXELS_TO_SCROLL = 300
const moment = extendMoment(Moment)

const BusinessProductsListingUI = (props) => {
  const {
    errors,
    isInitialRender,
    businessState,
    categorySelected,
    searchValue,
    sortByValue,
    categoryState,
    categoryId,
    productId,
    productModal,
    getNextProducts,
    handleChangeCategory,
    handleUpdateInitialRender,
    updateProductModal,
    onProductRedirect,
    onCheckoutRedirect,
    handleChangeSearch,
    handleSearchRedirect,
    featuredProducts,
    handleChangeSortBy,
    isCartOnProductsList,
    errorQuantityProducts
  } = props

  const shop = useSelector(state => state.shop);
  const cart = shop.cart;
  const { business, loading, error } = businessState
  const [, t] = useLanguage()
  const [{ options }] = useOrder()
  const [orderState] = useOrder()
  const [, { changeAddress, setStateValues, changeMoment, changeType }] = useOrder()
  const [{ parsePrice, optimizeImage }] = useUtils()
  const [events] = useEvent()
  const [configState] = useConfig()
  const dispatch = useDispatch()
  const location = useLocation()
  const theme = useTheme()
  const windowSize = useWindowSize()
  const [openAddressForm, setOpenAddressForm] = useState(false)
  const [runChangeMoment, setRunChangeMoment] = useState(false)
  const [runChanges, setRunChanges] = useState(false)
  const [openProduct, setModalIsOpen] = useState(false)
  const [curProduct, setCurProduct] = useState(props.product)
  const [firstProduct, setFirstProduct] = useState({ product: null, hasOptions: false })
  const [openUpselling, setOpenUpselling] = useState(false)
  const [canOpenUpselling, setCanOpenUpselling] = useState(false)
  const [openBusinessInformation, setOpenBusinessInformation] = useState(false)
  const [alertState, setAlertState] = useState({ open: false, content: [], onAccept: function () { }, onClose: function () { } })
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [trackOrderModal, showTrackOrderModal] = useState(false)
  const [isFirstRender, setIsFirstRender] = useState(true)
  const [orderOptionsModalIsOpen, setOrderOptionsModalIsOpen] = useState(false)
  const [inputOrderId, setInputOrderId] = useState()
  const [userPhoneNumber, setUserPhoneNumber] = useState(null)
  const [cartModalOpen, setCartModalOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const businessCartContainerRef = createRef()
  const { orderTypeFromParams, locationFromParams } = useParams()
  const history = useHistory()
  const inViewPort = businessCartContainerRef ? useIntersection(businessCartContainerRef, '0px') : false;
  const isPreOrderSetting = configState?.configs?.preorder_status_enabled?.value === '1'
  const currentCart = Object.values(cart).find(cart => cart?.business?.slug === business?.slug) ?? {}
  const configTypes = configState.configs?.order_types_allowed?.value.split('|').map(value => Number(value)) || []
  const [customConfigTypes, setCustomConfigTypes] = useState({ isGetting: false, configTypes: configTypes })
  const [offer, setOffer] = useState({ price: 0, applicable: false })
  const sortByOptions = [
    { value: null, content: t('SORT_BY', 'Sort By'), showOnSelected: t('SORT_BY', 'Sort By') },
    { value: 'rank', content: t('RANK', 'Rank'), showOnSelected: t('RANK', 'Rank') },
    { value: 'a-z', content: t('A_to_Z', 'A-Z'), showOnSelected: t('A_to_Z', 'A-Z') }
  ]

  const handler = () => {
    setOpenBusinessInformation(true)
  }

  const closeAlert = () => {
    setAlertState({
      open: false,
      content: [],
      onAccept: closeAlert, onClose: closeAlert
    })
  }

  const getCustomConfigTypes = (menus) => {
    if (!menus || Object.keys(menus).length === 0) {
      return;
    }
    let array = [];
    setCustomConfigTypes({ isGetting: true, configTypes: configTypes });
    menus.forEach((menu) => {
      if (menu.enabled) {
        if (menu.delivery && !array.includes(1)) {
          array.push(1);
        }
        if (menu.pickup && !array.includes(2)) {
          array.push(2);
        }
        if (menu.eatin && !array.includes(3)) {
          array.push(3);
        }
        if (menu.curbside && !array.includes(4)) {
          array.push(4);
        }
        if (menu.driver_thru && !array.includes(5)) {
          array.push(5);
        }
      }
      if (isFirstRender && !orderTypeFromParams) {
        setIsFirstRender(false)
        if (shop.orderType) {
          // changeType(shop.orderType)
        } else {
          // changeType(array[0])
          options.type = array[0];
          setStateValues({ options });
        }
      }
    })
    setCustomConfigTypes({ isGetting: false, configTypes: array });
  }
  const onProductClick = async (product, hasOptions) => {
    if (cart.length === 0 && !orderTypeFromParams) {
      await setFirstProduct({ product: product, hasOptions: hasOptions });
      await setOrderOptionsModalIsOpen(true);
      dispatch({ type: 'ADD_FIRST_PRODUCT', payload: { product: product, hasOptions: hasOptions } })

      // orderState.address = ''
      // orderState.location = {}
      // await changeAddress({ ...orderState })
      return;
    }
    if (hasOptions) {
      onProductRedirect({
        slug: business?.slug,
        product: product.id,
        category: product.category_id
      })
      setCurProduct(product)
      setModalIsOpen(true)
      events.emit('product_clicked', product)
    } else {
      product['selected_ingredients'] = {};
      product['options'] = {};
      dispatch({ type: 'ADD_TO_CART', payload: { product: product, code: product.code, business: business, } });
    }
  }
  const onProductClickCustom = async (product, hasOptions) => {
    if (options.type == 1 && (!options?.address?.location || !options?.address?.address)) {
      setAlertState({
        open: true,
        content: ['Address Field is Required For Delivery Type'],
        onAccept: closeAlert, onClose: closeAlert
      })
      return
    }
    setFirstProduct({ product: null, hasOptions: false });
    setOrderOptionsModalIsOpen(false)
    dispatch({ type: 'ADD_FIRST_PRODUCT', payload: {} })
    if (product) {
      if (hasOptions) {
        await onProductRedirect({
          slug: business?.slug,
          product: product.id,
          category: product.category_id
        })
        setCurProduct(product)
        setModalIsOpen(true)
        events.emit('product_clicked', product)
      } else {
        product['selected_ingredients'] = {};
        product['options'] = {};
        dispatch({ type: 'ADD_TO_CART', payload: { product: product, code: product.code, business: business, } });
      }
    }
  }

  const handlerProductAction = (product) => {
    if (Object.keys(product).length) {
      setModalIsOpen(false)
      onProductRedirect({
        slug: business?.slug
      })
    }
  }

  const closeModalProductForm = () => {
    setModalIsOpen(false)
    handleUpdateInitialRender(false)
    updateProductModal(null)
    setCurProduct(null)
    onProductRedirect({
      slug: business?.slug
    })
  }

  const handleScroll = useCallback(() => {
    const innerHeightScrolltop = window.innerHeight + document.documentElement?.scrollTop + PIXELS_TO_SCROLL
    const badScrollPosition = innerHeightScrolltop < document.documentElement?.offsetHeight
    const hasMore = !(categoryState.pagination.totalPages === categoryState.pagination.currentPage)
    if (badScrollPosition || categoryState.loading || !hasMore) return
    getNextProducts()
  }, [categoryState])

  const handleChangePage = (data) => {
    if (Object.entries(data.query).length === 0 && openProduct) {
      setModalIsOpen(false)
    }
  }

  const handleUpsellingPage = () => {
    onCheckoutRedirect(currentCart?.uuid)
    setOpenUpselling(false)
    setCanOpenUpselling(false)
  }

  const closeOrderOptionsModal = () => {
    setOrderOptionsModalIsOpen(false)
  }

  const getOfferPrice = () => {
    if (loading) return;
    if (business?.offers && !shop.couponCode) {
      let flag = false;
      business.offers.forEach(bOffer => {
        let validDate = dateCheck(moment(bOffer.start), moment(bOffer.end), moment());
        let allowed = bOffer.order_types_allowed === null || (bOffer.order_types_allowed !== null && Object.values(bOffer.order_types_allowed).length && Object.values(bOffer.order_types_allowed).includes(options.type));
        if (allowed && validDate && bOffer.enabled && shop.totalPrice >= bOffer.minimum) {
          let price = bOffer.rate_type == 1 ? (bOffer.rate / 100) * shop.totalPrice : bOffer.rate;
          dispatch({ type: 'ADD_OFFER_RATE_TYPE', payload: bOffer.rate_type })
          dispatch({ type: 'ADD_OFFER_RATE', payload: bOffer.rate })
          dispatch({ type: 'ADD_OFFER_PRICE', payload: price })
          dispatch({ type: 'ADD_OFFER_ID', payload: bOffer.id })
          flag = true;
        }
      });
      if (!flag) {
        dispatch({ type: 'ADD_OFFER_RATE_TYPE', payload: null })
        dispatch({ type: 'ADD_OFFER_RATE', payload: 0 })
        dispatch({ type: 'ADD_OFFER_PRICE', payload: 0 })
        dispatch({ type: 'ADD_OFFER_ID', payload: null })
      }
    }
  }

  const handleChangeInput = (e) => {
    if (e.target.name == 'order_id') {
      setInputOrderId(e.target.value)
    }
    if (e.target.name == 'cellphone') {
      setUserPhoneNumber(e.target.value)
    }
  }
  const handleGoToDetailsPage = () => {
    events.emit('go_to_page', { page: 'order_detail', params: { orderId: inputOrderId, cellphone: userPhoneNumber, businessSlug: business?.slug }, replace: true })
  }

  const handleViewOrderAction = () => {
    setCartModalOpen(true);
    // businessCartContainerRef.current.scrollIntoView({ behavior: "smooth" });
  }


  const checkOrderExist = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const options = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'x-api-key': systemConfig.api.key
        }
      }
      const response = await fetch(`https://apiv4.ordering.co/${systemConfig.api.version}/${systemConfig.api.language}/${systemConfig.project}/orders/${inputOrderId}?mode=dashboard`, options)
      const { error, result } = await response.json();
      setSubmitting(false);
      if (error) {
        setAlertState({
          open: true,
          content: result,
          onAccept: closeAlert, onClose: closeAlert
        })
        return;
      }
      if (result?.customer?.cellphone != userPhoneNumber) {
        setAlertState({
          open: true,
          content: [t('REQUESTED_ORDER_WAS_NOT_FOUND', 'Requested order was not found')],
          onAccept: closeAlert, onClose: closeAlert
        })
        return;
      }
      handleGoToDetailsPage()
    } catch (error) {
      setSubmitting(false);
      console.log(error)
    }
  }

  useEffect(() => {
    !loading ? getOfferPrice() : null
  }, [orderState, businessState, shop.totalPrice])


  useEffect(() => {
    if (categoryId && productId && isInitialRender) {
      if (productModal?.product?.id) {
        setCurProduct(productModal.product)
      }
      setModalIsOpen(true)
    }
  }, [productModal])

  useEffect(() => {
    window.scrollTo(0, 0)
    if (categoryId && productId) {
      handleUpdateInitialRender(true)
    }
    events.emit('get_current_view')
  }, [])

  useEffect(() => {
    events.on('change_view', handleChangePage)
    return () => {
      events.off('change_view', handleChangePage)
    }
  }, [openProduct])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])
  useEffect(() => {
    !loading ? getCustomConfigTypes(business?.menus) : null;
    if (!loading && business !== null && business !== undefined && Object.keys(business).length > 0) {
      dispatch({ type: 'ADD_BUSINESS', payload: business });
      dispatch({ type: 'ADD_TAX', payload: business?.tax });
      dispatch({ type: 'ADD_SERVICE_FEE', payload: business?.service_fee });
    }
  }, [business])

  const redirectToBusinessSlug = () => {
    closeAlert();
    history.push('/' + business?.slug)
  }
  const handleChanges = async () => {
    if (orderState.loading || loading) {
      setRunChanges(!runChanges)
      return;
    }
    if (orderTypeFromParams) {
      let intOrderType = getOrderTypeInt(orderTypeFromParams);
      if (intOrderType === 0 || (intOrderType === 1 && !locationFromParams)) {
        let err = [];
        if (intOrderType === 0) {
          err.push('Order type is not valid!');
        }
        if (intOrderType === 1 && !locationFromParams) {
          err.push('No Delivery Location Provided!');
        }
        setAlertState({
          open: true,
          content: err,
          onAccept: redirectToBusinessSlug,
          onClose: redirectToBusinessSlug,
        })
        return;
      }
      // changeType(intOrderType);
      options.type = intOrderType;
      setStateValues({ options });
    }
  }
  useEffect(() => {
    if (orderState.loading) {
      setRunChangeMoment(!runChangeMoment)
      return;
    }
    if (options?.moment && shop.cart.length === 0) {
      setTimeout(() => {
        changeMoment(null)
      }, 1000);
    }
  }, [runChangeMoment])

  useEffect(() => {
    if (orderTypeFromParams) {
      handleChanges();
    }
  }, [runChanges])

  useEffect(() => {
    if (firstProduct.product) {
      let product = categoryState.products.find(prod => prod.id === firstProduct?.product?.id)
      const hasOptions = ((product?.ingredients && Object.keys(product?.ingredients).length > 0) || (product?.options && Object.keys(product?.options).length > 0))
      setFirstProduct({ product: product, hasOptions: hasOptions })
    }
  }, [categoryState])

  useEffect(() => {
    if (business && Object.keys(business).length) {
      localStorage.setItem('previous-business', business?.slug)
    }
  }, [business])

  useEffect(() => {
    if (props?.shop?.firstProduct?.product && Object.keys(props?.shop?.firstProduct?.product).length) {
      setFirstProduct(props?.shop?.firstProduct);
      setOrderOptionsModalIsOpen(true)
    }
  }, [])

  return (
    <>
      {props.beforeElements?.map((BeforeElement, i) => (
        <React.Fragment key={i}>
          {BeforeElement}
        </React.Fragment>))}
      {props.beforeComponents?.map((BeforeComponent, i) => (
        <BeforeComponent key={i} {...props} />))}
      {((!business || Object.keys(business).length === 0) && !loading) ?
        (
          <NotFoundSource
            content={t('BUSINESS_NOT_FOUND', 'Business not found, pleas try another one!')}
          />
        )
        :
        (
          <>
            <div style={{ width: windowSize.width < 450 ? '90%' : '100%', display: 'flex', flexDirection: 'row' }}>
              <BusinessContent>
                <WrapperBusinessLogo>
                  {!loading ? (
                    <BusinessLogo bgimage={optimizeImage(business?.logo || theme.images?.dummies?.businessLogo, 'h_200,c_limit')} />
                  ) : (
                    <Skeleton height={45} width={60} />
                  )}
                </WrapperBusinessLogo>
                <BusinessInfo className='info'>
                  <BusinessInfoItem>
                    <div style={{ marginLeft: '5px' }}>
                      {!loading ? (
                        <p className='bold'>{business?.name}</p>
                      ) : (
                        <Skeleton width={100} />
                      )}
                    </div>
                  </BusinessInfoItem>
                </BusinessInfo>
              </BusinessContent>
              <TrackOrderSection onClick={() => showTrackOrderModal(true)}>{'Track Order'}</TrackOrderSection>
              <div style={{ width: '10%', margin: '10px', marginBottom: '0px', textAlign: 'right', justifyContent: 'right', alignItems: 'right' }}>
                <LanguageSelector />
              </div>
            </div>
            <Container style={(windowSize.width < 1024 && !inViewPort) ? { marginBottom: 20 } : {}} >
              <ProductsContainer>
                {
                  !loading && business?.id && (
                    <WrappLayout
                      isCartOnProductsList={isCartOnProductsList && currentCart?.products?.length > 0}
                    >
                      <div style={{ width: '100%', height: '100%', maxHeight: '175px' }}>
                        <BusinessHeader bgimage={business?.header} isSkeleton={loading && !error} isClosed={false} >
                          <div style={{ width: windowSize.width < 400 ? '95%' : '100%', position: 'absolute', bottom: '10px', left: '10px' }}>
                            <DeliveryInfo
                              isDelivery={options.type === 1}
                            >
                              {(options.type === 1 && (options?.address?.address != '' && options?.address && Object.keys(options?.address).length > 0)) && (
                                <DeliveryPrice>
                                  {!businessState?.loading ? (
                                    <h2>
                                      {businessState?.business && parsePrice(businessState?.business?.delivery_price || 0)}
                                    </h2>
                                  ) : (
                                    <Skeleton width={70} />
                                  )}
                                  <p>{t('DELIVERY_FEE', 'Delivery fee')}</p>
                                </DeliveryPrice>
                              )}
                              {(options?.type == 1 || options?.type == 2) &&
                                <DeliveryTime isDelivery={options.type === 1}>
                                  {!businessState?.loading ? (
                                    <>
                                      {options?.type === 1 ? (
                                        <h2>
                                          {parseInt(convertHoursToMinutes(businessState?.business?.delivery_time))}
                                        </h2>
                                      ) : (
                                        <h2>
                                          {parseInt(convertHoursToMinutes(businessState?.business?.pickup_time))}
                                        </h2>
                                      )}
                                    </>
                                  ) : (
                                    <Skeleton width={70} />
                                  )}
                                  <p>{options?.type === 1 ? t('DELIVERY_APPROX_MINUTES', 'Delivery Approx Minutes') : t('PICKUP_APPROX_MINUTES', 'Pickup Approx Minutes')}</p>
                                </DeliveryTime>}
                              {(isPreOrderSetting || configState?.configs?.preorder_status_enabled?.value === undefined) && (
                                <Preorder isDelivery={options.type === 1}>
                                  {!businessState?.loading ? (
                                    <h2>
                                      <MomentControl
                                        isModalBehavior
                                        business={businessState?.business}
                                      />
                                    </h2>
                                  ) : (
                                    <Skeleton width={70} />
                                  )}
                                  <p>{t('PREORDER', 'Preorder')}</p>
                                </Preorder>
                              )}
                            </DeliveryInfo>
                          </div>
                        </BusinessHeader>
                      </div>
                      <div className='bp-list'>
                        {!(business?.categories?.length === 0 && !categoryId) && (
                          <BusinessProductsCategories
                            categories={[{ id: null, name: t('ALL', 'All') }, { id: 'featured', name: t('FEATURED', 'Featured') }, ...business?.categories.sort((a, b) => a.rank - b.rank)]}
                            categorySelected={categorySelected}
                            onClickCategory={handleChangeCategory}
                            featured={featuredProducts}
                            openBusinessInformation={openBusinessInformation}
                          />
                        )}

                        {(categoryState.products.length !== 0 || searchValue) && !errorQuantityProducts && (
                          <WrapperSearch
                            isDelivery={options.type === 1}
                            id="search-bar-id"
                          >
                            <SearchBar
                              isCustomLayout
                              onSearch={handleChangeSearch}
                              search={searchValue}
                              placeholder={t('SEARCH', 'Search')}
                              lazyLoad={businessState?.business?.lazy_load_products_recommended}
                            />
                            <Select
                              notAsync
                              notReload
                              options={sortByOptions}
                              defaultValue={sortByValue}
                              onChange={(val) => handleChangeSortBy && handleChangeSortBy(val)}
                              width={'10vw'}
                              style={{
                                position: 'relative',
                                zIndex: 0
                              }}
                            />
                          </WrapperSearch>
                        )}

                        <WrapContent>
                          <BusinessProductsList
                            categories={[
                              { id: null, name: t('ALL', 'All') },
                              { id: 'featured', name: t('FEATURED', 'Featured') },
                              ...business?.categories.sort((a, b) => a.rank - b.rank)
                            ]}
                            category={categorySelected}
                            categoryState={categoryState}
                            businessId={business.id}
                            business={business}
                            errors={errors}
                            onProductClick={onProductClick}
                            handleSearchRedirect={handleSearchRedirect}
                            featured={featuredProducts}
                            searchValue={searchValue}
                            isCartOnProductsList={isCartOnProductsList && currentCart?.products?.length > 0}
                            handleClearSearch={handleChangeSearch}
                            errorQuantityProducts={errorQuantityProducts}
                            configTypes={customConfigTypes.configTypes.length > 0 ? customConfigTypes.configTypes : configTypes}
                          />
                        </WrapContent>
                      </div>
                    </WrappLayout>
                  )
                }

                {loading && !error && (
                  <WrappLayout>
                    <BusinessBasicInformation
                      businessState={{ business: {}, loading: true }}
                      isSkeleton
                      handler={handler}
                      openBusinessInformation={openBusinessInformation}
                    />
                    <BusinessProductsCategories
                      categories={[]}
                      isSkeleton
                      openBusinessInformation={openBusinessInformation}
                    />
                    <WrapContent>
                      <BusinessProductsList
                        categories={[]}
                        category={categorySelected}
                        categoryState={categoryState}
                        isBusinessLoading={loading}
                        errorQuantityProducts={errorQuantityProducts}
                        configTypes={customConfigTypes.configTypes.length > 0 ? customConfigTypes.configTypes : configTypes}
                      />
                    </WrapContent>
                  </WrappLayout>
                )}

                {/* {((!business || Object.keys(business).length === 0) && !loading) && (
        <NotFoundSource
          content={t('BUSINESS_NOT_FOUND', 'Business not found, pleas try another one!')}
        />
      )} */}
              </ProductsContainer>
              {windowSize.width >= 440 &&
                <BusinessCartContainer ref={businessCartContainerRef}>
                  <BusinessCartInnerContainer>
                    {loading ? (
                      <Skeleton height={250} />
                    ) : (
                      <>
                        <Cart
                          isForceOpenCart
                          isCheckout={false}
                          cart={currentCart}
                          isCartPending={currentCart?.status === 2}
                          isProducts={true}
                          business={business}
                          isCartOnProductsList={isCartOnProductsList}
                          handleCartOpen={(val) => setIsCartOpen(val)}
                          configTypes={customConfigTypes.configTypes.length > 0 ? customConfigTypes.configTypes : configTypes}
                        />
                      </>
                    )}
                  </BusinessCartInnerContainer>
                </BusinessCartContainer>}
            </Container>
            <Modal
              width='70%'
              open={cartModalOpen}
              onClose={() => setCartModalOpen(false)}
              padding='10px'
            >
              <BusinessCartContainer ref={businessCartContainerRef}>
                <BusinessCartInnerContainer>
                  {loading ? (
                    <Skeleton height={250} />
                  ) : (
                    <>
                      <Cart
                        isForceOpenCart
                        isCheckout={false}
                        cart={currentCart}
                        isCartPending={currentCart?.status === 2}
                        isProducts={true}
                        business={business}
                        isCartOnProductsList={isCartOnProductsList}
                        handleCartOpen={(val) => setIsCartOpen(val)}
                        configTypes={customConfigTypes.configTypes.length > 0 ? customConfigTypes.configTypes : configTypes}
                      />
                    </>
                  )}
                </BusinessCartInnerContainer>
              </BusinessCartContainer>
            </Modal>

            {(!inViewPort && cart?.length > 0 && windowSize.width < 1024) && (
              <FloatingButton
                btnText={
                  !loading ? t('VIEW_ORDER', 'View Order') : t('LOADING', 'Loading')
                }
                isSecondaryBtn={false}
                btnValue={cart?.length}
                handleClick={() => handleViewOrderAction()}
                disabled={cart.length <= 0 || orderState.loading}
              />
            )}

            <Modal
              width='70%'
              open={openProduct}
              closeOnBackdrop
              onClose={() => closeModalProductForm()}
              padding='10'
              isProductForm
            >

              {productModal.loading && !productModal.error && (
                <ProductLoading>
                  <SkeletonItem>
                    <Skeleton height={45} count={8} />
                  </SkeletonItem>
                </ProductLoading>
              )}
              {(productModal.product || curProduct) && (
                <ProductForm
                  businessSlug={business?.slug}
                  business={business}
                  product={productModal.product || curProduct}
                  businessId={business?.id}
                  onSave={handlerProductAction}
                />
              )}
            </Modal>
            <Modal
              width='70%'
              padding='30px'
              closeOnBackdrop={false}
              open={orderOptionsModalIsOpen}
              onClose={() => closeOrderOptionsModal()}
              disableOnAccept={options.type == 1 && (options?.address?.address == '' || options?.address && (Object.keys(options?.address).length == 0))}
              onAccept={() => onProductClickCustom(firstProduct.product, firstProduct.hasOptions)}
            >
              {loading && !error ? (
                <SkeletonItem style={{ width: windowSize.width < 400 ? '95%' : '100%', padding: '20px', alignItems: 'left', justifyContent: 'left', display: 'flex', flexDirection: 'column' }}>
                  <Skeleton height={70} width={250} count={1} />
                  <Skeleton height={140} width={400} count={1} />
                  <Skeleton height={90} width={270} count={1} />
                </SkeletonItem>
              )
                :
                (
                  <div style={{ width: windowSize.width < 400 ? '95%' : '100%', }}>
                    <div style={{ width: windowSize.width < 400 ? '95%' : '100%', paddingBottom: '10px' }}>
                      <h4 style={{ margin: '7px' }}>1. {t('SELECT_YOUR_ORDER_TYPE', 'Select your order type')}</h4>
                      <OrderTypeSelectorHeader
                        configTypes={customConfigTypes.configTypes.length > 0 ? customConfigTypes.configTypes : configTypes}
                      />
                    </div>

                    {options.type == 1 &&
                      <>
                        <CustomStyleAddressDetails
                          location={business?.location}
                          businessLogo={business?.logo || theme.images?.dummies?.businessLogo}
                          isCartPending={false}
                          businessId={business?.id}
                          apiKey={configState.configs?.google_maps_api_key?.value}
                          mapConfigs={mapConfigs}
                          isCustomerMode={true}
                          business={business}
                        />

                        {(options?.address?.address == '' || options?.address && (Object.keys(options?.address).length == 0)) &&
                          <div style={{ textAlign: 'center', color: theme.colors.primary, }}>
                            {t('INVALID_ADDRESS', 'Invalid address details.')}
                          </div>}
                      </>
                    }
                    {(isPreOrderSetting || configState?.configs?.preorder_status_enabled?.value === undefined) && (
                      <>
                        <h4 style={{ margin: '7px' }}>3. {t('SELECT_ORDER_TIME', 'Select order time')}</h4>
                        <div style={{ width: '20%' }}>
                          <MomentControl
                            isModalBehavior
                            business={businessState?.business}
                          />
                        </div>
                      </>
                    )}
                  </div>
                )

              }
            </Modal>
            <Modal
              width='70%'
              open={trackOrderModal}
              onClose={() => showTrackOrderModal(false)}
              padding='20px'
            >

              <div style={{ width: '100%' }}>
                <FormInput onSubmit={checkOrderExist}>
                  <Input
                    style={{ width: '100%' }}
                    type={'number'}
                    name={'order_id'}
                    className='form'
                    disabled={submitting}
                    placeholder={t('ORDER_ID', 'Order ID')}
                    onChange={handleChangeInput}
                    autoComplete='off'
                  />
                  <Input
                    style={{ width: '100%' }}
                    type={'phone'}
                    name={'cellphone'}
                    className='form'
                    disabled={submitting}
                    placeholder={t('CELLPHONE', 'Phone')}
                    onChange={handleChangeInput}
                    autoComplete='off'
                  />
                  <ActionsForm>
                    <Button
                      id='form-btn'
                      color='primary'
                      type='button'
                      disabled={inputOrderId == null || !inputOrderId || submitting || !userPhoneNumber}
                      onClick={checkOrderExist}
                    >
                      {t('TRACK_ORDER', 'Track Order')}
                    </Button>
                  </ActionsForm>
                </FormInput>
              </div>
            </Modal>
            <Modal
              width='70%'
              open={openAddressForm}
              onClose={() => setOpenAddressForm(false)}
              padding='20px'
            >

              <AddressForm
                business={business}
                useValidationFileds
                address={orderState?.options?.address || {}}
                onCancel={() => setOpenAddressForm(false)}
                onSaveAddress={() => setOpenAddressForm(false)}
              />
            </Modal>

            <Alert
              title={t('INFORMATION', 'Information')}
              content={alertState.content}
              acceptText={t('ACCEPT', 'Accept')}
              open={alertState.open}
              onClose={alertState.onClose}
              onAccept={alertState.onAccept}
              closeOnBackdrop={false}
            />
          </>
        )
      }
      {props.afterComponents?.map((AfterComponent, i) => (
        <AfterComponent key={i} {...props} />))}
      {props.afterElements?.map((AfterElement, i) => (
        <React.Fragment key={i}>
          {AfterElement}
        </React.Fragment>))}
    </>
  )
}

const BusinessProductsListing = (props) => {
  const [isInitialRender, setIsInitialRender] = useState(false)

  const businessProductslistingProps = {
    ...props,
    UIComponent: BusinessProductsListingUI,
    isInitialRender,
    handleUpdateInitialRender: (val) => setIsInitialRender(val)
  }

  return (
    <BusinessAndProductList {...businessProductslistingProps} />
  )
}

export default BusinessProductsListing;
