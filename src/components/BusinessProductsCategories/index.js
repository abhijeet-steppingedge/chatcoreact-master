import React, { createRef, useEffect, useRef, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { BusinessProductsCategories as ProductsCategories } from 'ordering-components'
import { AutoScroll } from 'ordering-ui'
import ScrollSpy from 'react-scrollspy';

import { CategoriesContainer } from './styles'
import { CategoriesTabs, CategoriesTab } from '../styles/Tabs'
import './class.css'

const BusinessProductsCategoriesUI = (props) => {
  const {
    isSkeleton,
    categories,
    handlerClickCategory,
    categorySelected,
    featured,
    openBusinessInformation
  } = props


  const onClickCategory = (id) => {
    document.getElementById(`section-${id}`).scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
  }
  const getCatIDArray = (categories) => {
    let array = [];
    if (!categories || Object.keys(categories).length === 0) return;
    categories.forEach(cat => {
      array.push(`section-${cat.id}`);
    });
    return array;
  }

  const scrollCatTab = () => {
    setTimeout(() => {
      categories.forEach(cat => {
        let element = document.querySelector('#category-tab-' + cat.id)
        if (element && element?.classList?.contains('current-class')) {
          element?.scrollIntoView({ block: "nearest" });
        }
      })
    }, 3000);
  }
  // useEffect(() => {
  //   categories.forEach(cat => {
  //     let element = document.querySelector('#category-tab-' + cat.id)
  //     if (element) {
  //       element?.classList.remove('current-class');
  //     }
  //   })
  //   // setTimeout(() => {
  //   //   console.log('setimetime')
  //   //   window.scrollTo(0, 0)
  //   // }, 1000);
  // }, [])

  window.addEventListener('scroll', function (e) {
    var scrollTop = 0
    if (window.pageYOffset !== undefined) {
      scrollTop = window.pageYOffset
    };
    if (scrollTop < 0) {
      scrollTop = scrollTop * (-1);
    }
    if (scrollTop >= 50) {
      // console.log('scrollTop', scrollTop)
      scrollCatTab();
    }
  })


  // offset={-20}

  const ProductCategories = () => {
    return (
      <ScrollSpy items={getCatIDArray(categories)} currentClassName="current-class" offset={-50} style={{ display: 'flex', flexDirection: 'row', padding: '0px', margin: '0px', marginTop: '5px' }}>
        {categories && categories.length && categories.map(category => (
          (category.id != null && category.id != 'featured') && (
            <CategoriesTab
              key={category.name}
              id={`category-tab-${category.id}`}
              className={`category ${category.id === 'featured' ? 'special' : ''}`}
              // active={categorySelected?.id === category.id}
              // onClick={() => handlerClickCategory(category)}
              onClick={() => onClickCategory(category.id)}
            >
              {category.name}
            </CategoriesTab>
          )
        ))}
      </ScrollSpy>
    )
  }

  return (
    <>
      {props.beforeElements?.map((BeforeElement, i) => (
        <React.Fragment key={i}>
          {BeforeElement}
        </React.Fragment>))
      }
      {props.beforeComponents?.map((BeforeComponent, i) => (
        <BeforeComponent key={i} {...props} />))
      }
      <CategoriesContainer featured={featured} id="cat-container">
        {!isSkeleton ? (
          <CategoriesTabs variant='primary'>
            {openBusinessInformation ? (
              <>
                <ProductCategories />
              </>
            ) : (

              <AutoScroll>
                <ProductCategories />
              </AutoScroll>
            )}
          </CategoriesTabs>
        ) : (
          <CategoriesTabs variant='primary'>
            {[...Array(4).keys()].map(i => (
              <CategoriesTab key={i}>
                <Skeleton width={100} />
              </CategoriesTab>
            ))}
          </CategoriesTabs>
        )}
      </CategoriesContainer>
      {props.afterComponents?.map((AfterComponent, i) => (
        <AfterComponent key={i} {...props} />))
      }
      {props.afterElements?.map((AfterElement, i) => (
        <React.Fragment key={i}>
          {AfterElement}
        </React.Fragment>))
      }
    </>
  )
}

export const BusinessProductsCategories = (props) => {
  const businessProductsCategoriesProps = {
    ...props,
    UIComponent: BusinessProductsCategoriesUI
  }

  return (
    <ProductsCategories {...businessProductsCategoriesProps} />
  )
}
