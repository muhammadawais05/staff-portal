import React, { FC, memo, SyntheticEvent, ComponentProps } from 'react'
import { Button } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import OperationWrapper from '@staff-portal/billing/src/components/OperationWrapper'

const displayName = 'JobBillingDefaultsActions'

type Props = {
  type: 'create' | 'remove' | 'update'
  operation?: ComponentProps<typeof OperationWrapper>['operation']
  handleOnClick: (e: SyntheticEvent<HTMLButtonElement, Event>) => void
}

const JobBillingDefaultsActions: FC<Props> = memo(
  ({ handleOnClick, type, operation }) => {
    const { t: translate } = useTranslation('common')
    const buttonElement = (
      <Button
        data-testid={`${displayName}-${type}`}
        data-action={`job-billing-defaults-action-${type}`}
        onClick={handleOnClick}
        size='small'
        variant='secondary'
      >
        {translate(`actions.${type}` as const)}
      </Button>
    )

    if (type === 'create') {
      return buttonElement
    }

    return (
      <OperationWrapper operation={operation}>{buttonElement}</OperationWrapper>
    )
  }
)

JobBillingDefaultsActions.displayName = displayName

export default JobBillingDefaultsActions
