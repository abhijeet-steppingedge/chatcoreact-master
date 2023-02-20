import React, { useEffect, useState } from 'react'
import VscWarning from '@meronex/icons/vsc/VscWarning'
import BsInfoCircle from '@meronex/icons/bs/BsInfoCircle'

import BsChevronDown from '@meronex/icons/bs/BsChevronDown'
import BsChevronUp from '@meronex/icons/bs/BsChevronUp'

import Skeleton from 'react-loading-skeleton'
import { useTheme } from 'styled-components'
import {
  useOrder,
  useSession,
  useApi,
  useLanguage,
  useUtils,
  useValidationFields,
  useConfig,
  useCustomer
} from 'ordering-components'
import { Checkout as CheckoutController } from '../../controllers/Checkout'
import { UpsellingPage } from 'ordering-ui'
import parsePhoneNumber from 'libphonenumber-js'
import { Button } from '../styles/Buttons'
import { NotFoundSource } from 'ordering-ui'
import { AddressDetails } from '../AddressDetails'
import { UserDetails } from '../UserDetails'
import { PaymentOptions } from '../PaymentOptions'
import { DriverTips } from 'ordering-ui'
import Cart from '../Cart'
import { Alert } from 'ordering-ui'
import { CartContent } from 'ordering-ui'
import { OrderTypeSelectorHeader } from '../OrderTypeSelectorHeader'
import { verifyDecimals } from 'ordering-ui'
import { CouponControl } from '../CouponControl'
import { TaxInformation } from 'ordering-ui'
import { TextArea } from '../styles/Inputs'
import { Select } from '../styles/Select'
import moment from 'moment'
import { dateCheck } from '../../utils'
import BiArrowBack from '@meronex/icons/bi/BiArrowBack';

import {
  Container,
  LeftContainer,
  RightContainer,
  RightInnerContainer,
  WrappContainer,
  UserDetailsContainer,
  BusinessDetailsContainer,
  PaymentMethodContainer,
  DriverTipContainer,
  CartContainer,
  WrapperPlaceOrderButton,
  WarningMessage,
  CartsList,
  WarningText,
  WrapperUserDetails,
  WrapOrderType,
  WrapBusinessLogo,
  BusinessLogo,
  BusinessName,
  OrderBill,
  CouponContainer,
  Exclamation,
  Spinner,
  CommentContainer
} from './styles'
import { Modal } from 'ordering-ui'
import { SpinnerLoader, LanguageSelector } from 'ordering-ui'
import { useDispatch, useSelector } from 'react-redux'
import systemConfig from '../../config.json';
import { useHistory } from 'react-router-dom'
import validationFields from '../../validationFields'
import { OrderSuccessModal } from '../OrderSuccessModal'
import { Checkbox } from '../styles/Checkbox'
import FaWhatsapp from '@meronex/icons/fa/FaWhatsapp';
import Cookies from 'js-cookie';

const mapConfigs = {
  mapZoom: 16,
  mapSize: {
    width: 640,
    height: 190
  }
}

const CUSTOMER_JSON = {
  id: -1,
  name: '',
  lastname: '',
  email: '',
  cellphone: '',
  address: '',
  location: '',
  internal_number: '',
  zipcode: '',
  tag: 'DineIn',
};

