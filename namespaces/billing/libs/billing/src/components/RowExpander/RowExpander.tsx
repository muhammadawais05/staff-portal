import { ArrowDownMinor16, Button } from '@toptal/picasso'
import React, { FC, SyntheticEvent, memo, ComponentProps } from 'react'

import * as S from './styles'

const displayName = 'RowExpander'

interface Props extends ComponentProps<typeof Button.Circular> {
  handleOnClick: (event: SyntheticEvent<HTMLButtonElement, Event>) => void
  isExpanded: boolean
  testId?: string
}

const RowExpander: FC<Props> = memo(
  ({ value, testId = displayName, isExpanded, handleOnClick }) => (
    <Button.Circular
      data-testid={testId}
      icon={<ArrowDownMinor16 css={S.arrowDownMinor16(isExpanded)} />}
      onClick={handleOnClick}
      value={value}
      variant='flat'
    />
  )
)

RowExpander.displayName = displayName

export default RowExpander
