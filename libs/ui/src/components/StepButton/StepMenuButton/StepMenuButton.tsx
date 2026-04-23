import React, { ReactNode } from 'react'
import { Button, Dropdown, ArrowDownMinor16 } from '@toptal/picasso'

import * as S from './styles'

interface Props {
  loading?: boolean
  children?: ReactNode
}

const StepMenuButton = ({ children, loading }: Props) => {
  const button = (
    <Button
      css={S.menuButtonRoot}
      variant='secondary'
      data-testid='step-button-menu'
      loading={loading}
    >
      <ArrowDownMinor16 />
    </Button>
  )

  if (children) {
    return <Dropdown content={children}>{button}</Dropdown>
  }

  return button
}

export default StepMenuButton
