import React from 'react'
import { MyOrders as MyOrdersController } from 'ordering-ui/theme_two'
import { HelmetTags } from '../../components/HelmetTags'
import { useEvent } from 'ordering-components'

export const MyOrders = (props) => {
  const [events] = useEvent()
  const ordersProps = {
    ...props,
    onRedirectPage: (data) => events.emit('go_to_page', data)
  }
  return (
    <>
      <HelmetTags page='orders' />
      <MyOrdersController {...ordersProps} />
    </>
  )
}
