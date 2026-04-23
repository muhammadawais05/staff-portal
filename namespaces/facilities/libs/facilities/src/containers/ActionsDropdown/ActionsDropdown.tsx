import React, { ReactNode } from 'react'
import { MoreButton } from '@staff-portal/ui'

import ActionsDropdownLinkItem from './components/ActionsDropdownLinkItem/ActionsDropdownLinkItem'
import ActionsDropdownMenuItem from './components/ActionsDropdownMenuItem/ActionsDropdownMenuItem'
import ActionsDropdownModalItem from './components/ActionsDropdownModalItem/ActionsDropdownModalItem'
import ActionsDropdownLazyMenuItem from './components/ActionsDropdownLazyMenuItem/ActionsDropdownLazyMenuItem'
import { ActionsDropdownProvider } from './containers/ActionsDropdownProvider/ActionsDropdownProvider'

interface Props {
  children: ReactNode
  loading?: boolean
  hidden?: boolean
  fullHeight?: boolean
  disablePopper?: boolean
  onStart?: () => void
  onSettled?: () => void
}

const ActionsDropdown = ({
  children,
  loading,
  hidden,
  fullHeight,
  disablePopper,
  onStart,
  onSettled
}: Props) => (
  <ActionsDropdownProvider onStart={onStart} onSettled={onSettled}>
    <MoreButton
      keepMounted
      fullHeight={fullHeight}
      disablePopper={disablePopper}
      loading={loading}
      hidden={hidden}
    >
      {children}
    </MoreButton>
  </ActionsDropdownProvider>
)

ActionsDropdown.LinkItem = ActionsDropdownLinkItem
ActionsDropdown.MenuItem = ActionsDropdownMenuItem
ActionsDropdown.ModalItem = ActionsDropdownModalItem
ActionsDropdown.LazyMenuItem = ActionsDropdownLazyMenuItem

export default ActionsDropdown
