import React from 'react'
import FiPlusCircle from '@meronex/icons/fi/FiPlusCircle'
import { useLanguage } from 'ordering-components'
import EnPlus from '@meronex/icons/en/EnPlus';
import EnMinus from '@meronex/icons/en/EnMinus';

import {
  Container,
  ProductQuantity,
} from './styles'
import { useTheme } from 'styled-components'

export const QuantityControl = (props) => {
  const {
    decrement,
    increment,
    product,
    style,
  } = props

  const [, t] = useLanguage()
  const theme = useTheme()

  return (
    <>
      {props.beforeElements?.map((BeforeElement, i) => (
        <React.Fragment key={i}>
          {BeforeElement}
        </React.Fragment>))}
      {props.beforeComponents?.map((BeforeComponent, i) => (
        <BeforeComponent key={i} {...props} />))}
      <Container backgroundColor={theme.colors.primary} style={style ? style : {}}>
        <div className='incdec-control'>
          <EnMinus
            color={theme.colors.white}
            onClick={() => decrement(product.code, product.qty, product.total_price)}
            className={`icon `}
          />
          <ProductQuantity color={theme.colors.white}>{product.qty}</ProductQuantity>
          <EnPlus
            color={theme.colors.white}
            onClick={() => increment(product.code, product.total_price, product.qty)}
            className={`icon`}
          />
        </div>
      </Container>
      {props.afterComponents?.map((AfterComponent, i) => (
        <AfterComponent key={i} {...props} />))}
      {props.afterElements?.map((AfterElement, i) => (
        <React.Fragment key={i}>
          {AfterElement}
        </React.Fragment>))}
    </>
  )
}