const CheckoutUI = (props) => {
  const {
    errors,
    cartState,
    paymethodSelected,
    handlePaymethodChange,
    handleOrderRedirect,
    isCustomerMode,
    isResetPaymethod,
    setIsResetPaymethod,
    commentState,
  } = props

  const shop = useSelector((state) => state.shop)
  const cart = shop.cart;
  const businessDetails = shop?.business;
  const theme = useTheme()
  const [{ options }] = useOrder()
  const [orderState] = useOrder()
  const [, t] = useLanguage()
  const [{ parsePrice, optimizeImage, parseNumber }] = useUtils()
  const userFromLocal = localStorage.getItem('user');
  let user = userFromLocal ? JSON.parse(userFromLocal) : null;
  const [configState] = useConfig()
  const [customerState] = useCustomer()
  const [ordering] = useApi()
  const history = useHistory();
  const dispatch = useDispatch()
  const isCouponEnabled = validationFields?.fields?.checkout?.coupon?.enabled

  const [errorCash, setErrorCash] = useState(false)
  const [userErrors, setUserErrors] = useState([])
  const [alertState, setAlertState] = useState({ open: false, content: [] })
  const [isUserDetailsEdit, setIsUserDetailsEdit] = useState(false)
  const [updatingUser, setUpdatingUser] = useState(false)
  const [isValid, setIsValid] = useState(false)
  const [openTaxModal, setOpenTaxModal] = useState({ open: false, data: null })
  const [isShow, setIsShow] = useState(true)
  const [placing, setPlacing] = useState(false)
  const [tableNumbers, setTableNumbers] = useState([])
  const [selectedTableNumber, setSelectedTableNumber] = useState(null)
  const [openOrderSuccessModal, setOpenOrderSuccessModal] = useState(false)
  const [agreed, setAgreed] = useState(false);
  const [comments, handleChangeComment] = useState('')
  const [newCreatedOrder, setNewCreatedOrder] = useState({})
  const [deliveryPrice, setDeliveryPrice] = useState({})

  const configTypes = configState.configs?.order_types_allowed?.value.split('|').map(value => Number(value)) || []

  const [customConfigTypes, setCustomConfigTypes] = useState({ isGetting: false, configTypes: configTypes })
  const driverTipsOptions = typeof configState.configs?.driver_tip_options?.value === 'string'
    ? JSON.parse(configState.configs?.driver_tip_options?.value) || []
    : configState.configs?.driver_tip_options?.value || []

  const getCustomConfigTypes = (menus) => {
    if (Object.keys(menus).length === 0) return;
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
    })
    setCustomConfigTypes({ isGetting: false, configTypes: array });
  }

  const getCloseTime = (today) => {
    if (today.enabled) {
      let index = (Object.keys(today.lapses).length) - 1;
      let lapse = today.lapses[index];
      let closeTime = `${lapse.close.hour}:${lapse.close.minute}`;
      return moment(closeTime, "HH:mm")
    }
    return moment().add('minutes', 10);
  }
  const handlerClickPlaceOrder = async () => {
    let closeTime = getCloseTime(businessDetails?.today);
    if (closeTime.isBefore()) {
      setAlertState({ open: true, content: [t('BUSINESS_CLOSED_AT_THE_MOMENT', 'Business is Closed at the moment!')] });
      return;
    }

    const formattedProducts = await formatProducts(cart);
    setPlacing(true);
    if (options.type == 3) {
      user = CUSTOMER_JSON;
      user['internal_number'] = selectedTableNumber;
      user['address'] = businessDetails.address;
      user['location'] = businessDetails.location;
      user['zipcode'] = businessDetails.zipcode;
    } else {
      user['address'] = options?.address?.address;
      user['location'] = options?.address?.location;
      user['zipcode'] = options?.address?.zipcode;
      user['address_notes'] = options?.address?.address_notes;
      user['internal_number'] = options?.address?.internal_number;
    }
    const body = {
      'paymethod_id': paymethodSelected.id,
      'pay_data': paymethodSelected?.data?.id,
      'business_id': businessDetails.id,
      'customer_id': systemConfig.ordering_customer.id,
      'delivery_datetime': options.moment ? moment.utc(options.moment).local().format('YYYY-MM-DD HH:mm:ss') : moment().format('YYYY-MM-DD HH:mm:ss'),
      'delivery_type': options.type,
      'location': (options.address.address == '' || Object.keys(options.address).length > 0) ? options?.address?.location : businessDetails.location,
      'products': JSON.stringify(formattedProducts),
      'customer': user,
      'comment': comments,
    };

    if (paymethodSelected.id == 28) {
      let _totalPrice = (shop?.totalPrice + getIncludedTaxes() + getServiceFee() + shop?.serviceFeePrice + (businessDetails?.delivery_price ? businessDetails.delivery_price : 0) - shop?.offerPrice >= 0 ? shop?.totalPrice + getIncludedTaxes() + getServiceFee() + (businessDetails?.delivery_price ? businessDetails.delivery_price : 0) - shop?.offerPrice : 0);
      var raw = JSON.stringify({
        "source_id": paymethodSelected?.data?.id,
        "customer": JSON.stringify(user),
        "amount": _totalPrice,
        "subtotal": shop?.totalPrice,
        "gateway": paymethodSelected?.paymethod?.gateway,
        "currency": "SGD",
        "description": `Order to ${businessDetails?.name}: Order Details: Subtotal: ${parsePrice(shop?.totalPrice)} Delivery Fee: ${parsePrice(businessDetails?.delivery_price ? businessDetails.delivery_price : 0)} Packing Charges: ${parsePrice(getServiceFee() || 0)} Discount: -${parsePrice(shop?.offerPrice || 0)} Total: ${parsePrice(_totalPrice)}`,
        "business_id": businessDetails.id,
      });

      const response = await fetch(`${systemConfig.api.url}/${systemConfig.api.version}/${systemConfig.api.language}/${systemConfig.project}/payments/stripe_direct`, {
        method: 'POST',
        headers: {
          "x-api-key": systemConfig.api.key,
          "Content-Type": "application/json"
        },
        body: raw,
      })
      const pay_data = await response.json();
      if (pay_data.error) {
        setPlacing(false)
        setAlertState({ open: true, content: pay_data?.result })
        return;
      }
      body.pay_data = pay_data?.result
    }
    if (shop.offerId) {
      body.offer_id = shop.offerId;
    }
    if (businessDetails.delivery_zone) {
      body.delivery_zone_id = businessDetails.delivery_zone;
    }

    const { response } = await ordering.orders().save(body);

    setPlacing(false)
    if (response?.data?.error) {
      setAlertState({ open: true, content: response?.data?.result })
      console.log('error while creating order', response?.data?.result)
      return;
    }
    let order = response?.data?.result;

    // Track Shopback affiliate user
    let shopback_transaction_id = Cookies.get('shopback_transaction_id');
    if(shopback_transaction_id != ""){
      let order_id = order.customer.order_id;
      let order_total_amount = order.summary.total;

      // order_subtotal: (
      // the amount used for commission calculation. 
      // Take note to adjust for any coupon deductions. 
      // Amount should be final subtotal after discount/coupons, 
      // before shipping fees)
      let order_subtotal = order_total_amount - order.summary.delivery_price;

      if(order_id && order_subtotal){
        
        let headersList = {
          "Accept": "*/*",
          "Content-Type": "application/json"
         }
         
         let bodyContent = JSON.stringify({
           "transactionId" : shopback_transaction_id,
           "orderId": order_id,
           "total": order_total_amount,
           "subtotal": order_subtotal
         });
         
         let response = await fetch(systemConfig.shopback_aff.url, { 
           method: "POST",
           body: bodyContent,
           headers: headersList
         });
         
         let data = await response.text();
         console.log('Shopback Response:',data);
      }
    }
    // End: Track Shopback affiliate user

    setNewCreatedOrder(order)
    localStorage.removeItem('user');
  }
  const handlePlaceOrder = () => {
    if (!userErrors.length) {
      handlerClickPlaceOrder && handlerClickPlaceOrder()
      return
    }
    setAlertState({
      open: true,
      content: Object.values(userErrors).map(error => error)
    })
    setIsUserDetailsEdit(true)
  }

  const closeAlert = () => {
    setAlertState({
      open: false,
      content: []
    })
    setIsUserDetailsEdit(false)
  }

  const checkValidationFields = () => {
    setUserErrors([])
    const errors = []
    const notFields = ['coupon', 'driver_tip', 'mobile_phone', 'address', 'zipcode', 'address_notes', options.type != 3 ? 'table_no' : '']
    let userFromLocal = localStorage.getItem('user')
    let newUser = userFromLocal ? JSON.parse(userFromLocal) : user
    const userSelected = newUser
    Object.values(validationFields?.fields?.checkout).map(field => {
      if (field?.enabled && field?.required && !notFields.includes(field.code)) {
        if (userSelected && !userSelected[field?.code]) {
          errors.push(t(`VALIDATION_ERROR_${field?.code ? field?.code?.toUpperCase() : ''}_REQUIRED`, `The field ${field?.name} is required`))
        }
      }
    })

    if (
      userSelected &&
      !userSelected?.cellphone &&
      validationFields?.fields?.checkout?.cellphone?.enabled &&
      validationFields?.fields?.checkout?.cellphone?.required
    ) {
      errors.push(t('VALIDATION_ERROR_MOBILE_PHONE_REQUIRED', 'The field Phone number is required'))
    }
    if (!userSelected && options.type != 3) {
      errors.push(t('INVALID_CUSTOMER_FIELDS', 'Invalid Customer Fields'))
    }

    if (!selectedTableNumber && options.type === 3) {
      errors.push(t('TABLE_NUMBER_IS_REQUIRED_FOR_EAT_IN', 'Table number is required for Eat In'))
    }
    if (!agreed) {
      errors.push(t('AGREE_TO_TERMS_AND_CONDITIONS', 'Please Accept Terms and Conditions'))
    }

    if (userSelected && userSelected?.cellphone) {
      if (userSelected?.country_phone_code) {
        let phone = null
        phone = `+${userSelected?.country_phone_code}${userSelected?.cellphone}`
        const phoneNumber = parsePhoneNumber(phone)
        if (!phoneNumber?.isValid()) {
          errors.push(t('VALIDATION_ERROR_MOBILE_PHONE_INVALID', 'The field Phone number is invalid.'))
        }
      } else {
        errors.push(t('INVALID_ERROR_COUNTRY_CODE_PHONE_NUMBER', 'The country code of the phone number is invalid'))
      }
    }

    setUserErrors(errors)
  }

  const handleCloseOrderSuccessModal = () => {
    setOpenOrderSuccessModal(false);
    dispatch({ type: 'EMPTY_CART' })
  }

  const formatTableNumbers = (tabNos) => {
    let arr = [];
    let testArray = [];
    if (tabNos !== undefined) {
      let tablenumbersArr = tabNos.split(',');
      tablenumbersArr.forEach(no => {
        testArray[no] = no;
      });
    }
    Object.values(testArray).forEach(no => {
      let newObject = { 'value': no, 'content': no }
      arr.push(newObject);
    });
    setTableNumbers(arr)
  }
  const formatIngredients = (ingredients, selected_ingredients) => {
    let array = [];
    if (Object.keys(selected_ingredients).length > 0) {
      let keys = Object.keys(selected_ingredients)
      let values = Object.values(selected_ingredients)
      let ing_values = Object.values(ingredients)
      keys.forEach((ing, index) => {
        let id = ing.split(':')[1]
        let name = ing_values[index].name;
        if (!values[index].selected) {
          array.push(Number(id))
        }
      });
    }
    return array;
  }
  const formatOptions = (options) => {
    let array = [];
    if (Object.keys(options).length > 0) {
      let values = Object.values(options)
      values.forEach((option, index) => {
        let id = option.id;
        let suboptions = formatSuboptions(option.suboptions)
        let obj = { id: id, suboptions: suboptions }
        array.push(obj)
      });
    }
    return array;
  }

  const formatSuboptions = (suboptions) => {
    let array = []
    suboptions = Object.values(suboptions);
    suboptions.forEach(sub => {
      array.push(Number(sub.id))
    })
    return array;
  }

  const formatProducts = (products) => {
    products.forEach(product => {
      product['ingredients'] = formatIngredients(product.ingredients, product.selected_ingredients);
      product['options'] = formatOptions(product.options);
      product['quantity'] = product.qty;
      delete product.barcode;
      delete product.barcode_alternative;
      delete product.calories;
      delete product.category;
      delete product.category_id;
      delete product.cost_offer_price;
      delete product.cost_price;
      delete product.description;
      delete product.estimated_person;
      delete product.enabled;
      delete product.external_id;
      delete product.extras;
      delete product.featured;
      delete product.fee_id;
      delete product.gallery;
      delete product.hide_special_instructions;
      delete product.in_offer;
      delete product.inventoried;
      delete product.maximum_per_order;
      delete product.minimum_per_order;
      delete product.offer_include_options;
      delete product.offer_price;
      delete product.offer_rate;
      delete product.offer_rate_type;
      delete product.price;
      delete product.total_price;
      delete product.pricecheck;
      delete product.qty;
      delete product.rank;
      delete product.selected_ingredients;
      delete product.seo_description;
      delete product.seo_image;
      delete product.seo_title;
      delete product.sku;
      delete product.slug;
      delete product.tags;
      delete product.tax_id;
      delete product.upselling;
      delete product.weight;
      delete product.weight_unit;
      delete product.images;
      delete product.name;
    })
    return products;
  }

  const updateBusinessDetails = async () => {
    try {
      let parameters = {
        type: options.type,
        location: options?.address?.location ? `${options?.address?.location?.lat},${options?.address?.location?.lng}` : '',
      }
      const { content: { result, error } } = await ordering.businesses(businessDetails.slug).parameters(parameters).get();
      if (!error) {
        dispatch({ type: 'ADD_BUSINESS', payload: result })
        dispatch({ type: 'ADD_TAX', payload: result?.tax });
        dispatch({ type: 'ADD_SERVICE_FEE', payload: result?.service_fee });
      }
    } catch (e) {
      // console.log(e)
    }
  }

  const getOfferPrice = () => {
    if (orderState.loading) return;
    if (businessDetails?.offers && !shop.couponCode) {
      let flag = false;
      businessDetails.offers.forEach(bOffer => {
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

  const getServiceFee = () => {
    return (shop?.serviceFeePrice / 100) * shop?.totalPrice
  }

  const getIncludedTaxes = () => {
    if (businessDetails?.tax_type == 2) {
      return (shop?.taxPercentage / 100) * shop?.totalPrice
    }
    return 0;
  }

  const goBack = () => {
    let slug = localStorage.getItem('previous-business')
    history.push('/' + slug)
  }

  useEffect(() => {
    if (validationFields && validationFields?.fields?.checkout) {
      checkValidationFields()
    }
  }, [validationFields, updatingUser, selectedTableNumber, agreed])


  useEffect(() => {
    if (errors) {
      setAlertState({
        open: true,
        content: errors
      })
    }
  }, [errors])

  useEffect(() => {
    if (isResetPaymethod) {
      handlePaymethodChange(null)
      setIsResetPaymethod(true)
    }

  }, [isResetPaymethod])

  useEffect(() => {
    if (Object.keys(newCreatedOrder).length > 0) {
      setOpenOrderSuccessModal(true)
    } else {
      setOpenOrderSuccessModal(false)
    }
  }, [newCreatedOrder])

  useEffect(() => {
    Object.keys(businessDetails).length > 0 ? getCustomConfigTypes(businessDetails?.menus) : null
  }, [businessDetails])

  useEffect(() => {
    !orderState.loading && options.type == 3 ? formatTableNumbers(businessDetails?.tablenumbers) : null
    updateBusinessDetails()
  }, [options])
  useEffect(() => {
    let price = (options?.type === 1 && businessDetails?.delivery_price) ? businessDetails.delivery_price : 0
    setDeliveryPrice(price)
  }, [options, businessDetails])
  useEffect(() => {
    getOfferPrice();
  }, [options, businessDetails, shop.totalPrice, shop.couponCode])

  useEffect(() => {
    if (options.type != 3 && (!user || (user && (!user.name || !user.email || !user.cellphone)))) {
      setIsUserDetailsEdit(true)
    } else {
      setIsUserDetailsEdit(false)
    }
  }, [user, updatingUser])

  const toggleIsShow = () => {
    setIsShow(!isShow)
  }

  useEffect(() => {
    if (businessDetails && Object.keys(businessDetails).length) {
      localStorage.setItem('previous-business', businessDetails?.slug)
    }
  }, [businessDetails])

  useEffect(() => {
    dispatch({ type: 'ADD_ORDER_TYPE', payload: options.type })
  }, [options])

  return (
    <>
      {props.beforeElements?.map((BeforeElement, i) => (
        <React.Fragment key={i}>
          {BeforeElement}
        </React.Fragment>))}
      {props.beforeComponents?.map((BeforeComponent, i) => (
        <BeforeComponent key={i} {...props} />))}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'row', borderBottom: '1px solid #cccccc' }}>
        <div style={{ width: '50%', display: 'flex', flexDirection: 'row', cursor: 'pointer', justifyContent: 'left', textAlign: 'left', alignItems: 'center', paddingLeft: '10px' }} onClick={() => goBack()} >
          <BiArrowBack color={'#000000'} size={20} style={{ paddingTop: '2px' }} />
          <div style={{ color: '#000000', paddingLeft: '3px' }}>{'Back'}</div>
        </div>
        <div style={{ width: '50%', margin: '10px', textAlign: 'right', justifyContent: 'right', alignItems: 'right' }}>
          <LanguageSelector />
        </div>
      </div>
      <Container>
        <LeftContainer>
          <WrappContainer>
            {cart?.status === 2 && (
              <WarningMessage>
                <VscWarning />
                <h1>
                  {t('CART_STATUS_PENDING_MESSAGE', 'Your order is being processed, please wait a little more. if you\'ve been waiting too long, please reload the page')}
                </h1>
              </WarningMessage>
            )}
            {props.beforeElementsSectionOne?.map((BeforeElement, i) => (
              <React.Fragment key={i}>
                {BeforeElement}
              </React.Fragment>))}
            {props.beforeComponentsSectionOne?.map((BeforeComponent, i) => (
              <BeforeComponent key={i} {...props} />))}

            {/* {!configState?.loading && configTypes.length > 0 && (
              <WrapOrderType>
                <h1>{t('ORDER_TYPE', 'Order Type')}</h1>
                <OrderTypeSelectorHeader
                  isCustomStyle
                  configTypes={customConfigTypes.configTypes.length > 0 ? customConfigTypes.configTypes : configTypes}
                />
              </WrapOrderType>
            )} */}

            {!props.isHideSectionOne && options.type == 1 && (
              (businessDetails?.loading) ? (
                <WrapOrderType>
                  <h1>
                    <Skeleton width={150} height={30} style={{ marginBottom: '10px' }} />
                  </h1>
                  <div>
                    <Skeleton height={150} style={{ marginBottom: '10px' }} />
                  </div>
                </WrapOrderType>
              ) : (
                <>
                  <AddressDetails
                    location={businessDetails?.location}
                    businessLogo={businessDetails?.logo || theme.images?.dummies?.businessLogo}
                    isCartPending={cart?.status === 2}
                    businessId={cart?.business_id}
                    apiKey={configState.configs?.google_maps_api_key?.value}
                    mapConfigs={mapConfigs}
                    isCustomerMode={isCustomerMode}
                    business={businessDetails}
                  />
                  {(options?.address?.address == '' || options?.address && (Object.keys(options?.address).length == 0)) &&
                    <WarningText style={{ textAlign: 'center', color: theme.colors.primary, }}>
                      {t('INVALID_ADDRESS', 'Invalid address details.')}
                    </WarningText>
                  }
                </>
              )
            )}

            {props.beforeElementsSectionTwo?.map((BeforeElement, i) => (
              <React.Fragment key={i}>
                {BeforeElement}
              </React.Fragment>))}
            {props.beforeComponentsSectionTwo?.map((BeforeComponent, i) => (
              <BeforeComponent key={i} {...props} />))}

            {!orderState.loading && options.type != 3 && <UserDetailsContainer>
              <WrapperUserDetails>
                <UserDetails
                  isUserDetailsEdit={isUserDetailsEdit}
                  cartStatus={cart?.status}
                  businessId={cart?.business_id}
                  useValidationFields
                  useDefualtSessionManager
                  useSessionUser={!isCustomerMode}
                  isCustomerMode
                  isCheckout
                  setUpdatingUser={setUpdatingUser}
                />
              </WrapperUserDetails>
              {options.type != 3 && (!user || (user && (!user.name || !user.email || !user.cellphone))) && (
                <WarningText style={{ textAlign: 'center' }}>
                  {t('INVALID_CUSTOMER_DETAILS', 'Invalid customer details.')}
                </WarningText>
              )}
            </UserDetailsContainer>}


            {props.beforeElementsSectionThree?.map((BeforeElement, i) => (
              <React.Fragment key={i}>
                {BeforeElement}
              </React.Fragment>))}
            {props.beforeComponentsSectionThree?.map((BeforeComponent, i) => (
              <BeforeComponent key={i} {...props} />))}


            <BusinessDetailsContainer>
              {(businessDetails?.loading || false) && !businessDetails?.error && (
                <div>
                  <div>
                    <Skeleton height={35} style={{ marginBottom: '10px' }} />
                    <Skeleton height={35} style={{ marginBottom: '10px' }} />
                    <Skeleton height={35} style={{ marginBottom: '10px' }} />
                    <Skeleton height={35} style={{ marginBottom: '10px' }} />
                    <Skeleton height={35} style={{ marginBottom: '10px' }} />
                  </div>
                </div>
              )}
              {shop.business && Object.values(shop.business)?.length > 0 && (
                <div style={{ width: '100%' }}>
                  <h1>{t('BUSINESS_DETAILS', 'Business Details')}</h1>
                  {isShow &&
                    <div>
                      {businessDetails.name && <p><strong>{t('NAME', 'Name')}:</strong> {businessDetails.name}</p>}
                      {businessDetails.email && <p><strong>{t('EMAIL', 'Email')}:</strong> {businessDetails.email}</p>}
                      {businessDetails.cellphone && <p><strong>{t('CELLPHONE', 'Cellphone')}:</strong> {businessDetails.cellphone}</p>}
                      {businessDetails.address && <p><strong>{t('ADDRESS', 'Address')}:</strong> {businessDetails.address}</p>}
                    </div>
                  }
                </div>
              )}
              {options.type === 3 && tableNumbers.length > 0 && (
                <>
                  <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
                    <div style={{ fontSize: '24px', fontWeight: 'bolder', }}>{t('SELECT_TABLE_NO', 'Select Table No.')}</div>
                    <div style={{ marginLeft: 'auto', paddingRight: '10px' }}>
                      <Select
                        notAsync
                        notReload
                        placeholder={t('SELECT_TABLE_NO', 'Please Select Table No.')}
                        options={tableNumbers}
                        onChange={(val) => setSelectedTableNumber(val)}
                      />
                    </div>
                  </div>
                  {!selectedTableNumber && options.type === 3 && (
                    <WarningText style={{ textAlign: 'center' }}>
                      {t('WARNING_NOT_TABLE_NUMBER_SELECTED', 'Please, select a table number.')}
                    </WarningText>
                  )}
                </>
              )}
              {businessDetails?.error && businessDetails?.error?.length > 0 && (
                <div>
                  <h1>{t('BUSINESS_DETAILS', 'Business Details')}</h1>
                  <NotFoundSource
                    content={businessDetails?.error[0]?.message || businessDetails?.error[0]}
                  />
                </div>
              )}
            </BusinessDetailsContainer>


            {props.beforeElementsSectionFour?.map((BeforeElement, i) => (
              <React.Fragment key={i}>
                {BeforeElement}
              </React.Fragment>))}
            {props.beforeComponentsSectionFour?.map((BeforeComponent, i) => (
              <BeforeComponent key={i} {...props} />))}

            {cart && (
              <>
                <PaymentMethodContainer>
                  <h1>{t('PAYMENT_METHODS', 'Payment Methods')}</h1>
                  {cart?.status === 4 && (
                    <WarningMessage style={{ marginTop: 20 }}>
                      <VscWarning />
                      <h1>
                        {t('CART_STATUS_CANCEL_MESSAGE', 'The payment has not been successful, please try again')}
                      </h1>
                    </WarningMessage>
                  )}
                  <PaymentOptions
                    cart={cart}
                    isDisabled={cart?.status === 2}
                    businessId={businessDetails?.id}
                    isLoading={false}
                    paymethods={businessDetails?.paymethods}
                    onPaymentChange={handlePaymethodChange}
                    errorCash={errorCash}
                    setErrorCash={setErrorCash}
                    handleOrderRedirect={handleOrderRedirect}
                    isCustomerMode={isCustomerMode}
                    paySelected={paymethodSelected}
                  />
                </PaymentMethodContainer>
                {!paymethodSelected && cart?.status !== 2 && (
                  <WarningText style={{ textAlign: 'center' }}>
                    {t('WARNING_NOT_PAYMENT_SELECTED', 'Please, select a payment method to place order.')}
                  </WarningText>
                )}
              </>
            )}

            {props.beforeElementsSectionFive?.map((BeforeElement, i) => (
              <React.Fragment key={i}>
                {BeforeElement}
              </React.Fragment>))}
            {props.beforeComponentsSectionFive?.map((BeforeComponent, i) => (
              <BeforeComponent key={i} {...props} />))}

            {/* {!props.isHideSectionSix && !false && cart && (
              <CartContainer>
                <h1>{t('YOUR_ORDER', 'Your Order')}</h1>
                <Cart
                  isCartPending={cart?.status === 2}
                  isCheckout
                  business={businessDetails}
                  isProducts={cart?.length || 0}
                />
              </CartContainer>
            )} */}

          </WrappContainer>
        </LeftContainer>
        <RightContainer>
          <RightInnerContainer>
            {props.beforeElementsSectionSix?.map((BeforeElement, i) => (
              <React.Fragment key={i}>
                {BeforeElement}
              </React.Fragment>))}
            {props.beforeComponentsSectionSix?.map((BeforeComponent, i) => (
              <BeforeComponent key={i} {...props} />))}

            {/* {!props.isHideSectionFour &&
              !false &&
              cart &&
              cart?.business_id &&
              options.type === 1 &&
              cart?.status !== 2 &&
              validationFields?.fields?.checkout?.driver_tip?.enabled &&
              driverTipsOptions.length > 0 &&
              (
                <DriverTipContainer>
                  <h1>{t('DRIVER_TIPS', 'Driver Tips')}</h1>
                  <DriverTips
                    businessId={cart?.business_id}
                    driverTipsOptions={driverTipsOptions}
                    isFixedPrice={parseInt(configState.configs?.driver_tip_type?.value, 10) === 1 || !!parseInt(configState.configs?.driver_tip_use_custom?.value, 10)}
                    isDriverTipUseCustom={!!parseInt(configState.configs?.driver_tip_use_custom?.value, 10)}
                    driverTip={parseInt(configState.configs?.driver_tip_type?.value, 10) === 1 || !!parseInt(configState.configs?.driver_tip_use_custom?.value, 10)
                      ? cart?.driver_tip
                      : cart?.driver_tip_rate}
                    useOrderContext
                  />
                </DriverTipContainer>
              )} */}

            {/* <WrapBusinessLogo>
              {(!businessDetails) ? (
                <Skeleton width={65} height={65} />
              ) : (
                <BusinessLogo bgimage={optimizeImage(businessDetails?.logo || theme.images?.dummies?.businessLogo, 'h_200,c_limit')} />
              )}
              <BusinessName>
                <span>{t('ORDER_FROM', 'Order from')}</span>
                {(!businessDetails) ? (
                  <Skeleton width={100} />
                ) : (
                  <span>{businessDetails?.name}</span>
                )}
              </BusinessName>
            </WrapBusinessLogo> */}

            {props.beforeElementsSectionSeven?.map((BeforeElement, i) => (
              <React.Fragment key={i}>
                {BeforeElement}
              </React.Fragment>))}
            {props.beforeComponentsSectionSeven?.map((BeforeComponent, i) => (
              <BeforeComponent key={i} {...props} />))}

            {!props.isHideSectionSeven && cart && (
              <></>
            )}

            <Cart
              isCartPending={cart?.status === 2}
              isCheckout
              business={businessDetails}
              isProducts={cart?.length || 0}
              configTypes={customConfigTypes.configTypes.length > 0 ? customConfigTypes.configTypes : configTypes}
            />

            {/* {!cart?.valid_products && cart?.status !== 2 && (
              <WarningText>
                {t('WARNING_INVALID_PRODUCTS', 'Some products are invalid, please check them.')}
              </WarningText>
            )} */}

            {cart.length > 0 && (
              <OrderBill>
                <table>
                  <tbody>
                    <tr>
                      <td>{t('SUBTOTAL', 'Subtotal')}</td>
                      <td>{parsePrice(shop?.totalPrice)}</td>
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
                      </>
                    )
                    }
                    {/* {
                      cart.taxes?.length > 0 && cart.taxes.filter(tax => tax.type === 2 && tax?.rate !== 0).map(tax => (
                        <tr key={tax.id}>
                          <td>
                            {tax.name || t('INHERIT_FROM_BUSINESS', 'Inherit from business')}
                            <span>{`(${verifyDecimals(tax?.rate, parseNumber)}%)`}</span>
                            <Exclamation onClick={() => setOpenTaxModal({ open: true, data: tax })}>
                              <BsInfoCircle size='20' color={theme.colors.primary} />
                            </Exclamation>
                          </td>
                          <td>{parsePrice(tax?.summary?.tax || 0)}</td>
                        </tr>
                      ))
                    } */}
                    {/* {
                      cart?.fees?.length > 0 && cart?.fees?.filter(fee => !(fee.fixed === 0 && fee.percentage === 0))?.map(fee => (
                        <tr key={fee.id}>
                          <td>
                            {fee.name || t('INHERIT_FROM_BUSINESS', 'Inherit from business')}
                            ({parsePrice(fee?.fixed)} + {fee.percentage}%)
                            <Exclamation onClick={() => setOpenTaxModal({ open: true, data: fee })}>
                              <BsInfoCircle size='20' color={theme.colors.primary} />
                            </Exclamation>
                          </td>
                          <td>{parsePrice(fee?.summary?.fixed + fee?.summary?.percentage || 0)}</td>
                        </tr>
                      ))
                    } */}
                    {cart?.driver_tip > 0 && (
                      <tr>
                        <td>
                          {t('DRIVER_TIP', 'Driver tip')}
                          {cart?.driver_tip_rate > 0 &&
                            parseInt(configState.configs?.driver_tip_type?.value, 10) === 2 &&
                            !parseInt(configState.configs?.driver_tip_use_custom?.value, 10) &&
                            (
                              <span>{`(${verifyDecimals(cart?.driver_tip_rate, parseNumber)}%)`}</span>
                            )}
                        </td>
                        <td>{parsePrice(cart?.driver_tip)}</td>
                      </tr>
                    )}
                    {options?.type === 1 && businessDetails?.delivery_price > 0 && (
                      <tr>
                        <td>{t('DELIVERY_FEE', 'Delivery Fee')}</td>
                        <td>{parsePrice(businessDetails?.delivery_price)}</td>
                      </tr>
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
                      <td>{parsePrice(shop?.totalPrice + getIncludedTaxes() + getServiceFee() + shop?.serviceFeePrice + (businessDetails?.delivery_price ? businessDetails.delivery_price : 0) - shop?.offerPrice >= 0 ? shop?.totalPrice + getIncludedTaxes() + getServiceFee() + (businessDetails?.delivery_price ? businessDetails.delivery_price : 0) - shop?.offerPrice : 0)}</td>
                      {/* <td>{(shop?.totalPrice + deliveryPrice - shop.offerPrice) >= 1 && parsePrice(shop?.totalPrice + deliveryPrice - shop.offerPrice)}</td> */}
                    </tr>
                  </tbody>
                </table>
                {isCouponEnabled && (
                  <CouponContainer>
                    <CouponControl
                      businessId={businessDetails?.id}
                      price={shop.totalPrice + deliveryPrice - shop.offerPrice}
                    />
                  </CouponContainer>
                )}
                <table className='comments'>
                  <tbody>
                    <tr>
                      <td>{t('COMMENTS', 'Comments')}</td>
                    </tr>
                    <tr>
                      <CommentContainer>
                        <TextArea
                          defaultValue={cart?.comment}
                          placeholder={t('SPECIAL_COMMENTS', 'Special Comments')}
                          onChange={(e) => handleChangeComment(e.target.value)}
                        />
                        {commentState?.loading && (
                          <Spinner>
                            <SpinnerLoader
                              style={{ height: 100 }}
                            />
                          </Spinner>
                        )}
                      </CommentContainer>
                    </tr>
                  </tbody>
                </table>
              </OrderBill>
            )}
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ marginRight: '8px' }}>
                {agreed ? (
                  <Checkbox active onClick={() => setAgreed(false)} />
                ) : (
                  <Checkbox onClick={() => setAgreed(true)} />
                )}
              </div>
              <div style={{ cursor: 'pointer' }} onClick={() => window.open('https://chatco.myfood.sg/assets/TC-PDPA.html', '_blank')}>
                {'Agreed to Terms and Conditions'}
              </div>
            </div>
            {!agreed && (
              <WarningText style={{ textAlign: 'left' }}>
                {t('AGREE_TO_TERMS_AND_CONDITIONS', 'Please Accept Terms and Conditions')}
              </WarningText>
            )}
            <WrapperPlaceOrderButton>
              <Button
                style={{ background: '#25D366' }}
                disabled={!paymethodSelected ||
                  (options.type != 3 && (!user || (user && (!user.name || !user.email || !user.cellphone)))) ||
                  placing || !agreed ||
                  (!selectedTableNumber && options.type === 3) ||
                  errorCash || !shop?.totalPrice ||
                  (options.type === 1 && (options?.address?.address == '' || (Object.keys(options?.address).length == 0)) || (options?.type == 1 && shop.totalPrice < businessDetails?.minimum))}
                // disabled={!cart?.valid || !paymethodSelected || placing || errorCash || !cart?.valid_maximum || !cart?.valid_minimum}
                onClick={() => handlePlaceOrder()}
              >
                {!(shop?.totalPrice + deliveryPrice - shop.offerPrice) ? (
                  `${t('Total Price:')} ${parsePrice(shop?.totalPrice + deliveryPrice - shop.offerPrice)}`
                ) : placing ? t('PLACING', 'Placing') :
                  <>
                    <div style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center', display: 'flex', flexDirection: 'row' }}>
                      <div style={{ paddingTop: '7px', marginRight: '10px' }}><FaWhatsapp className='span-svg' size={20} /></div>
                      {t('PLACE_ORDER_ON_WHATSAPP', 'Place Order On Whatsapp')}
                    </div>
                  </>
                }
              </Button>
            </WrapperPlaceOrderButton>

          </RightInnerContainer>
        </RightContainer>
        <Alert
          title={t('CUSTOMER_DETAILS', 'Customer Details')}
          content={alertState.content}
          acceptText={t('ACCEPT', 'Accept')}
          open={alertState.open}
          onClose={() => closeAlert()}
          onAccept={() => closeAlert()}
          closeOnBackdrop={false}
        />
        <Modal
          width='80%'
          open={openTaxModal.open}
          padding='20px'
          closeOnBackdrop
          title={`${openTaxModal.data?.name ||
            t('INHERIT_FROM_BUSINESS', 'Inherit from business')} (${typeof openTaxModal.data?.rate === 'number' ? `${openTaxModal.data?.rate}%` : `${parsePrice(openTaxModal.data?.fixed ?? 0)} + ${openTaxModal.data?.percentage}%`}) `}
          onClose={() => setOpenTaxModal({ open: false, tax: null })}
          modalTitleStyle={{ display: 'flex', justifyContent: 'center' }}
        >
          <TaxInformation data={openTaxModal.data} products={cart?.products} />
        </Modal>
        <Modal
          width='60%'
          open={openOrderSuccessModal}
          padding='20px'
          onClose={() => handleCloseOrderSuccessModal()}
          modalTitleStyle={{ display: 'flex', justifyContent: 'center' }}
        >
          <OrderSuccessModal
            products={cart}
            businessData={businessDetails}
            isCheckOut={true}
            order={newCreatedOrder}
          />
        </Modal>
      </Container>
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

export const Checkout = (props) => {
  const {
    errors,
    clearErrors,
    handleOrderRedirect,
    handleCheckoutRedirect,
    handleSearchRedirect,
    handleCheckoutListRedirect
  } = props

  const [orderState] = useOrder()
  const [, t] = useLanguage()

  const [cartState, setCartState] = useState({ loading: true, error: null, cart: null })

  const [openUpselling, setOpenUpselling] = useState(false)
  const [canOpenUpselling, setCanOpenUpselling] = useState(false)
  const [currentCart, setCurrentCart] = useState(null)
  const [alertState, setAlertState] = useState({ open: false, content: [] })
  const [isResetPaymethod, setIsResetPaymethod] = useState(false)
  const [isValid, setIsValid] = useState(false)
  const shop = useSelector((state) => state.shop)
  const cart = shop.cart;
  const businessDetails = shop?.business;

  const cartsWithProducts = orderState?.carts && (Object.values(orderState?.carts)?.filter(cart => cart?.products?.length) || null)
  const closeAlert = () => {
    setAlertState({
      open: false,
      content: []
    })
    clearErrors && clearErrors()
  }

  const handleUpsellingPage = () => {
    setOpenUpselling(false)
    setCurrentCart(null)
    setCanOpenUpselling(false)
    handleCheckoutRedirect(currentCart.uuid)
  }

  useEffect(() => {
    if (!orderState.loading && currentCart?.business_id) {
      setCurrentCart(...Object.values(orderState.carts)?.filter(cart => cart?.business_id === currentCart?.business_id))
    }
  }, [orderState.loading])

  useEffect(() => {
    if (currentCart?.products) {
      setOpenUpselling(true)
    }
  }, [currentCart])

  useEffect(() => {
    if (errors?.length) {
      setAlertState({
        open: true,
        content: errors
      })
    }
  }, [errors])

  const checkValidity = () => {
    Object.keys(businessDetails).length == 0 || cart.length === 0 ? setIsValid(false) : setIsValid(true);
  }
  useEffect(() => {
    checkValidity()
  }, [cart, businessDetails])

  const checkoutProps = {
    ...props,
    UIComponent: CheckoutUI,
    cartState,
    businessId: cartState.cart?.business_id,
    isResetPaymethod,
    setIsResetPaymethod
  }

  return (
    <>

      {!isValid && (
        <NotFoundSource
          content={t('NOT_FOUND_CARTS', 'Sorry, You don\'t seem to have any carts.')}
          btnTitle={t('GO_BACK', 'Go Back')}
          onClickButton={() => history.back()}
        />
      )}
      {/* {!cartUuid && orderState.carts && cartsWithProducts && cartsWithProducts?.length === 0 && (
        <NotFoundSource
          content={t('NOT_FOUND_CARTS', 'Sorry, You don\'t seem to have any carts.')}
          btnTitle={t('SEARCH_REDIRECT', 'Go to Businesses')}
          onClickButton={handleSearchRedirect}
        />
      )}
      {!cartUuid && orderState.carts && cartsWithProducts && cartsWithProducts?.length > 0 && (
        <CartsList>
          <CartContent
            carts={cartsWithProducts}
            isOrderStateCarts={!!orderState.carts}
            isForceOpenCart
          />
        </CartsList>
      )}

      {cartUuid && cartState.error && cartState.error?.length > 0 && (
        <NotFoundSource
          content={t('ERROR_CART_SELECTED', 'Sorry, the selected cart was not found.')}
          btnTitle={t('CHECKOUT_REDIRECT', 'Go to Checkout list')}
          onClickButton={handleCheckoutListRedirect}
        />
      )} */}

      {!(window.location.pathname === '/checkout') && (
        <Container>
          <LeftContainer>
            {[...Array(5).keys()].map((i) => (
              <WrapOrderType key={i}>
                <h1>
                  <Skeleton width={150} height={30} style={{ marginBottom: '10px' }} />
                </h1>
                <div>
                  <Skeleton height={150} style={{ marginBottom: '10px' }} />
                </div>
              </WrapOrderType>
            ))}
          </LeftContainer>
          <RightContainer>
            <RightInnerContainer>
              <Skeleton height={35} count={2} style={{ marginBottom: '10px' }} />
              <Skeleton height={150} style={{ marginBottom: '10px' }} />
              <Skeleton height={35} count={5} style={{ marginBottom: '10px' }} />
            </RightInnerContainer>
          </RightContainer>
        </Container>
      )}

      {isValid && <CheckoutController {...checkoutProps} />}

      {currentCart?.products && (
        <UpsellingPage
          businessId={currentCart?.business_id}
          cartProducts={currentCart?.products}
          business={currentCart?.business}
          handleUpsellingPage={handleUpsellingPage}
          openUpselling={openUpselling}
          canOpenUpselling={canOpenUpselling}
          setCanOpenUpselling={setCanOpenUpselling}
        />
      )}

      <Alert
        title={t('CHECKOUT ', 'Checkout')}
        content={alertState.content}
        acceptText={t('ACCEPT', 'Accept')}
        open={alertState.open}
        onClose={() => closeAlert()}
        onAccept={() => closeAlert()}
        closeOnBackdrop={false}
      />
    </>
  )
}
