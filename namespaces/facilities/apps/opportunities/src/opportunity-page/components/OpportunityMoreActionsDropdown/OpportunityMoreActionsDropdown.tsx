import { Menu } from '@toptal/picasso'
import React, { useState } from 'react'
import { MenuLink, MoreButton } from '@staff-portal/ui'
// https://toptal-core.atlassian.net/browse/SPC-1804
// eslint-disable-next-line no-restricted-imports
import { useRenderLazyOperation } from '@staff-portal/operations'
import { NodeType } from '@staff-portal/graphql'
import { OpportunityFragment } from '@staff-portal/opportunities'

import { useDeleteOpportunityModal } from '../DeleteOpportunityModal'

interface Props {
  opportunity: OpportunityFragment
}

const OpportunityMoreActionsDropdown = ({ opportunity }: Props) => {
  const { id, casesUrl, operations } = opportunity

  const [operationIsLoading, setOperationIsLoading] = useState(false)

  const {
    showModal: showDeleteOpportunityModal,
    renderModal: renderDeleteOpportunityModal
  } = useDeleteOpportunityModal({
    opportunityId: id
  })

  const MakeRenderLazyOperation = (
    operationName: keyof OpportunityFragment['operations'],
    onSuccess?: Function
  ) =>
    useRenderLazyOperation({
      initialOperation: operations[operationName],
      getLazyOperationVariables: {
        nodeId: id,
        nodeType: NodeType.OPPORTUNITY,
        operationName: operationName
      },
      onSuccess: () => {
        setOperationIsLoading(false)
        onSuccess?.()
      },
      onSettled: () => {
        setOperationIsLoading(false)
      },
      inline: false
    })

  const handleOperationClick = (checkOperation: () => void) => () => {
    setOperationIsLoading(true)
    checkOperation()
  }

  const renderDeleteLazyOperation = MakeRenderLazyOperation(
    'deleteOpportunity',
    showDeleteOpportunityModal
  )

  return (
    <>
      <MoreButton fullHeight disablePopper loading={operationIsLoading}>
        {casesUrl && (
          <Menu.Item
            as={MenuLink}
            rel='noopener noreferrer'
            target='_blank'
            href={casesUrl}
          >
            Workflows
          </Menu.Item>
        )}

        {renderDeleteLazyOperation(({ checkOperation, disabled }) => (
          <Menu.Item
            disabled={disabled}
            onClick={handleOperationClick(checkOperation)}
          >
            Delete
          </Menu.Item>
        ))}
      </MoreButton>

      {renderDeleteOpportunityModal()}
    </>
  )
}

export default OpportunityMoreActionsDropdown
