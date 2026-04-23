import React, { useMemo } from 'react'
import { Modal } from '@staff-portal/modals-service'
import { NodeType } from '@staff-portal/graphql'
import { GetLazyOperationVariables } from '@staff-portal/operations'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'
import { REFRESH_INVESTIGATIONS } from '@staff-portal/clients'
import { DocumentNode } from '@staff-portal/data-layer-service'
import { lazy } from '@staff-portal/utils'

import { useGetApplyNoCommsFlag } from '../../data'
import { InvestigationAvailableReason } from '../../../../config'
import { INVESTIGATION_RESOLVE_OPERATION_NAME_MAP } from '../../config'
import { getInitialValues, MUTATION_DOCUMENT_MAPPING } from './config'

const InvestigationResolveModalContent = lazy(
  () => import('./components/InvestigationResolveModalContent')
)

export interface Props {
  clientId: string
  investigationReason: InvestigationAvailableReason
  hideModal: () => void
}

const TITLE = 'Resolve Investigation'

const InvestigationResolveModal = ({
  clientId,
  hideModal,
  investigationReason
}: Props) => {
  const {
    data: { hasNoCommsTokenKey },
    initialLoading
  } = useGetApplyNoCommsFlag(clientId)

  const { handleSubmit, loading: submitting } = useModalFormChangeHandler({
    mutationDocument: MUTATION_DOCUMENT_MAPPING[
      investigationReason
    ] as DocumentNode,
    mutationResultOptions: {
      onSuccessAction: hideModal,
      successNotificationMessage: 'Investigation has been resolved.',
      successMessageEmitOptions: {
        type: REFRESH_INVESTIGATIONS,
        payload: { companyId: clientId }
      }
    }
  })

  const initialValues = useMemo(
    () => getInitialValues(investigationReason, clientId),
    [investigationReason, clientId]
  )

  const lazyOperationVariables: GetLazyOperationVariables = {
    nodeId: clientId,
    nodeType: NodeType.CLIENT,
    operationName: INVESTIGATION_RESOLVE_OPERATION_NAME_MAP[investigationReason]
  }

  return (
    <Modal
      open
      onClose={hideModal}
      operationVariables={lazyOperationVariables}
      defaultTitle={TITLE}
    >
      <InvestigationResolveModalContent
        hideModal={hideModal}
        handleSubmit={handleSubmit}
        loading={initialLoading}
        submitting={submitting}
        initialValues={initialValues}
        title={TITLE}
        hasNoCommsTokenKey={hasNoCommsTokenKey}
        investigationReason={investigationReason}
      />
    </Modal>
  )
}

export default InvestigationResolveModal
