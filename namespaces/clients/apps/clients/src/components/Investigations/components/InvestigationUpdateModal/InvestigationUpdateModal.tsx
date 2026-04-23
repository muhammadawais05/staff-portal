import React from 'react'
import { Modal, ModalSuspender } from '@staff-portal/modals-service'
import { SubmissionErrors } from '@toptal/picasso-forms'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { GetLazyOperationVariables } from '@staff-portal/operations'
import { NodeType } from '@staff-portal/graphql'
import {
  UpdateClientInvestigationInput,
  CreateClientInvestigationInput
} from '@staff-portal/graphql/staff'
import {
  useModalFormChangeHandler,
  FormErrors
} from '@staff-portal/mutation-result-handlers'
import { UPDATE_INVESTIGATION } from '@staff-portal/clients'
import { lazy } from '@staff-portal/utils'

import { mapOption } from '../../../../utils'
import {
  useGetClientSpecialistTeamMembers,
  useGetInvestigations,
  useGetJobsForInvestigation
} from '../../data'
import { getJobsIdsMapping, filterSelectableJobs } from './utils'
import { useGetInvestigationsExperiments } from '../../data/get-investigations-experiments.staff.gql'
import { SetUpdateClientInvestigationDocument } from './data/update-client-investigation.staff.gql.types'

const InvestigationUpdateModalContent = lazy(
  () => import('./components/InvestigationUpdateModalContent')
)

const NO_COMMS_TOKEN_KEY = 'no_comms'

export type Input =
  | CreateClientInvestigationInput
  | UpdateClientInvestigationInput

export interface Props {
  clientId: string
  hideModal: () => void
  handleSubmit?: (
    values: Input
  ) => Promise<void | SubmissionErrors | FormErrors>
  submittingCreate?: boolean
  noCommsCheckbox?: boolean
  modalTitle?: string
}

/**
 * TODO use a Context for passing props between components
 * https://toptal-core.atlassian.net/browse/SPB-2273
 */
// eslint-disable-next-line complexity, max-statements
const InvestigationUpdateModal = ({
  clientId,
  hideModal,
  handleSubmit: handleSubmitCreate,
  submittingCreate,
  noCommsCheckbox = false,
  modalTitle = 'Update Investigation'
}: Props) => {
  const emitMessage = useMessageEmitter()
  const investigations = useGetInvestigations(clientId, { current: true })
  const clientJobs = useGetJobsForInvestigation(clientId)
  const teamMembers = useGetClientSpecialistTeamMembers()

  const { loading: experimentsLoading } = useGetInvestigationsExperiments()

  const loading =
    investigations.loading ||
    clientJobs.loading ||
    teamMembers.loading ||
    experimentsLoading

  const {
    fullName: companyName = '',
    roleFlags,
    investigations: investigationsData
  } = investigations.data ?? {}

  const clientSpecialistTeamMembers = teamMembers?.data?.map(mapOption) || []
  const noCommsFlag = !roleFlags?.nodes?.some(
    node => node.flag.token === NO_COMMS_TOKEN_KEY
  )

  const investigation = investigationsData?.nodes?.[0]
  const investigationJobs = investigation?.jobs?.nodes
  const { list: investigationJobsIds, map: investigationJobsMap } =
    getJobsIdsMapping(investigationJobs)
  const selectableJobs = filterSelectableJobs(
    clientJobs.data?.jobs?.nodes,
    investigationJobsMap
  )

  const initialValues: Input = {
    clientId,
    // actually `reason` should be optional on `Input` level,
    // and there should be a check against that before mutation (that it's not empty),
    // but let's save our time, BE will fire up error message if it's somehow empty, so it's okay
    reason: investigation?.reason as unknown as Input['reason'],
    clientSpecialistTeamAssigneeId:
      investigation?.clientSpecialistTeamAssignee?.id,
    comment: investigation?.comment || '',
    jobIds: investigationJobsIds
  }

  const { handleSubmit: handleSubmitUpdate, loading: submittingUpdate } =
    useModalFormChangeHandler({
      mutationDocument: SetUpdateClientInvestigationDocument,
      mutationResultOptions: {
        successNotificationMessage: 'Investigation has been updated.',
        onSuccessAction: () => {
          hideModal()
          emitMessage(UPDATE_INVESTIGATION, { companyId: clientId })
        }
      }
    })

  const handleSubmit = (
    submittedValues: Input & { isEverythingSelected?: boolean }
  ) => {
    const values = { ...submittedValues, isEverythingSelected: undefined }

    return (handleSubmitCreate || handleSubmitUpdate)(values)
  }

  const lazyOperationVariables: GetLazyOperationVariables = {
    nodeId: clientId,
    nodeType: NodeType.CLIENT,
    operationName: handleSubmitCreate
      ? 'createClientInvestigation'
      : 'updateClientInvestigation'
  }

  return (
    <Modal
      open
      onClose={hideModal}
      data-testid='investigation-update-modal'
      operationVariables={lazyOperationVariables}
      defaultTitle={modalTitle}
    >
      {!loading ? (
        <InvestigationUpdateModalContent
          modalTitle={modalTitle}
          companyName={companyName}
          jobs={selectableJobs}
          clientSpecialistTeamMembers={clientSpecialistTeamMembers}
          handleSubmit={handleSubmit}
          showNoCommsCheckbox={noCommsCheckbox && noCommsFlag}
          initialValues={initialValues}
          submitting={submittingCreate || submittingUpdate}
          hideModal={hideModal}
        />
      ) : (
        <ModalSuspender />
      )}
    </Modal>
  )
}

export default InvestigationUpdateModal
