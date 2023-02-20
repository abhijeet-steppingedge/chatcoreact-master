import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import FiMinusCircle from '@meronex/icons/fi/FiMinusCircle'
import FiPlusCircle from '@meronex/icons/fi/FiPlusCircle'
import {
  ProductForm as ProductOptions,
  useLanguage,
  useOrder,
  useUtils
} from 'ordering-components'

import { scrollTo } from '../../utils'
import { useWindowSize } from 'ordering-ui'
import { useTheme } from 'styled-components'
import { ProductIngredient } from '../ProductIngredient'
import { ProductOption } from '../ProductOption'
import { ProductOptionSubOption } from '../ProductOptionSubOption'
import { Button } from 'ordering-ui'
import { NotFoundSource } from 'ordering-ui'
import { generateUniqueCode } from '../../utils'

import {
  ProductContainer,
  WrapperImage,
  ProductImage,
  ProductInfo,
  ProductEdition,
  SectionTitle,
  ProductActions,
  ProductComment,
  SkeletonBlock,
  WrapperSubOption,
  SkuContent,
  ProductFormTitle,
  WrapperIngredients,
  ShareWrapper,
  ProductTagsListContainer,
  ProductTagWrapper,
  ProductQuantity,
} from './styles'
import { connect } from 'react-redux'
const ProductOptionsUI = (props) => {
  const {
    businessSlug,
    business,
    editMode,
    isSoldOut,
    productObject,
    productCart,
    showOption,
    maxProductQuantity,
    errors,
    handleChangeIngredientState,
    handleChangeSuboptionState,
    handleChangeCommentState,
    isIndividualBusinessCart,
    onSave
  } = props

  const { product, loading, error } = productObject
  const [productInCart, setProductInCart] = useState({ exists: false, product: {} })
  const theme = useTheme()
  const windowSize = useWindowSize()
  const [, t] = useLanguage()
  const [orderState] = useOrder()
  const [{ optimizeImage, parsePrice }] = useUtils()
  const [totalProductPrice, setTotalProductPrice] = useState(productCart?.total)
  const [productQty, setProductQty] = useState(1)
  const handleSaveProduct = () => {
    const isErrors = Object.values(errors).length > 0
    if (!isErrors) {
      handleSave && handleSave()
      return
    }
    const myElement = document.getElementsByClassName('error')[0]
    const productContainer = document.getElementsByClassName('product-container')[0]
    if (!myElement || !productContainer) {
      return
    }
    let topPos = myElement.offsetTop - productContainer.offsetTop
    if (windowSize.width <= 768) {
      const productImage = document.getElementById('product_image')
      topPos = topPos + (myElement.offsetTop < productImage.clientHeight ? productImage.clientHeight : 0)
    }
    scrollTo(productContainer, topPos, 1250)
  }
  const handleSave = async () => {
    product['ingredients'] = product.ingredients;
    product['selected_ingredients'] = productCart.ingredients;
    product['options'] = productCart.options;
    product['total_price'] = productCart.total;
    if (Object.keys(product.ingredients).length > 0 || Object.keys(product.options).length > 0) {
      product['code'] = generateUniqueCode(5)
    }
    for (let i = 1; i <= productQty; i++) {
      props.addItemToCart(product, business);
    }
    getCurrentProduct({ ...product, qty: productQty });
    onSave(product)
    return;
  }
  const increment = async () => {
    let qty = productQty + 1;
    let totalPrice = productCart.total * qty
    setProductQty(qty)
    setTotalProductPrice(totalPrice)
    productInCart.exists ?? props.changeQuantity(product.code, qty, 'plus', productCart.total)
    return;
  }

  const decrement = async () => {
    let qty = productQty - 1;
    let totalPrice = productCart.total * qty
    setProductQty(qty)
    setTotalProductPrice(totalPrice)
    if (qty >= 1) {
      productInCart.exists ?? props.changeQuantity(product.code, qty, 'minus', productCart.total)
    } else {
      props.removeItemFromCart(product.code, productCart.total)
      setProductInCart({ exists: false, product: {} })
    }
  }

  const getCurrentProduct = (justAddedProduct = {}) => {
    let item = justAddedProduct;
    let itemLength = Object.keys(justAddedProduct).length;
    if (itemLength == 0) {
      let cart = props.cart.shop.cart;
      item = cart.find((item) => item.code === product.code);
      itemLength = item ? Object.keys(item).length : 0
    }
    setProductInCart({ exists: itemLength > 0 ? true : false, product: itemLength > 0 ? item : {} })
  }

  useEffect(() => {
    getCurrentProduct();
  }, [product])
  // useEffect(() => {
  //   setProductQty(productInCart.exists ? productInCart.product.qty : productQty);
  // }, [productInCart])
  useEffect(() => {
    let totalPrice = productCart.total * productQty
    setTotalProductPrice(totalPrice)
  }, [productCart])

  const isError = (id) => {
    let classnames = ''
    if (errors[`id:${id}`]) {
      classnames = 'error'
    }
    if (isSoldOut || maxProductQuantity <= 0) {
      classnames += ' soldout'
    }
    return classnames
  }
  return (
    <>
      {props.beforeElements?.map((BeforeElement, i) => (
        <React.Fragment key={i}>
          {BeforeElement}
        </React.Fragment>))}
      {props.beforeComponents?.map((BeforeComponent, i) => (
        <BeforeComponent key={i} {...props} />))}
      <ProductContainer className='product-container'>
        {loading && !error && (
          <SkeletonBlock width={90}>
            <Skeleton variant='rect' height={50} />
            <Skeleton variant='rect' height={50} />
            <Skeleton variant='rect' height={200} />
          </SkeletonBlock>
        )}
        {
          props.beforeMidElements?.map((BeforeMidElements, i) => (
            <React.Fragment key={i}>
              {BeforeMidElements}
            </React.Fragment>))
        }
        {
          props.beforeMidComponents?.map((BeforeMidComponents, i) => (
            <BeforeMidComponents key={i} {...props} />))
        }
        {!loading && !error && product && (
          <>
            <WrapperImage>
              <ProductImage id='product_image'>
                <img
                  src={product?.images || theme.images?.dummies?.product}
                  alt='product'
                  loading='lazy'
                  onError={(e) => { e.target.onerror = null; e.target.src = theme.images?.dummies?.product }}
                />
              </ProductImage>
              {/* <ProductTagsListContainer>
                {product.tags.map(tag => (
                  <ProductTagWrapper key={tag.id}>
                    <img src={optimizeImage(tag?.image || theme.images?.dummies?.product, 'h_40,c_limit')} alt='' />
                    <span>{tag.name}</span>
                  </ProductTagWrapper>
                ))}
              </ProductTagsListContainer> */}
            </WrapperImage>
            <ProductInfo>
              <ProductFormTitle>
                <h2>{product?.name}</h2>
                {product?.description && <p>{product?.description}</p>}
                {product?.sku && product?.sku !== '-1' && product?.sku !== '1' && (
                  <SkuContent>
                    <h2>{t('SKU', theme?.defaultLanguages?.SKU || 'Sku')}</h2>
                    <p>{product?.sku}</p>
                  </SkuContent>
                )}
              </ProductFormTitle>
              <ProductEdition>
                {product?.ingredients.length > 0 && (<SectionTitle>{t('INGREDIENTS', theme?.defaultLanguages?.INGREDIENTS || 'Ingredients')}</SectionTitle>)}
                <WrapperIngredients isProductSoldout={isSoldOut || maxProductQuantity <= 0}>
                  {product?.ingredients.map(ingredient => (
                    <ProductIngredient
                      key={ingredient?.id}
                      ingredient={ingredient}
                      state={productCart.ingredients[`id:${ingredient?.id}`]}
                      onChange={handleChangeIngredientState}
                    />
                  ))}
                </WrapperIngredients>
                {
                  product?.extras.map(extra => extra.options.map(option => {
                    const currentState = productCart.options[`id:${option?.id}`] || {}
                    return (
                      <div key={option?.id}>
                        {
                          showOption(option) && (
                            <ProductOption
                              option={option}
                              currentState={currentState}
                              error={errors[`id:${option?.id}`]}
                            >
                              <WrapperSubOption className={isError(option?.id)}>
                                {
                                  option.suboptions.filter(suboptions => suboptions.enabled).map(suboption => {
                                    const currentState = productCart.options[`id:${option?.id}`]?.suboptions[`id:${suboption?.id}`] || {}
                                    const balance = productCart.options[`id:${option?.id}`]?.balance || 0
                                    return (
                                      <ProductOptionSubOption
                                        key={suboption?.id}
                                        onChange={handleChangeSuboptionState}
                                        balance={balance}
                                        option={option}
                                        suboption={suboption}
                                        state={currentState}
                                      />
                                    )
                                  })
                                }
                              </WrapperSubOption>
                            </ProductOption>
                          )
                        }
                      </div>
                    )
                  }))
                }
                {
                  props.afterMidElements?.map((MidElement, i) => (
                    <React.Fragment key={i}>
                      {MidElement}
                    </React.Fragment>))
                }
                {
                  props.afterMidComponents?.map((MidComponent, i) => (
                    <MidComponent key={i} {...props} />))
                }
              </ProductEdition>
              <ProductActions className={'isIndividualBusinessCart-ProductAction'}>
                {
                  productCart && !isSoldOut && maxProductQuantity > 0 && (
                    <div className='incdec-control' style={{ marginRight: '10px' }}>
                      <FiMinusCircle
                        onClick={decrement}
                        className={`${isSoldOut || productQty == 1 ? 'disabled' : ''}`}
                      />
                      <ProductQuantity>{productQty}</ProductQuantity>
                      <FiPlusCircle
                        onClick={increment}
                        className={`${maxProductQuantity <= 0 || productQty >= maxProductQuantity || isSoldOut ? 'disabled' : ''}`}
                      />
                    </div>
                  )
                }

                {productCart && !isSoldOut && maxProductQuantity > 0 && (
                  <Button
                    className={`add ${(maxProductQuantity === 0 || Object.keys(errors).length > 0) ? 'disabled' : ''}`}
                    color='primary'
                    onClick={() => handleSaveProduct()}
                    disabled={orderState.loading}
                  >
                    {orderState.loading ? (
                      <span>{t('LOADING', 'Loading')}</span>
                    ) : (
                      <span>
                        {editMode ? t('UPDATE', 'Update') : t('ADD_TO_CART', 'Add to Cart')}
                      </span>
                    )}
                    <span className='total'>{totalProductPrice && parsePrice(totalProductPrice)}</span>
                  </Button>
                )}
              </ProductActions>
            </ProductInfo>
          </>
        )}
        {error && error.length > 0 && (
          <NotFoundSource
            content={error[0]?.message || error[0]}
          />
        )}
      </ProductContainer>
      {props.afterComponents?.map((AfterComponent, i) => (
        <AfterComponent key={i} {...props} />))}
      {props.afterElements?.map((AfterElement, i) => (
        <React.Fragment key={i}>
          {AfterElement}
        </React.Fragment>))}
    </>
  )
}

const ProductForm = (props) => {
  const productOptionsProps = {
    ...props,
    UIComponent: ProductOptionsUI
  }

  return (
    <ProductOptions {...productOptionsProps} />
  )
}
const mapStateToProps = state => {
  return {
    cart: state
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addItemToCart: (product, business) => dispatch({ type: 'ADD_TO_CART', payload: { product: product, code: product.code, business: business, } }),
    removeItemFromCart: (productId, productPrice) => dispatch({ type: 'REMOVE_FROM_CART', payload: { code: productId, productPrice } }),
    changeQuantity: (productId, qty, operation, productPrice) => dispatch({ type: 'ADJUST_ITEM_QTY', payload: { code: productId, qty, operation, productPrice } }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm);
