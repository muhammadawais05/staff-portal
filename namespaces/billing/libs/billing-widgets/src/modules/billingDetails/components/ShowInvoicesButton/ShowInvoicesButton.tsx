import { useTranslation } from 'react-i18next'
import React, { FC, memo } from 'react'
import { Button } from '@toptal/picasso'
import { Link } from '@topkit/react-router'
import OperationWrapper from '@staff-portal/billing/src/components/OperationWrapper'
import { OperationItemFragment } from '@staff-portal/billing/src/__fragments__/operationItemFragment.graphql.types'

const displayName = 'ShowInvoicesButton'

interface Props {
  operation: OperationItemFragment
  href: string
}

export const ShowInvoicesButton: FC<Props> = memo(({ operation, href }) => {
  const { t: translate } = useTranslation('billingDetails')

  return (
    <OperationWrapper operation={operation}>
      <Button data-testid={displayName} as={Link} href={href} size='small'>
        {translate('actions.showInvoices.label')}
      </Button>
    </OperationWrapper>
  )
})

ShowInvoicesButton.displayName = displayName

export default ShowInvoicesButton
