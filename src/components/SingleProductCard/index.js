import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { useLanguage, useConfig, useOrder, useUtils } from 'ordering-components'
import { useTheme } from 'styled-components';

import {
  CardContainer,
  CardInfo,
  WrapLogo,
  CardLogo,
  SoldOut
} from './styles'
import { useDispatch, useSelector } from 'react-redux';
import { QuantityControl } from '../QuantityControl';
import { Button } from '../styles/Buttons';

export const SingleProductCard = (props) => {
  const {
    businessId,
    business = { business },
    product,
    isSoldOut,
    isSkeleton,
    onProductClick,
    isCartOnProductsList
  } = props

  const [, t] = useLanguage()
  const [stateConfig] = useConfig()
  const [{ parsePrice, optimizeImage }] = useUtils()
  const [orderState] = useOrder()
  const theme = useTheme()
  const shop = useSelector(state => state.shop);
  const dispatch = useDispatch()
  const [productCart, setProductCart] = useState(null)
  const [hasOptions, setHasOptions] = useState(false)

  const editMode = typeof product?.code !== 'undefined'

  const removeToBalance = editMode ? product?.quantity : 0
  const cart = orderState.carts?.[`businessId:${businessId}`]
  // const productCart = shop?.cart?.find(prod => prod.code === product?.code)
  const totalBalance = (productCart?.quantity || 0) - removeToBalance

  const maxCartProductConfig = (stateConfig.configs.max_product_amount ? parseInt(stateConfig.configs.max_product_amount) : 100) - totalBalance

  const productBalance = (cart?.products?.reduce((sum, _product) => sum + (product && _product.id === product?.id ? _product.quantity : 0), 0) || 0) - removeToBalance
  let maxCartProductInventory = (product?.inventoried ? product?.quantity : undefined) - productBalance
  maxCartProductInventory = !isNaN(maxCartProductInventory) ? maxCartProductInventory : maxCartProductConfig

  const maxProductQuantity = Math.min(maxCartProductConfig, maxCartProductInventory)

  const increment = async () => {
    if ((product?.ingredients && Object.keys(product?.ingredients).length > 0) || (product?.options && Object.keys(product?.options).length > 0)) {
      onProductClick(product);
    } else {
      let qty = productCart?.qty + 1;
      dispatch({ type: 'ADJUST_ITEM_QTY', payload: { code: productCart?.code, qty: qty, operation: 'plus', productPrice: productCart?.price } });
      return;
    }
  }

  const decrement = async () => {
    let qty = productCart?.qty - 1;
    if (qty >= 1) {
      dispatch({ type: 'ADJUST_ITEM_QTY', payload: { code: productCart?.code, qty: qty, operation: 'minus', productPrice: productCart?.price } });
    } else {
      dispatch({ type: 'REMOVE_FROM_CART', payload: { code: productCart?.code, productPrice: productCart?.price } });
    }
  }
  const __onProductClick = () => {
    onProductClick(product, hasOptions);
    // if (hasOptions) {
    //   onProductClick(product);
    // } else {
    //   product['selected_ingredients'] = {};
    //   product['options'] = {};
    //   dispatch({ type: 'ADD_TO_CART', payload: { product: product, code: product.code, business: business, } });
    // }
  }


  useEffect(() => {
    const flag = ((product?.ingredients && Object.keys(product?.ingredients).length > 0) || (product?.options && Object.keys(product?.options).length > 0))
    setHasOptions(flag);
  }, [product])

  useEffect(() => {
    const prod = shop?.cart?.find(prod => hasOptions ? prod.code === product?.code : prod.id === product?.id)
    setProductCart(prod);
  }, [shop, product])

  return (
    <>
      {props.beforeElements?.map((BeforeElement, i) => (
        <React.Fragment key={i}>
          {BeforeElement}
        </React.Fragment>))}
      {props.beforeComponents?.map((BeforeComponent, i) => (
        <BeforeComponent key={i} {...props} />))}
      <CardContainer
        soldOut={isSoldOut || maxProductQuantity <= 0}
        // onClick={() => !isSkeleton && onProductClick(product)}
        isCartOnProductsList={isCartOnProductsList}
      >
        {!isSkeleton ? (
          <>
            {product?.images ? (
              <WrapLogo>
                <CardLogo
                  className='image'
                  soldOut={isSoldOut || maxProductQuantity <= 0}
                  bgimage={optimizeImage(product?.images, 'h_200,c_limit')}
                />
              </WrapLogo>
            )
              :
              (
                <WrapLogo>
                  <CardLogo
                    className='image'
                    soldOut={false}
                    bgimage={optimizeImage(product?.images, 'h_200,c_limit')}
                  />
                </WrapLogo>

              )}
          </>
        ) : (
          <Skeleton height={130} width={130} />
        )}
        {(isSoldOut || maxProductQuantity <= 0) && <SoldOut>{t('SOLD_OUT', 'SOLD OUT')}</SoldOut>}

        <CardInfo
          soldOut={isSoldOut || maxProductQuantity <= 0}
          noImage={!product?.images}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {!isSkeleton ? (<h1 style={{ marginBottom: '0px', marginTop: '10px', }}>{product?.name}</h1>) : (<Skeleton width={130} />)}
            {!isSkeleton ? <small style={{ fontWeight: '100' }}>{product?.description}</small> : (<Skeleton width={130} />)}
            {/* {!isSkeleton ? (<p>{product?.description}</p>) : (<Skeleton width={130} />)} */}
            {!isSkeleton ? (<p style={{ fontWeight: 'bold' }}>{parsePrice(product?.price)}</p>) : (<Skeleton width={130} />)}
          </div>
          {!isSkeleton ? (
            <>
              {(productCart && !hasOptions) &&
                <QuantityControl
                  increment={increment}
                  decrement={decrement}
                  product={productCart}
                  style={{ position: 'absolute', bottom: 1, right: 0, }}
                />
              }
              {!(product.inventoried && !product.quantity) &&
                <>
                  {(!productCart) &&
                    <Button color='primary' lineHeight={'20px'} style={{ boxShadow: '0 3px 9px #eb593369', bottom: 6, position: 'absolute', right: 0, }} onClick={() => __onProductClick()}>
                      {'Add'}
                    </Button>
                  }
                  {productCart && hasOptions &&
                    <Button color='primary' lineHeight={'20px'} style={{ boxShadow: '0 3px 9px #eb593369', bottom: 6, position: 'absolute', right: 0, }} onClick={() => __onProductClick()}>
                      {'Add More'}
                    </Button>
                  }
                </>}
            </>
          ) : (
            <Skeleton width={100} />
          )}
        </CardInfo>
      </CardContainer>
      {props.afterComponents?.map((AfterComponent, i) => (
        <AfterComponent key={i} {...props} />))}
      {props.afterElements?.map((AfterElement, i) => (
        <React.Fragment key={i}>
          {AfterElement}
        </React.Fragment>))}
    </>
  )
}
