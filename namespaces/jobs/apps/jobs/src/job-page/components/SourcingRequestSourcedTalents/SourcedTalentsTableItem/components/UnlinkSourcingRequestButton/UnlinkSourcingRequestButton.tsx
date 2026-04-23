import React, { memo, useMemo } from 'react'
// TODO: replace import, once it's removed https://toptal-core.atlassian.net/browse/SPB-2949
// eslint-disable-next-line no-restricted-imports
import { useModal } from '@toptal/picasso/utils'
import { Button } from '@toptal/picasso'
import {
  OperationType,
  GetLazyOperationVariables,
  // https://toptal-core.atlassian.net/browse/SPC-1804
  // eslint-disable-next-line no-restricted-imports
  LazyOperation
} from '@staff-portal/operations'
import { NodeType } from '@staff-portal/graphql'

import UnlinkSourcingRequestModal from '../UnlinkSourcingRequestModal'

export interface Props {
  sourcingTalentRequestId: string
  talentFullName: string
  operation: OperationType
}

const UnlinkSourcingRequestButton = ({
  sourcingTalentRequestId,
  talentFullName,
  operation
}: Props) => {
  const { showModal, hideModal, isOpen } = useModal()

  const getLazyOperationVariables: GetLazyOperationVariables = useMemo(
    () => ({
      nodeId: sourcingTalentRequestId,
      nodeType: NodeType.SOURCING_REQUEST_TALENT,
      operationName: 'unlinkSourcingRequestTalent'
    }),
    [sourcingTalentRequestId]
  )

  return (
    <LazyOperation
      initialOperation={operation}
      getLazyOperationVariables={getLazyOperationVariables}
      onSuccess={showModal}
    >
      {({ checkOperation, loading, disabled }) => (
        <>
          <Button
            size='small'
            variant='secondary'
            loading={loading}
            disabled={disabled}
            onClick={checkOperation}
            data-testid='unlink-sourcing-request-button'
          >
            Unlink
          </Button>

          {isOpen && (
            <UnlinkSourcingRequestModal
              data-testid='unlink-sourcing-request-modal'
              talentFullName={talentFullName}
              sourcingTalentRequestId={sourcingTalentRequestId}
              onClose={hideModal}
            />
          )}
        </>
      )}
    </LazyOperation>
  )
}

export default memo(UnlinkSourcingRequestButton)
