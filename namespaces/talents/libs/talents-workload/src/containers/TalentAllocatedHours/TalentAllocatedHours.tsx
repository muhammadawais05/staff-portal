import { Button, Container, Pencil16, Typography } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import React, { useState } from 'react'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import {
  GetLazyOperationVariables,
  // https://toptal-core.atlassian.net/browse/SPC-1804
  // eslint-disable-next-line no-restricted-imports
  LazyOperation
} from '@staff-portal/operations'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { NodeType } from '@staff-portal/graphql'
import { TALENT_UPDATED } from '@staff-portal/talents'

import AllocatedHoursInput from '../../components/AllocatedHoursInput/AllocatedHoursInput'
import { TalentWorkingOperationFragment } from '../../data'
import { useUpdateTalentAllocatedHours } from './data/update-talent-allocated-hours/update-talent-allocated-hours.staff.gql'

interface Props {
  allocatedHours?: number | null
  talentId: string
  operation: TalentWorkingOperationFragment
  placeholder?: string
}

interface TalentAllocatedHoursForm {
  allocatedHours: string
}

const TalentAllocatedHours = ({
  allocatedHours,
  talentId,
  operation,
  placeholder
}: Props) => {
  const emitMessage = useMessageEmitter()
  const { handleMutationResult } = useHandleMutationResult()
  const [isInEditMode, setIsInEditMode] = useState(false)
  const [updateTalentAllocatedHours, { loading }] =
    useUpdateTalentAllocatedHours({})

  const toggleEditMode = () => setIsInEditMode(!isInEditMode)

  const getLazyOperationVariables: GetLazyOperationVariables = {
    nodeId: talentId,
    nodeType: NodeType.TALENT,
    operationName: 'updateTalentAllocatedHours'
  }

  const handleSubmit = async ({
    allocatedHours: allocatedHoursValue
  }: TalentAllocatedHoursForm) => {
    if (allocatedHours === Number(allocatedHoursValue)) {
      toggleEditMode()

      return
    }

    const { data } = await updateTalentAllocatedHours({
      variables: {
        allocatedHours: Number(allocatedHoursValue),
        talentId
      }
    })

    return handleMutationResult({
      capitalizeErrors: true,
      mutationResult: data?.updateTalentAllocatedHours,
      successNotificationMessage: 'Allocated hours were successfully changed.',
      onSuccessAction: () => {
        emitMessage(TALENT_UPDATED, { talentId })
        setIsInEditMode(false)
      }
    })
  }

  if (isInEditMode) {
    return (
      <Form<TalentAllocatedHoursForm>
        onSubmit={handleSubmit}
        initialValues={{ allocatedHours: String(allocatedHours || 0) }}
      >
        <AllocatedHoursInput
          loading={loading}
          placeholder={placeholder}
          onCancel={toggleEditMode}
        />
      </Form>
    )
  }

  return (
    <Container flex>
      <Typography weight='semibold' size='medium'>
        {allocatedHours || 0} hours/week&nbsp;
      </Typography>

      <LazyOperation
        initialOperation={operation}
        getLazyOperationVariables={getLazyOperationVariables}
        onSuccess={toggleEditMode}
      >
        {({ checkOperation, loading: operationLoading, disabled }) => (
          <Button.Circular
            variant='flat'
            icon={<Pencil16 />}
            onClick={checkOperation}
            aria-label='Edit allocated hours'
            disabled={disabled}
            loading={operationLoading}
          />
        )}
      </LazyOperation>
    </Container>
  )
}

export default TalentAllocatedHours
