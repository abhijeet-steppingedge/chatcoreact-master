import React, { useState, useRef } from 'react'
import TiPencil from '@meronex/icons/ti/TiPencil'
import IosArrowDown from '@meronex/icons/ios/IosArrowDown'
import VscTrash from '@meronex/icons/vsc/VscTrash'
import { useUtils, useLanguage, useOrder } from 'ordering-components'
import { useWindowSize } from 'ordering-ui'
import FiMinusCircle from '@meronex/icons/fi/FiMinusCircle'
import FiPlusCircle from '@meronex/icons/fi/FiPlusCircle'

import {
  AccordionSection,
  Accordion,
  AccordionContent,
  WrapperProductImage,
  ProductImage,
  ContentInfo,
  ProductComment,
  ProductInfo,
  ProductError,
  ProductActions,
  ProductActionsEdit,
  ProductActionsDelete,
  ProductPriceSection,
  ProductPrice,
  ProductNotAvailable,
  ProductSelect,
  ProductOptionsList,
  ProductQuantity
} from './styles'
import { QuantityControl } from '../QuantityControl'

export const ProductItemAccordion = (props) => {
  const {
    isCartPending,
    isCartProduct,
    product,
    changeQuantity,
    getProductMax,
    offsetDisabled,
    onDeleteProduct,
    decrement,
    increment,
    onEditProduct
  } = props
  const [, t] = useLanguage()
  const [orderState] = useOrder()
  const [{ parsePrice }] = useUtils()
  const windowSize = useWindowSize()

  const [setActive, setActiveState] = useState('')
  const [setHeight, setHeightState] = useState('0px')
  const [setRotate, setRotateState] = useState('accordion__icon')

  const content = useRef(null)
  const productSelect = useRef(null)
  const productActionsEdit = useRef(null)
  const productActionsDelete = useRef(null)
  const productInfo = () => {
    if (isCartProduct) {
      const ingredients = JSON.parse(JSON.stringify(Object.values(product.ingredients ?? {})))
      let options = JSON.parse(JSON.stringify(Object.values(product.options ?? {})))

      options = options.map(option => {
        option.suboptions = Object.values(option.suboptions ?? {})
        return option
      })
      return {
        ...productInfo,
        ingredients,
        options
      }
    }
    return product
  }

  const toggleAccordion = (e) => {
    if (e.target.classList.contains('toggle-accordion')) {
      const isActionsClick = productSelect.current?.contains(e.target) || productActionsEdit.current?.contains(e.target) || productActionsDelete.current?.contains(e.target)
      if (isActionsClick) return
      setActiveState(setActive === '' ? 'active' : '')
      setHeightState(
        setActive === 'active' ? '0px' : `${content.current.scrollHeight}px`
      )
      setRotateState(
        setActive === 'active' ? 'accordion__icon' : 'accordion__icon rotate'
      )
    }
  }

  const handleChangeQuantity = (value) => {
    if (parseInt(value) === 0) {
      onDeleteProduct(product)
    } else {
      changeQuantity(product, parseInt(value))
    }
  }

  const getFormattedSubOptionName = ({ quantity, name, position, price }) => {
    const pos = position ? `(${position})` : ''
    return `${quantity} x ${name} ${pos} +${price}`
  }

  return (
    <>
      {props.beforeElements?.map((BeforeElement, i) => (
        <React.Fragment key={i}>
          {BeforeElement}
        </React.Fragment>))}
      {props.beforeComponents?.map((BeforeComponent, i) => (
        <BeforeComponent key={i} {...props} />))}
      <AccordionSection>
        <Accordion
          isValid={true}
          className={`product accordion toggle-accordion ${setActive}`}
          onClick={(e) => toggleAccordion(e)}
        >
          <ProductInfo className='info'>
            {/* {product?.images && (
              <WrapperProductImage>
                <ProductImage bgimage={product?.images} />
              </WrapperProductImage>
            )} */}
            <ContentInfo>
              <h3>{product.name}</h3>
              {windowSize.width > 410 && (
                <span>
                  <p>{parsePrice(product.total_price ?? product.total_price)}</p>
                  {false && isCartProduct && (
                    <div>
                      {/* {onEditProduct && (
                        <span ref={productActionsEdit}>
                          <TiPencil color='#F2BB40' onClick={() => onEditProduct(product)} />
                        </span>
                      )} */}
                      {onDeleteProduct && (
                        <span ref={productActionsDelete}>
                          <VscTrash color='#D81212' onClick={() => onDeleteProduct(product.code, product.total_price)} />
                        </span>
                      )}
                    </div>
                  )}
                </span>
              )}
            </ContentInfo>
            <QuantityControl
              increment={increment}
              decrement={decrement}
              product={product}
            />
            {false && windowSize.width < 410 && (
              <ProductPriceSection>
                <ProductPrice className='prod-price'>
                  <span>
                    {parsePrice(product.total_price)}
                  </span>
                  {(productInfo().ingredients.length > 0 || productInfo().options.length > 0 || product.comment) && (
                    <p>
                      <IosArrowDown className={`toggle-accordion ${setRotate}`} />
                    </p>
                  )}
                </ProductPrice>
                {isCartProduct && (
                  <ProductActions>
                    {/* <ProductActionsEdit
                    ref={productActionsEdit}
                    onClick={() => onEditProduct(product)}
                    disabled={orderState.loading}
                  >
                    <TiPencil color='#F2BB40' />
                  </ProductActionsEdit> */}
                    <ProductActionsDelete
                      ref={productActionsDelete}
                      onClick={() => onDeleteProduct(product.code, product.total_price)}
                      disabled={orderState.loading}
                    >
                      <VscTrash color='#D81212' />
                    </ProductActionsDelete>
                  </ProductActions>
                )}
              </ProductPriceSection>
            )}
            {(productInfo().ingredients.length > 0 || productInfo().options.length > 0 || product.comment) ? (
              <p style={{ cursor: 'pointer' }}>
                <IosArrowDown className={`toggle-accordion ${setRotate}`} />
              </p>
            ) :
              (
                <p style={{ width: '20px' }}>
                </p>
              )
            }
          </ProductInfo>
        </Accordion>

        <AccordionContent
          ref={content}
          style={{ maxHeight: `${setHeight}` }}
        >
          {productInfo().ingredients.length > 0 && productInfo().ingredients.some(ingredient => !ingredient.selected) && (
            <ProductOptionsList>
              <p>{t('INGREDIENTS', 'Ingredients')}</p>
              {productInfo().ingredients.map(ingredient => !ingredient.selected && (
                <li className='ingredient' key={ingredient.id}>
                  <span>{t('NO', 'No')} {ingredient.name}</span>
                </li>
              ))}
            </ProductOptionsList>
          )}
          {productInfo().options.length > 0 && (
            <ProductOptionsList>
              {productInfo().options.map(option => (
                <li key={option.id}>
                  <p>{option.name}</p>
                  <ProductOptionsList className='suboption'>
                    {option.suboptions.map(suboption => (
                      <li key={suboption.id}>
                        <span>
                          {getFormattedSubOptionName({
                            quantity: suboption.quantity,
                            name: suboption.name,
                            position: (suboption.position !== 'whole') ? t(suboption.position.toUpperCase(), suboption.position) : '',
                            price: parsePrice(suboption.price)
                          })}
                        </span>
                      </li>
                    ))}
                  </ProductOptionsList>
                </li>
              ))}
            </ProductOptionsList>
          )}
          {product.comment && (
            <ProductComment>
              <p>{t('SPECIAL_COMMENT', 'Special Comment')}</p>
              <h3>{product.comment}</h3>
            </ProductComment>
          )}
        </AccordionContent>
      </AccordionSection>
      {props.afterComponents?.map((AfterComponent, i) => (
        <AfterComponent key={i} {...props} />))}
      {props.afterElements?.map((AfterElement, i) => (
        <React.Fragment key={i}>
          {AfterElement}
        </React.Fragment>))}
    </>
  )
}
