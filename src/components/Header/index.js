import React, { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useSession, useLanguage, useOrder, useEvent, useConfig, useCustomer } from 'ordering-components'
import { useTheme } from 'styled-components'
import FaUserCircle from '@meronex/icons/fa/FaUserCircle'
import MdClose from '@meronex/icons/md/MdClose'
import TiWarningOutline from '@meronex/icons/ti/TiWarningOutline'
import BiArrowBack from '@meronex/icons/bi/BiArrowBack';

import {
  Header as HeaderContainer,
  InnerHeader,
  LogoHeader,
  LeftHeader,
  RightHeader,
  Menu,
  MenuLink,
  SubMenu,
  CustomerInfo,
  UserEdit,
  ToTitle,
  FarAwayMessage,
  AddressWrapper
} from './styles'
import { useWindowSize } from 'ordering-ui'
import { useOnlineStatus } from 'ordering-ui'
import { capitalize, getDistance } from '../../utils'

import { LanguageSelector } from 'ordering-ui'
import { AddressesPopover } from '../AddressesPopover'
import { UserPopover } from 'ordering-ui'
import { MomentPopover } from 'ordering-ui'
import { CartPopover } from 'ordering-ui'
import { OrderTypeSelectorHeader } from '../OrderTypeSelectorHeader'
import { CartContent } from 'ordering-ui'
import { Modal } from 'ordering-ui'
import { MomentControl } from 'ordering-ui'
import { AddressList } from 'ordering-ui'
import { AddressForm } from '../AddressForm'
import { HeaderOption } from 'ordering-ui'
import { SidebarMenu } from 'ordering-ui'
import { UserDetails } from 'ordering-ui'
import { Confirm } from 'ordering-ui'
import { useSelector } from 'react-redux'
import { TrackOrderPopover } from '../TrackOrderPopover'
import { Button } from '../styles/Buttons'
import { useHistory } from 'react-router-dom'

