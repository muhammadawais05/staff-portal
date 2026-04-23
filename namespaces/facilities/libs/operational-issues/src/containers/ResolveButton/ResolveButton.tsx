import { Button } from '@toptal/picasso'
import React, { useState } from 'react'
// TODO: replace import, once it's removed https://toptal-core.atlassian.net/browse/SPB-2949
// eslint-disable-next-line no-restricted-imports
import { useModal } from '@toptal/picasso/utils'
import { Operation, Maybe } from '@staff-portal/graphql/staff'
// https://toptal-core.atlassian.net/browse/SPC-1804
// eslint-disable-next-line no-restricted-imports
import { useRenderLazyOperation } from '@staff-portal/operations'
import { NodeType } from '@staff-portal/graphql'

import ResolveModal from '../ResolveModal/ResolveModal'
import RecommendedSolutionsTooltip from '../../components/RecommendedSolutionsTooltip/RecommendedSolutionsTooltip'

interface Props {
  operationalIssueId: string
  templateId: string
  templateName?: Maybe<string>
  recommendedSolutions?: Maybe<string>
  operation: Operation
}

const ResolveButton = ({
  operationalIssueId,
  templateId,
  templateName,
  recommendedSolutions,
  operation
}: Props) => {
  const { showModal, hideModal, isOpen } = useModal()
  const [modalIsOpening, setModalIsOpening] = useState(false)

  const renderOperation = useRenderLazyOperation({
    initialOperation: operation,
    getLazyOperationVariables: {
      nodeId: operationalIssueId,
      nodeType: NodeType.OPERATIONAL_ISSUE,
      operationName: 'resolveOperationalIssue'
    },
    onSuccess: () => {
      showModal()
    }
  })

  return (
    <>
      {renderOperation(({ disabled, loading, checkOperation }) => (
        <RecommendedSolutionsTooltip
          recommendedSolutions={recommendedSolutions}
          disabled={disabled}
        >
          <Button
            size='small'
            variant='positive'
            loading={modalIsOpening || loading}
            disabled={disabled}
            onClick={checkOperation}
            data-testid='resolve-operational-issue-button'
          >
            Resolve
          </Button>
        </RecommendedSolutionsTooltip>
      ))}

      {isOpen && (
        <ResolveModal
          operationalIssueId={operationalIssueId}
          templateId={templateId}
          templateName={templateName}
          onStartLoadingData={() => setModalIsOpening(true)}
          onOpen={() => setModalIsOpening(false)}
          onClose={hideModal}
        />
      )}
    </>
  )
}

export default ResolveButton
