import React, { useRef, useEffect, useState } from 'react'
import { useOrder, useLanguage, useEvent, useApi } from 'ordering-components'
import { usePopper } from 'react-popper'
import { HeaderItem, PopoverBody, PopoverArrow, Container, Title, ActionsForm, FormInput } from './styles'
import ZoLocationFood from '@meronex/icons/zo/ZoLocationFood';
import { useHistory } from 'react-router-dom'
import { Input } from '../styles/Inputs'
import { Button } from '../styles/Buttons'
import systemConfig from '../../config.json'
import { Alert, InputPrimary } from 'ordering-ui'
import parsePhoneNumber from 'libphonenumber-js'
import { InputPhoneNumber } from '../InputPhoneNumber'

export const TrackOrderPopover = (props) => {
  const {
    open,
    handleClosePopover
  } = props

  const [events] = useEvent()
  const [orderState] = useOrder()
  const [, t] = useLanguage()
  const referenceElement = useRef()
  const popperElement = useRef()
  const arrowElement = useRef()
  const testElement = useRef()
  const history = useHistory()
  const [ordering] = useApi()
  const [inputOrderId, setInputOrderId] = useState()
  const [userPhoneNumber, setUserPhoneNumber] = useState(null)
  const [requestResult, setRequestResult] = useState(null)
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [alertState, setAlertState] = useState({ open: false, content: [] })
  const userFromLocal = localStorage.getItem('user');
  const user = userFromLocal ? JSON.parse(userFromLocal) : null;
  const token = systemConfig.ordering_customer.session.access_token

  const popper = usePopper(referenceElement.current, popperElement.current, {
    placement: 'auto',
    modifiers: [
      { name: 'arrow', options: { element: arrowElement.current } },
      {
        name: 'offset',
        options: {
          offset: [0, 12]
        }
      }
    ]
  })


  const { styles, attributes, forceUpdate } = popper

  const popStyle = { ...styles.popper, visibility: open ? 'visible' : 'hidden', width: '450px', maxHeight: '70vh', overflowY: 'auto' }
  if (!open) {
    popStyle.transform = 'translate3d(0px, 0px, 0px)'
  }

  const handleMapDragging = (value) => (testElement.current = { isMapDragging: value })

  const handleClickOutside = (e) => {
    if (!open) return
    const outsidePopover = !popperElement.current?.contains(e.target)
    const outsidePopoverMenu = !referenceElement.current?.contains(e.target)
    const outsideModal = !window.document.getElementById('app-modals') ||
      !window.document.getElementById('app-modals').contains(e.target)
    if (outsidePopover && outsidePopoverMenu && outsideModal && !testElement.current?.isMapDragging) {
      props.onClose && props.onClose()
    }
    handleMapDragging(false)
  }

  const handleKeyDown = (e) => {
    if (e.keyCode === 27) {
      props.onClose && props.onClose()
    }
  }

  const handleSubmit = () => {
    events.emit('go_to_page', { page: 'order_detail', params: { orderId: inputOrderId, cellphone: userPhoneNumber, businessSlug: requestResult?.slug }, replace: true })
  }

  const handleChangeInput = (e) => {
    if (e.target.name == 'order_id') {
      setInputOrderId(e.target.value)
    }
    if (e.target.name == 'cellphone') {
      setUserPhoneNumber(e.target.value)
    }
  }

  const closeAlert = () => {
    setAlertState({
      open: false,
      content: []
    })
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
          content: result
        })
        return;
      }
      const { content } = await ordering.setAccessToken(token).businesses(result.business_id).get()
      if (result?.customer?.cellphone != userPhoneNumber || content?.error) {
        setAlertState({
          open: true,
          content: [t('REQUESTED_ORDER_WAS_NOT_FOUND', 'Requested order was not found')]
        })
        return;
      }
      setRequestResult(content?.result);
      handleClosePopover && handleClosePopover('trackOrder')
      handleSubmit()
    } catch (error) {
      setSubmitting(false);
      console.log(error)
    }
  }

  useEffect(() => {
    window.addEventListener('mouseup', handleClickOutside)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('mouseup', handleClickOutside)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  useEffect(() => {
    forceUpdate && forceUpdate()
  }, [open, orderState])

  useEffect(() => {
    events.on('map_is_dragging', handleMapDragging)
    return () => events.off('map_is_dragging', handleMapDragging)
  }, [])

  return (
    <div className='address-popover' style={{ overflow: 'hidden' }}>
      {props.beforeElements?.map((BeforeElement, i) => (
        <React.Fragment key={i}>
          {BeforeElement}
        </React.Fragment>))
      }
      {props.beforeComponents?.map((BeforeComponent, i) => (
        <BeforeComponent key={i} {...props} />))
      }
      <HeaderItem ref={referenceElement} onClick={props.onClick} isHome={props.isHome}>
        <ZoLocationFood /> <span>{t('TRACK_ORDER', 'Track Order')}</span>
      </HeaderItem>
      <PopoverBody className='form_edit' ref={popperElement} style={popStyle} {...attributes.popper}>
        {open && (
          <Container>
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
          </Container>
        )}
        <PopoverArrow key='arrow' ref={arrowElement} style={styles.arrow} />
      </PopoverBody>

      <Alert
        title={t('TRACK_ORDER ', 'Track Order')}
        content={alertState.content}
        acceptText={t('ACCEPT', 'Accept')}
        open={alertState.open}
        onClose={() => closeAlert()}
        onAccept={() => closeAlert()}
        closeOnBackdrop={false}
      />
      {props.afterComponents?.map((AfterComponent, i) => (
        <AfterComponent key={i} {...props} />))
      }
      {props.afterElements?.map((AfterElement, i) => (
        <React.Fragment key={i}>
          {AfterElement}
        </React.Fragment>))
      }
    </div>
  )
}