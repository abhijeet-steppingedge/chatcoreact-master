import React, { useEffect, useState } from 'react'
import { useApi } from 'ordering-components'
import { useHistory } from 'react-router-dom'
import { HelmetTags } from '../../components/HelmetTags'
import Skeleton from 'react-loading-skeleton'
import { HomeHero } from 'ordering-ui/theme_two'

import {
  HomeContainer,
  SkeletonContainer,
  SkeletonHeader,
  SkeletonContent,
  SkeletonInformation,
  SkeletonSide
} from './styles'

export const HomePage = (props) => {
  const history = useHistory()
  const [homeState, setHomeState] = useState({ body: null, loading: false, error: null })
  const [ordering] = useApi()
  const requestsState = {}

  const handlerFindBusiness = () => {
    history.push('/search')
  }

  const getPage = async () => {
    setHomeState({ ...homeState, loading: true })
    try {
      const source = {}
      requestsState.page = source
      const { content: { error, result } } = await ordering.pages('homedoordash').get({ cancelToken: source })
      setHomeState({ ...homeState, loading: false })
      if (!error) {
        setHomeState({ ...homeState, body: result.body })
      } else {
        setHomeState({ ...homeState, error: result })
      }
    } catch (err) {
      if (err.constructor.name !== 'Cancel') {
        setHomeState({ ...homeState, loading: false, error: [err.message] })
      }
    }
  }

  useEffect(() => {
    getPage()
    return () => {
      if (requestsState.page) {
        requestsState.page.cancel()
      }
    }
  }, [])

  return (
    <>
      <HelmetTags page='home' />
      <HomeContainer>
        <HomeHero
          {...props}
          onFindBusiness={handlerFindBusiness}
        />
        {
          homeState.loading && (
            <SkeletonContainer>
              <SkeletonHeader>
                <Skeleton width='100%' height='100%' />
              </SkeletonHeader>
              <SkeletonContent>
                <SkeletonInformation>
                  <Skeleton width='100%' height='100px' />
                  <Skeleton width='100%' height='100px' />
                  <Skeleton width='100%' height='100px' />
                  <Skeleton width='100%' height='100px' />
                </SkeletonInformation>
                <SkeletonSide>
                  <Skeleton width='100%' height='100%' />
                </SkeletonSide>
              </SkeletonContent>
            </SkeletonContainer>
          )
        }
        {
          homeState.body && (
            <div dangerouslySetInnerHTML={{
              __html: homeState.body
            }}
            />
          )
        }
      </HomeContainer>
    </>
  )
}
