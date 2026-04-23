// TODO: replace import, once it's removed https://toptal-core.atlassian.net/browse/SPB-2949
// eslint-disable-next-line no-restricted-imports
import { Maybe, useModal } from '@toptal/picasso/utils'
import React from 'react'
import { Operation, JobStatus } from '@staff-portal/graphql/staff'
// https://toptal-core.atlassian.net/browse/SPC-1804
// eslint-disable-next-line no-restricted-imports
import { useRenderLazyOperation } from '@staff-portal/operations'
import { NodeType } from '@staff-portal/graphql'

import DeleteJobModal from '../DeleteJobModal'

const useDeleteJobModal = ({
  jobId,
  jobStatus,
  initialOperation,
  onLazyOperationSettled
}: {
  jobId: string
  jobStatus?: Maybe<JobStatus>
  initialOperation?: Operation
  onLazyOperationSettled?: () => void
}) => {
  const { showModal, hideModal, isOpen } = useModal()

  const renderLazyOperation = useRenderLazyOperation({
    initialOperation,
    getLazyOperationVariables: {
      nodeId: jobId,
      nodeType: NodeType.JOB,
      operationName: 'removeJob'
    },
    onSettled: onLazyOperationSettled,
    onSuccess: showModal
  })

  return {
    renderLazyOperation,
    renderModal: () =>
      isOpen && (
        <DeleteJobModal
          jobId={jobId}
          status={jobStatus}
          hideModal={hideModal}
        />
      )
  }
}

export default useDeleteJobModal
