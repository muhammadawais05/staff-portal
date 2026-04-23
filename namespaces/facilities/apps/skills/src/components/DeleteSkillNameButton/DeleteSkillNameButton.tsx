import React from 'react'
import { Button, Trash16 } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import {
  GetLazyOperationVariables,
  // https://toptal-core.atlassian.net/browse/SPC-1804
  // eslint-disable-next-line no-restricted-imports
  LazyOperation
} from '@staff-portal/operations'
import { NodeType } from '@staff-portal/graphql'

import { SkillNamesListItemFragment } from '../../data/get-skill-names-list'
import { DeleteSkillNameModal } from '../../modals'

export type Props = {
  skillName: SkillNamesListItemFragment
}

const DeleteSkillNameButton = ({
  skillName: {
    id: skillNameId,
    operations: { removeSkillName: operation }
  }
}: Props) => {
  const { showModal } = useModal(DeleteSkillNameModal, { skillNameId })

  const getLazyOperationVariables: GetLazyOperationVariables = {
    nodeId: skillNameId,
    nodeType: NodeType.SKILL_NAME,
    operationName: 'removeSkillName'
  }

  return (
    <LazyOperation
      initialOperation={operation}
      getLazyOperationVariables={getLazyOperationVariables}
      onSuccess={showModal}
    >
      {({ checkOperation, loading, disabled }) => (
        <Button
          size='small'
          variant='secondary'
          disabled={disabled}
          loading={loading}
          onClick={checkOperation}
          data-testid='DeleteSkillNameButton'
        >
          <Trash16 />
        </Button>
      )}
    </LazyOperation>
  )
}

export default DeleteSkillNameButton
