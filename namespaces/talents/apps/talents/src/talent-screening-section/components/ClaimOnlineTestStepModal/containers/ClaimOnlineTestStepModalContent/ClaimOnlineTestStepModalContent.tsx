import React, { useMemo } from 'react'
import { ModalSuspender } from '@staff-portal/modals-service'
import { useQuery } from '@staff-portal/data-layer-service'

import { RoleStepNextActionFragment } from '../../../../data'
import ClaimOnlineTestStepModalForm from '../ClaimOnlineTestStepModalForm/ClaimOnlineTestStepModalForm'
import { GetOnlineTestDataDocument } from '../../data/get-online-test-data/get-online-test-data.staff.gql.types'
import { GetStepClaimersDocument } from '../../../StepClaimerSelect/data'

export interface Props {
  roleStepId: string
  onSuccess?: (mutationResult: RoleStepNextActionFragment) => void
  hideModal: () => void
  talentId: string
}

const ClaimOnlineTestStepModalContent = ({
  roleStepId,
  onSuccess,
  hideModal,
  talentId
}: Props) => {
  const { data: onlineTestData, loading: onlineTestDataLoading } = useQuery(
    GetOnlineTestDataDocument,
    {
      variables: { roleStepId }
    }
  )

  const { data: claimersData, loading: claimersLoading } = useQuery(
    GetStepClaimersDocument,
    {
      variables: {
        roleStepId
      }
    }
  )

  const claimers = useMemo(
    () => claimersData?.node?.step.possibleClaimers?.nodes || [],
    [claimersData]
  )

  if (onlineTestDataLoading || claimersLoading) {
    return <ModalSuspender />
  }

  if (!onlineTestData?.node) {
    return null
  }

  return (
    <ClaimOnlineTestStepModalForm
      claimers={claimers}
      onlineTestData={onlineTestData.node}
      onlineTests={onlineTestData.onlineTests.nodes}
      roleStepId={roleStepId}
      onSuccess={onSuccess}
      hideModal={hideModal}
      talentId={talentId}
    />
  )
}

export default ClaimOnlineTestStepModalContent
