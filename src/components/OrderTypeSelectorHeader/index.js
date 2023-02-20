import React, { useState } from 'react'
import { OrderTypeControl, useLanguage, useOrder, useSession } from 'ordering-components'
import { Select } from '../styles/Select'
import FaCarSide from '@meronex/icons/fa/FaCarSide'
import FaTruckPickup from '@meronex/icons/fa/FaTruckPickup'
import MdcTruckDeliveryOutline from '@meronex/icons/mdc/MdcTruckDeliveryOutline'
import AiFillShop from '@meronex/icons/ai/AiFillShop'
import GiFoodTruck from '@meronex/icons/gi/GiFoodTruck'
import MdRadioButtonChecked from '@meronex/icons/md/MdRadioButtonChecked'
import MdRadioButtonUnchecked from '@meronex/icons/md/MdRadioButtonUnchecked'
import { Confirm } from 'ordering-ui'
import settings from '../../config.json'

import {
  Option,
  OrderTypeWrapper,
  SelectedOption,
  ContentOption,
  OrderTypeItem
} from './styles'
import { useSelector, useDispatch } from 'react-redux'

const OrderTypeSelectorHeaderUI = (props) => {
  const {
    isCustomStyle,
    handleChangeOrderType,
    typeSelected,
    defaultValue,
    configTypes,
    width,
    isHome,
    orderTypes
  } = props
  const [, t] = useLanguage()
  const defaultType = configTypes?.includes(typeSelected) ? null : configTypes?.[0]
  const shop = useSelector(state => state.shop);
  const dispatch = useDispatch();
  const [{ options },] = useOrder()
  const [, { changeType, setStateValues }] = useOrder()
  const [confirm, setConfirm] = useState({ open: false, content: null, handleOnAccept: null })

  const __handleChangeOrderType = (value) => {
    options.type = value;
    if (shop.cart.length > 0) {
      setConfirm({
        open: true,
        content: t('ORDER_TYPE_CHANGE_WARNING', 'Changing order type to delivery will clear cart. Do you want to proceed?'),
        handleOnAccept: () => {
          setStateValues({ options })
          dispatch({ type: 'EMPTY_CART' })
          setConfirm({ ...confirm, open: false })
        }
      })
      return
    }
    setStateValues({ options })
    // changeType(value);
  }

  const closeAlert = () => {
    setAlertState({
      open: false,
      content: [],
      onAccept: closeAlert, onClose: closeAlert
    })
  }

  return (
    typeSelected !== undefined && (
      <>
        <OrderTypeWrapper>
          {isCustomStyle ? (
            <>
              {orderTypes.filter(type => configTypes?.includes(type.value)).map(orderType => (
                <OrderTypeItem
                  key={orderType.value}
                  onClick={() => __handleChangeOrderType(orderType.value)}
                >
                  {(orderType.value === defaultType || orderType.value === defaultValue || orderType.value === typeSelected) ? (
                    <MdRadioButtonChecked />
                  ) : (
                    <MdRadioButtonUnchecked />
                  )}
                  {orderType.content}
                </OrderTypeItem>
              ))}
            </>
          ) : (
            <Select
              options={orderTypes.filter(type => configTypes?.includes(type.value))}
              defaultValue={defaultType || defaultValue || typeSelected}
              onChange={(orderType) => __handleChangeOrderType(orderType)}
              width={width}
              isHome={isHome}
            />
          )}
        </OrderTypeWrapper>

        <Confirm
          title={t('INFORMATION', 'Information')}
          content={confirm.content}
          acceptText={t('ACCEPT', 'Accept')}
          open={confirm.open}
          onClose={() => setConfirm({ ...confirm, open: false })}
          onCancel={() => setConfirm({ ...confirm, open: false })}
          onAccept={confirm.handleOnAccept}
          closeOnBackdrop={false}
        />
      </>
    )
  )
}

export const OrderTypeSelectorHeader = (props) => {
  const [, t] = useLanguage()

  const orderTypeProps = {
    ...props,
    UIComponent: OrderTypeSelectorHeaderUI,
    orderTypes: props.orderTypes || [
      {
        value: 1,
        content: <Option><ContentOption>{t('DELIVERY', 'Delivery')}</ContentOption></Option>,
        showOnSelected: <Option><SelectedOption>{t('DELIVERY', 'Delivery')}</SelectedOption></Option>
      },
      {
        value: 2,
        content: <Option><ContentOption>{t('PICKUP', 'Pickup')}</ContentOption></Option>,
        showOnSelected: <Option><SelectedOption>{t('PICKUP', 'Pickup')}</SelectedOption></Option>
      },
      {
        value: 3,
        content: <Option><ContentOption>{t('EAT_IN', 'Eat in')}</ContentOption></Option>,
        showOnSelected: <Option><SelectedOption>{t('EAT_IN', 'Eat in')}</SelectedOption></Option>
      },
      {
        value: 4,
        content: <Option><ContentOption>{t('CURBSIDE', 'Curbside')}</ContentOption></Option>,
        showOnSelected: <Option><SelectedOption>{t('CURBSIDE', 'Curbside')}</SelectedOption></Option>
      },
      {
        value: 5,
        content: <Option><ContentOption>{t('DRIVE_THRU', 'Drive thru')}</ContentOption></Option>,
        showOnSelected: <Option><SelectedOption>{t('DRIVE_THRU', 'Drive thru')}</SelectedOption></Option>
      }
    ]
  }

  return <OrderTypeControl {...orderTypeProps} />
}
