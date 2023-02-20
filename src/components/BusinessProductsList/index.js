import React, { createRef, useEffect, useState } from 'react'
import { ProductsList, useLanguage, useConfig } from 'ordering-components'

import { SingleProductCard } from '../SingleProductCard'
import { OrderTypeSelectorHeader } from '../OrderTypeSelectorHeader'
import { NotFoundSource } from '../NotFoundSource'

import {
  ProductsContainer,
  ProductsListing,
  WrapAllCategories,
  ErrorMessage,
  WrapperNotFound
} from './styles'
import { MomentControl } from '../MomentControl'
import { useWindowSize } from 'ordering-ui'

const BusinessProductsListUI = (props) => {
  const {
    errors,
    businessId,
    business,
    category,
    categories,
    categoryState,
    isBusinessLoading,
    onProductClick,
    handleSearchRedirect,
    featured,
    searchValue,
    isCartOnProductsList,
    handleClearSearch,
    configTypes,
    errorQuantityProducts
  } = props

  const [, t] = useLanguage()
  const windowSize = useWindowSize()
  const [configState] = useConfig()
  const isPreOrderSetting = configState?.configs?.preorder_status_enabled?.value === '1'


  return (
    <>
      {props.beforeElements?.map((BeforeElement, i) => (
        <React.Fragment key={i}>
          {BeforeElement}
        </React.Fragment>))}
      {props.beforeComponents?.map((BeforeComponent, i) => (
        <BeforeComponent key={i} {...props} />))}
      <ProductsContainer>
        {category.id && (
          <ProductsListing>
            {
              categoryState.products?.map(product => (
                <SingleProductCard
                  key={product.code}
                  isSoldOut={(product.inventoried && !product.quantity)}
                  product={product}
                  businessId={businessId}
                  business={business}
                  onProductClick={onProductClick}
                  isCartOnProductsList={isCartOnProductsList}
                />
              ))
            }
          </ProductsListing>
        )}

        {/* {
          !category.id && (
            <>
              {
                featured && categoryState?.products?.find(product => product.featured) && (
                  <WrapAllCategories>
                    <h3>{t('FEATURED', 'Featured')}</h3>
                    <ProductsListing>
                      {categoryState.products?.map(product => product.featured && (
                        <SingleProductCard
                          key={product.code}
                          isSoldOut={(product.inventoried && !product.quantity)}
                          product={product}
                          businessId={businessId}
                          business={business}
                          onProductClick={onProductClick}
                          isCartOnProductsList={isCartOnProductsList}
                        />
                      ))}
                    </ProductsListing>
                  </WrapAllCategories>
                )
              }
            </>
          )
        } */}

        {
          !category.id && categories.filter(category => category.id !== null).map((category, i, _categories) => {
            const products = categoryState.products?.filter(product => product.category_id === category.id) || []
            return (
              <React.Fragment key={category.id}>
                {
                  products.length > 0 && (
                    <WrapAllCategories id={`section-${category.id}`} >
                      <h4>{category.name}</h4>
                      <ProductsListing>
                        {
                          products.map(product => (
                            <SingleProductCard
                              key={product.code}
                              isSoldOut={product.inventoried && !product.quantity}
                              businessId={businessId}
                              business={business}
                              product={product}
                              onProductClick={onProductClick}
                              isCartOnProductsList={isCartOnProductsList}
                            />
                          ))
                        }
                        {
                          categoryState.loading && (i + 1) === _categories.length && [...Array(categoryState.pagination.nextPageItems).keys()].map(i => (
                            <SingleProductCard
                              key={`skeleton:${i}`}
                              isSkeleton
                            />
                          ))
                        }
                      </ProductsListing>
                    </WrapAllCategories>
                  )
                }
              </React.Fragment>
            )
          })
        }

        {
          (categoryState.loading || isBusinessLoading) && (
            <ProductsListing>
              {[...Array(categoryState.pagination.nextPageItems).keys()].map(i => (
                <SingleProductCard
                  key={`skeleton:${i}`}
                  isSkeleton
                />
              ))}
            </ProductsListing>
          )
        }

        {
          !categoryState.loading && !isBusinessLoading && categoryState.products.length === 0 && !((searchValue && errorQuantityProducts) || (!searchValue && !errorQuantityProducts)) && (
            <>
              <div style={{ justifyContent: 'center', marginTop: '5vw', paddingLeft: '10px', display: 'flex', flexDirection: 'row' }}>
                <div style={{ margin: 'auto' }}>
                  <OrderTypeSelectorHeader
                    configTypes={configTypes}
                    isHome
                    width={windowSize.width >= 440 ? '20vw' : '60vw'}
                  />
                </div>
                <div style={{ margin: 'auto' }}>
                  {(true || isPreOrderSetting || configState?.configs?.preorder_status_enabled?.value === undefined) && (
                    <MomentControl
                      isModalBehavior
                      isCustomStyle
                      business={business}
                    />
                  )}
                </div>
              </div>
              <WrapperNotFound>
                <NotFoundSource
                  content={!searchValue ? t('ERROR_NOT_FOUND_PRODUCTS_TIME', 'Sorry, no products found at this time. However, you can place an advance order by selecting the Pre-order time.') : t('ERROR_NOT_FOUND_PRODUCTS', 'No products found, please change filters.')}
                />
              </WrapperNotFound>
            </>
          )
        }

        {errors && errors.length > 0 && (
          errors.map((e, i) => (
            <ErrorMessage key={i}>ERROR: [{e}]</ErrorMessage>
          ))
        )}
      </ProductsContainer>
      {props.afterComponents?.map((AfterComponent, i) => (
        <AfterComponent key={i} {...props} />))}
      {props.afterElements?.map((AfterElement, i) => (
        <React.Fragment key={i}>
          {AfterElement}
        </React.Fragment>))}
    </>
  )
}

export const BusinessProductsList = (props) => {
  const businessProductsListProps = {
    ...props,
    UIComponent: BusinessProductsListUI
  }

  return (
    <ProductsList {...businessProductsListProps} />
  )
}
