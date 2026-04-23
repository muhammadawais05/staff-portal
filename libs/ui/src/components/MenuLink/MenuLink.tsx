import React, { ReactNode, forwardRef } from 'react'
import { Link } from '@staff-portal/navigation'

import * as S from './styles'

interface Props {
  href: string
  children: ReactNode
  inheritVisitedColor?: boolean
}

const MenuLink = forwardRef<HTMLLIElement, Props>(
  ({ children, inheritVisitedColor = true, ...rest }, ref) => (
    <li ref={ref}>
      <Link
        {...rest}
        css={inheritVisitedColor ? S.inheritVisitedColor : undefined}
        noUnderline
      >
        {children}
      </Link>
    </li>
  )
)

export default MenuLink
