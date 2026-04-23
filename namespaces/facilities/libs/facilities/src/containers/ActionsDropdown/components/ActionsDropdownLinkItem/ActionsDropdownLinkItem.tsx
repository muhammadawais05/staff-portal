import React from 'react'
import { MenuLink } from '@staff-portal/ui'
import { Menu } from '@toptal/picasso'

import ActionsDropdownTooltipWrapper from '../ActionsDropdownTooltipWrapper/ActionsDropdownTooltipWrapper'
import { ActionsDropdownItemProps } from '../../types'

type Props = ActionsDropdownItemProps & {
  href?: string | null
  newWindow?: boolean
}

const ActionsDropdownLinkItem = ({
  children,
  href,
  newWindow,
  disabled,
  disabledText,
  dataTestId
}: Props) => {
  if (!href && !disabledText) {
    return null
  }

  return (
    <ActionsDropdownTooltipWrapper
      disabled={disabled}
      disabledText={disabledText}
    >
      <Menu.Item
        as={MenuLink}
        href={href as string}
        {...(newWindow ? { rel: 'noopener noreferrer', target: '_blank' } : {})}
        disabled={disabled}
        data-testid={
          dataTestId || `actions-dropdown-link-${children.replace(/\s/g, '')}`
        }
      >
        {children}
      </Menu.Item>
    </ActionsDropdownTooltipWrapper>
  )
}

export default ActionsDropdownLinkItem
