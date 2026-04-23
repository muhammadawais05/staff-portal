import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Container, Typography } from '@toptal/picasso'
import { Operation } from '@staff-portal/graphql/staff'
import OperationWrapper from '@staff-portal/billing/src/components/OperationWrapper'
import { ModalKey } from '@staff-portal/billing/src/@types/types'
import { useModals } from '@staff-portal/billing/src/_lib/customHooks/useModals'

interface Props {
  clientId: string
  minimumHours?: number
  operation: Operation
}

const displayName = 'MinimumCommitmentItem'

const MinimumCommitmentItem = ({
  clientId,
  minimumHours,
  operation
}: Props) => {
  const { handleOnOpenModal } = useModals()
  const { t: translate } = useTranslation(['billingDetails', 'common'])

  const handleOnMinimumCommitmentEdit = () =>
    handleOnOpenModal(ModalKey.commitmentMinimumEdit, { nodeId: clientId })

  return (
    <Container flex justifyContent='space-between' data-testid={displayName}>
      <Typography
        size='medium'
        weight='semibold'
        color='red'
        data-testid={`${displayName}-label`}
      >
        {translate('billingDetails:values.hoursPerWeek', {
          count: minimumHours
        })}
      </Typography>
      <OperationWrapper operation={operation}>
        <Button
          variant='secondary'
          data-testid={`${displayName}-minimum-commitment-edit`}
          onClick={handleOnMinimumCommitmentEdit}
          size='small'
        >
          {translate('common:actions.edit')}
        </Button>
      </OperationWrapper>
    </Container>
  )
}

MinimumCommitmentItem.displayName = displayName

export default MinimumCommitmentItem