export const Header = (props) => {
  const {
    isHome,
    location,
    isShowOrderOptions,
    isHideSignup,
    isCustomerMode
  } = props

  const { pathname } = useLocation()
  const [events] = useEvent()
  const [, t] = useLanguage()
  const [{ auth }] = useSession()
  const [orderState, { refreshOrderOptions }] = useOrder()
  const [openPopover, setOpenPopover] = useState({})
  const theme = useTheme()
  const [configState] = useConfig()
  const business = useSelector(state => state.shop.business)
  const [customerState, { deleteUserCustomer }] = useCustomer()
  const [isFarAway, setIsFarAway] = useState(false)
  const clearCustomer = useRef(null)
  const history = useHistory()


  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [customerModalOpen, setCustomerModalOpen] = useState(false)
  const [modalSelected, setModalSelected] = useState(null)
  const [confirm, setConfirm] = useState({ open: false, content: null, handleOnAccept: null })

  const cartsWithProducts = (orderState?.carts && Object.values(orderState?.carts).filter(cart => cart.products.length > 0)) || null

  const windowSize = useWindowSize()
  const onlineStatus = useOnlineStatus()

  const userCustomer = JSON.parse(window.localStorage.getItem('user-customer'))

  const configTypes = configState?.configs?.order_types_allowed?.value.split('|').map(value => Number(value)) || []
  const isPreOrderSetting = configState?.configs?.preorder_status_enabled?.value === '1'
  const [customConfigTypes, setCustomConfigTypes] = useState({ isGetting: false, configTypes: configTypes })



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

  const handleClickUserCustomer = (e) => {
    const isActionsClick = clearCustomer.current?.contains(e?.target)
    if (isActionsClick) {
      setConfirm({
        open: true,
        content: t('QUESTION_CLEAR_CUSTOMER', 'Are you sure that you want to clear the customer?'),
        handleOnAccept: () => {
          deleteUserCustomer(true)
          refreshOrderOptions()
          handleGoToPage({ page: 'home' })
          setConfirm({ ...confirm, open: false })
        }
      })
      return
    }
    setCustomerModalOpen(true)
  }

  const openModal = (opt) => {
    setModalSelected(opt)
    setModalIsOpen(true)
  }

  const handleTogglePopover = (type) => {
    setOpenPopover({
      ...openPopover,
      [type]: !openPopover[type]
    })
  }

  const handleClosePopover = (type) => {
    setOpenPopover({
      ...openPopover,
      [type]: false
    })
  }

  const handleGoToPage = (data) => {
    events.emit('go_to_page', data)
  }

  const goBack = () => {
    let slug = localStorage.getItem('previous-business')
    history.push('/' + slug)
  }

  useEffect(() => {
    if (isCustomerMode) {
      setCustomerModalOpen(false)
    }
  }, [customerState?.user?.address])

  useEffect(() => {
    if (!(pathname.includes('/search') || pathname.includes('/checkout'))) {
      setIsFarAway(false)
      return
    }
    navigator.geolocation.getCurrentPosition((pos) => {
      const crd = pos.coords
      const distance = getDistance(crd.latitude, crd.longitude, orderState?.options?.address?.location?.lat, orderState?.options?.address?.location?.lng)
      if (distance > 20) setIsFarAway(true)
      else setIsFarAway(false)
    }, (err) => {
      console.warn(`ERROR(${err.code}): ${err.message}`)
    }, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    })
  }, [orderState?.options?.address?.location, pathname])

  useEffect(() => {
    business && Object.keys(business).length > 0 ? getCustomConfigTypes(business?.menus) : null
  }, [business])

  return (
    <>
      {props.beforeElements?.map((BeforeElement, i) => (
        <React.Fragment key={i}>
          {BeforeElement}
        </React.Fragment>))}
      {props.beforeComponents?.map((BeforeComponent, i) => (
        <BeforeComponent key={i} {...props} />))}
      <HeaderContainer home={isHome}>
        <InnerHeader>
          <LeftHeader>
            {/* {!isHome && (
              <>
                {windowSize.width < 768 ? (
                  <LogoHeader>
                    <img
                      alt='Isotype'
                      width='35px'
                      height='45px'
                      src={isHome ? theme?.images?.logos?.isotypeInvert : theme?.images?.logos?.isotype} loading='lazy'
                      onClick={() => handleGoToPage({ page: orderState?.options?.address?.location && !isCustomerMode ? 'search' : 'home' })}
                    />
                  </LogoHeader>
                ) : (
                  <LogoHeader>
                    <img
                      alt='Logotype'
                      width='170px'
                      height='45px'
                      src={isHome ? theme?.images?.logos?.logotypeInvert : theme?.images?.logos?.logotype} loading='lazy'
                      onClick={() => handleGoToPage({ page: orderState?.options?.address?.location && !isCustomerMode ? 'search' : 'home' })}
                    />
                  </LogoHeader>
                )}
              </>
            )} */}
            {isShowOrderOptions && (
              <Menu className='left-header'>
                {(pathname.includes('/checkout') || pathname.includes('/orders')) && <div style={{ display: 'flex', flexDirection: 'row', cursor: 'pointer', justifyContent: 'center', textAlign: 'center' }} onClick={() => goBack()} >
                  <BiArrowBack color={'#000000'} size={20} style={{ paddingTop: '2px' }} />
                  <div style={{ color: '#000000', paddingLeft: '3px' }}>{'Back'}</div>
                </div>}
                {!configState?.loading && !customConfigTypes.isGetting && !pathname.includes('/orders') && (
                  <OrderTypeSelectorHeader configTypes={customConfigTypes.configTypes.length > 0 ? customConfigTypes.configTypes : configTypes} />
                )}
                {onlineStatus && windowSize.width > 992 && (
                  <>
                    {/* {(isPreOrderSetting || configState?.configs?.preorder_status_enabled?.value === undefined) && (
                      <>
                        <MomentPopover
                          open={openPopover.moment}
                          onClick={() => handleTogglePopover('moment')}
                          onClose={() => handleClosePopover('moment')}
                          isHome={true}
                        />
                      </>
                    )} */}
                    <AddressWrapper>
                      <AddressesPopover
                        auth={auth}
                        business={business}
                        addressState={orderState?.options?.address}
                        open={openPopover.addresses}
                        onClick={() => handleTogglePopover('addresses')}
                        onClose={() => handleClosePopover('addresses')}
                        isHome={isHome}
                      />
                      {isFarAway && (
                        <FarAwayMessage>
                          <TiWarningOutline />
                          <span>{t('YOU_ARE_FAR_FROM_ADDRESS', 'You are far from this address')}</span>
                        </FarAwayMessage>
                      )}
                    </AddressWrapper>
                  </>
                )}
              </Menu>
            )}
          </LeftHeader>
          {onlineStatus && (
            <RightHeader>
              {/* <TrackOrderPopover
                open={openPopover.trackOrder}
                onClick={() => handleTogglePopover('trackOrder')}
                onClose={() => handleClosePopover('trackOrder')}
                handleClosePopover={handleClosePopover}
              /> */}
              {/* <LanguageSelector />
              <Menu>
                {
                  !auth && windowSize.width > 870 && (
                    <>
                      <MenuLink home={isHome} onClick={() => handleGoToPage({ page: 'signin' })} name='signin'>{t('SIGN_IN', 'Sign in')}</MenuLink>
                      {!isHideSignup && (
                        <MenuLink onClick={() => handleGoToPage({ page: 'signup' })} highlight={1} name='signup'>{t('SIGN_UP', 'Sign up')}</MenuLink>
                      )}
                    </>
                  )
                }
                {
                  auth && (
                    <>
                      {windowSize.width > 768 && (
                        <UserPopover
                          withLogout
                          isCustomerMode={isCustomerMode}
                          open={openPopover.user}
                          isHome={isHome}
                          onClick={() => handleTogglePopover('user')}
                          onClose={() => handleClosePopover('user')}
                        />
                      )}
                      {isShowOrderOptions && (
                        windowSize.width > 768 ? (
                          <CartPopover
                            open={openPopover.cart}
                            carts={cartsWithProducts}
                            onClick={() => handleTogglePopover('cart')}
                            onClose={() => handleClosePopover('cart')}
                            auth={auth}
                            location={location}
                          />
                        ) : (
                          <HeaderOption
                            variant='cart'
                            totalCarts={cartsWithProducts?.length}
                            onClick={(variant) => openModal(variant)}
                          />
                        )
                      )}
                    </>
                  )
                }
              </Menu> */}
            </RightHeader>
          )}
        </InnerHeader>
        {onlineStatus && isShowOrderOptions && (
          windowSize.width > 768 && windowSize.width <= 992 ? (
            <SubMenu>
              <AddressWrapper>
                <AddressesPopover
                  auth={auth}
                  business={business}
                  addressState={orderState?.options?.address}
                  open={openPopover.addresses}
                  onClick={() => handleTogglePopover('addresses')}
                  onClose={() => handleClosePopover('addresses')}
                  isHome={isHome}
                />
                {isFarAway && (
                  <FarAwayMessage>
                    <TiWarningOutline />
                    <span>{t('YOU_ARE_FAR_FROM_ADDRESS', 'You are far from this address')}</span>
                  </FarAwayMessage>
                )}
              </AddressWrapper>
              {/* {(isPreOrderSetting || configState?.configs?.preorder_status_enabled?.value === undefined) && (
                <MomentPopover
                  open={openPopover.moment}
                  onClick={() => handleTogglePopover('moment')}
                  onClose={() => handleClosePopover('moment')}
                  isHome={isHome}
                />
              )} */}
            </SubMenu>
          ) : (
            <SubMenu>
              <AddressWrapper>
                <HeaderOption
                  variant='address'
                  addressState={orderState?.options?.address?.address?.split(',')?.[0]}
                  onClick={(variant) => openModal(variant)}
                  isHome={isHome}
                />
                {isFarAway && (
                  <FarAwayMessage>
                    <TiWarningOutline />
                    <span>{t('YOU_ARE_FAR_FROM_ADDRESS', 'You are far from this address')}</span>
                  </FarAwayMessage>
                )}
              </AddressWrapper>
              {/* {(isPreOrderSetting || configState?.configs?.preorder_status_enabled?.value === undefined) && (
                <MomentControl
                  isModalBehavior
                />
              )} */}
            </SubMenu>
          )
        )}
        {modalIsOpen && (
          <Modal
            title={t(modalSelected.toUpperCase(), capitalize(modalSelected))}
            open={modalIsOpen}
            onClose={() => setModalIsOpen(false)}
            width='70%'
            padding={modalSelected === 'address' ? '20px' : '5px'}
          >
            {modalSelected === 'cart' && (
              <CartContent
                carts={cartsWithProducts}
                isOrderStateCarts={!!orderState.carts}
                onClose={() => setModalIsOpen(false)}
              />
            )}
            {modalSelected === 'address' && (
              <AddressForm
                business={business}
                useValidationFileds
                address={orderState?.options?.address || {}}
                onCancel={() => setModalIsOpen(false)}
                onSaveAddress={() => setModalIsOpen(false)}
              />
            )}
          </Modal>
        )}
        <Confirm
          title={t('CUSTOMER', 'Customer')}
          content={confirm.content}
          acceptText={t('ACCEPT', 'Accept')}
          open={isCustomerMode && confirm.open}
          onClose={() => setConfirm({ ...confirm, open: false })}
          onCancel={() => setConfirm({ ...confirm, open: false })}
          onAccept={confirm.handleOnAccept}
          closeOnBackdrop={false}
        />
      </HeaderContainer>
      {props.afterComponents?.map((AfterComponent, i) => (
        <AfterComponent key={i} {...props} />))}
      {props.afterElements?.map((AfterElement, i) => (
        <React.Fragment key={i}>
          {AfterElement}
        </React.Fragment>))}
    </>
  )
}

const styles = {
  headCustomer: {
    margin: 0,
    height: 20,
    width: 20,
    backgroundColor: '#CCCCCC',
    borderRadius: '100%',
    marginLeft: 5
  },
  clearCustomer: {
    margin: 0,
    fontSize: 20
  }
}

Header.defaultProps = {
  isShowOrderOptions: true
}
