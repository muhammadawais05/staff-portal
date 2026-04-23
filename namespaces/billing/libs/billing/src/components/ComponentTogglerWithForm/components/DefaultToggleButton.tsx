import React, { memo, ReactElement, SyntheticEvent } from 'react'
import { Rotate16 } from '@toptal/picasso/Icon'
import { Button, Container } from '@toptal/picasso'

import OperationWrapper from '../../OperationWrapper'
import { OperationItemFragment } from '../../../__fragments__/operationItemFragment.graphql.types'

export type ToggleButtonClickEvent = (
  event?: SyntheticEvent<HTMLButtonElement>
) => void

export interface ToggleProps {
  disabled?: boolean
  onClick: ToggleButtonClickEvent
  submitting?: boolean
  updating?: boolean
  operation?: OperationItemFragment
  icon?: ReactElement
}

export const DefaultToggleButton = memo<ToggleProps>(
  ({
    disabled = false,
    onClick,
    submitting,
    updating,
    operation,
    icon = <Rotate16 />
  }: ToggleProps) => {
    const button = (
      <Button.Circular
        data-testid='componentTogglerWithFormButton'
        disabled={disabled || submitting || updating}
        icon={icon}
        onClick={onClick}
        variant='flat'
      />
    )

    return (
      <Container left={0.5}>
        {operation ? (
          <OperationWrapper operation={operation}>{button}</OperationWrapper>
        ) : (
          button
        )}
      </Container>
    )
  }
)
