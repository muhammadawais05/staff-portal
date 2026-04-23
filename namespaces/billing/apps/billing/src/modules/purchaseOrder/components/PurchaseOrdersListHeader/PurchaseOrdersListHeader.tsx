import { Button } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import React from 'react'
import OperationWrapper from '@staff-portal/billing/src/components/OperationWrapper'
import { OperationItemFragment } from '@staff-portal/billing/src/__fragments__/operationItemFragment.graphql.types'

const displayName = 'PurchaseOrdersListHeader'

interface Props {
  operation?: OperationItemFragment
  handleOnClick: () => void
}

const PurchaseOrdersListHeader = ({ operation, handleOnClick }: Props) => {
  const { t: translate } = useTranslation('purchaseOrderList')

  return (
    <OperationWrapper operation={operation}>
      <Button
        data-testid={`${displayName}-create`}
        onClick={handleOnClick}
        size='small'
      >
        {translate('page.header.actions.create.label')}
      </Button>
    </OperationWrapper>
  )
}

PurchaseOrdersListHeader.displayName = displayName

export default PurchaseOrdersListHeader
