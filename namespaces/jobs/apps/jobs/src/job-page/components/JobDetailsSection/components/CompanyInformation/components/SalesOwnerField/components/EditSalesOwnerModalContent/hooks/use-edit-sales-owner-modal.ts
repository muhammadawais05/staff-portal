import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { useMemo } from 'react'
import {
  SalesOwnerRelationship,
  UpdateJobSalesOwnerInput
} from '@staff-portal/graphql/staff'
import { useGetData } from '@staff-portal/data-layer-service'
import { useNotifications } from '@staff-portal/error-handling'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { JOB_UPDATED } from '@staff-portal/jobs'

import { JobDetailsStaffFragment } from '../../../../../data/get-job-company-data.staff.gql.types'
import { GetSalesOwnersDataDocument } from '../data/get-sales-owners-data/get-sales-owners-data.staff.gql.types'
import { useUpdateJobSalesOwner } from '../data/update-job-sales-owner/update-job-sales-owner.staff.gql'
import { SALES_OWNER_RELATIONSHIP_MAPPING } from '../../../../../../../config'

interface Params {
  jobId: string
  hideModal: () => void
  currentSalesOwner?: {
    owner?: JobDetailsStaffFragment
    relationship?: SalesOwnerRelationship
  } | null
}

const useEditSalesOwnerModal = ({
  jobId,
  hideModal,
  currentSalesOwner
}: Params) => {
  const { showError } = useNotifications()

  const { data: salesOwners, loading: loadingSalesOwners } = useGetData(
    GetSalesOwnersDataDocument,
    'rolesV2'
  )()

  const salesOwnersOptions = useMemo(
    () =>
      salesOwners?.nodes.map(salesOwner => ({
        text: `${salesOwner.fullName}`,
        value: salesOwner.id
      })),
    [salesOwners]
  )

  const relationshipOptions = useMemo(
    () =>
      [
        SalesOwnerRelationship.ROLE_REMOVED,
        SalesOwnerRelationship.CLAIMER,
        SalesOwnerRelationship.AM,
        SalesOwnerRelationship.RM,
        SalesOwnerRelationship.PROJECT_SALES_SPECIALIST,
        SalesOwnerRelationship.PROJECT_RELATIONSHIP_MANAGER
      ]
        .filter(
          relationship =>
            currentSalesOwner?.relationship !==
              SalesOwnerRelationship.ROLE_REMOVED ||
            (currentSalesOwner?.relationship ===
              SalesOwnerRelationship.ROLE_REMOVED &&
              relationship !== SalesOwnerRelationship.ROLE_REMOVED)
        )
        .map(key => ({
          text: SALES_OWNER_RELATIONSHIP_MAPPING[key as SalesOwnerRelationship],
          value: key
        })),
    [currentSalesOwner]
  )

  const { loading, updateJobSalesOwner } = useUpdateJobSalesOwner({
    onError: () => showError('An error occurred, unable to update Sales Owner.')
  })
  const { handleMutationResult } = useHandleMutationResult()
  const emitMessage = useMessageEmitter()

  const handleSubmit = async ({
    comment,
    salesOwnerId,
    relationshipV2
  }: UpdateJobSalesOwnerInput) => {
    const dataInput = {
      comment,
      jobId,
      relationshipV2,
      salesOwnerId
    }

    const { data } = await updateJobSalesOwner(dataInput)

    return handleMutationResult({
      mutationResult: data?.updateJobSalesOwner,
      successNotificationMessage: 'The Sales Owner was successfully updated.',
      onSuccessAction: () => {
        emitMessage(JOB_UPDATED, { jobId })
        hideModal()
      }
    })
  }

  return {
    salesOwnersOptions,
    relationshipOptions,
    loadingData: loadingSalesOwners,
    loadingMutation: loading,
    handleSubmit
  }
}

export default useEditSalesOwnerModal
