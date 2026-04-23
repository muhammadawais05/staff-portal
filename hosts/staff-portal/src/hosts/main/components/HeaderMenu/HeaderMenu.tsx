import React, { useState } from 'react'
import { Page, Menu, Button } from '@toptal/picasso'
import { WidgetErrorBoundary } from '@staff-portal/error-handling'

import HeaderMenuContent from './components/HeaderMenuContent'
import { useGetUserInfo } from './data/get-user-info'

const HeaderMenu = () => {
  const [operationIsLoading, setOperationIsLoading] = useState(false)
  const { data } = useGetUserInfo()

  if (!data) {
    return null
  }

  return (
    <Page.TopBarMenu
      name={data?.me.fullName}
      avatar={data?.me.photo?.thumb}
      meta={
        !operationIsLoading ? (
          data?.me.type
        ) : (
          <Button.Circular variant='transparent' loading />
        )
      }
      data-testid='top-bar-menu'
    >
      <Menu>
        <WidgetErrorBoundary emptyOnError>
          <HeaderMenuContent setOperationIsLoading={setOperationIsLoading} />
        </WidgetErrorBoundary>
      </Menu>
    </Page.TopBarMenu>
  )
}

export default HeaderMenu
