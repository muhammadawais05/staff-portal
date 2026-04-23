import React, { ReactNode } from 'react'

import * as S from './styles'

interface Props {
  badgeContent: string | number | null | undefined
  children?: ReactNode
}

const Badge = ({ badgeContent, children }: Props) => {
  if (!badgeContent) {
    return <>{children}</>
  }

  return (
    <div css={S.container(children)}>
      <div css={S.children}>{children}</div>
      <div css={S.badge}>{badgeContent}</div>
    </div>
  )
}

export default Badge
