import React, { useMemo } from 'react'
import { Option } from '@toptal/picasso/Select'
import { lazy } from '@staff-portal/utils'
import { NodeType } from '@staff-portal/graphql'
import { CheckClientComplianceInput } from '@staff-portal/graphql/staff'
import { Modal, ModalSuspender } from '@staff-portal/modals-service'
import { GetLazyOperationVariables } from '@staff-portal/operations'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'
import { CustomStatusMessageOptions } from '@staff-portal/page-wrapper'

import { CheckClientComplianceDocument } from '../../../../data/check-compliance/check-compliance.staff.gql.types'
import { CHECK_COMPLIANCE_IN_PROGRESS_MESSAGE_ID } from '../../../../config'
import { CheckComplianceInProgressMessage } from '../'

const CheckClientComplianceModalContent = lazy(
  () => import('../CheckClientComplianceModalContent')
)

interface Props {
  clientId: string
  countryId: string
  contactName: string
  timeZoneName: string
  countryOptions: Option[]
  timezoneOptions: Option[]
  clientName: string
  loading: boolean
  addStatusMessage: (config: CustomStatusMessageOptions) => void
  removeStatusMessage: (id: string) => void
  hideModal: () => void
  onSuccess?: () => void
}

const TITLE = 'Check Compliance'

const CheckClientComplianceModal = ({
  clientId,
  countryId,
  clientName,
  contactName,
  timeZoneName,
  countryOptions,
  timezoneOptions,
  loading,
  addStatusMessage,
  removeStatusMessage,
  hideModal,
  onSuccess
}: Props) => {
  const { handleSubmit, loading: submitting } = useModalFormChangeHandler({
    mutationDocument: CheckClientComplianceDocument,
    mutationResultOptions: {
      onSuccessAction: () => {
        onSuccess?.()
        addStatusMessage({
          id: CHECK_COMPLIANCE_IN_PROGRESS_MESSAGE_ID,
          variant: 'yellow',
          content: (
            <CheckComplianceInProgressMessage
              companyName={clientName}
              companyId={clientId}
            />
          ),
          handleOnClose: () =>
            removeStatusMessage(CHECK_COMPLIANCE_IN_PROGRESS_MESSAGE_ID)
        })
        hideModal()
      }
    }
  })

  const initialValues = useMemo<CheckClientComplianceInput>(
    () => ({
      clientId,
      contactName,
      countryId,
      timeZoneName
    }),
    [clientId, contactName, countryId, timeZoneName]
  )

  const lazyOperationVariables: GetLazyOperationVariables = {
    nodeId: clientId,
    nodeType: NodeType.CLIENT,
    operationName: 'checkClientCompliance'
  }

  return (
    <Modal
      open
      size='small'
      defaultTitle={TITLE}
      onClose={hideModal}
      operationVariables={lazyOperationVariables}
      data-testid='check-compliance-modal'
    >
      {loading ? (
        <ModalSuspender />
      ) : (
        <CheckClientComplianceModalContent
          countryOptions={countryOptions}
          timezoneOptions={timezoneOptions}
          handleSubmit={handleSubmit}
          submitting={submitting}
          initialValues={initialValues}
          title={TITLE}
          showContactNameHint={clientName === contactName}
          hideModal={hideModal}
        />
      )}
    </Modal>
  )
}

export default CheckClientComplianceModal
