import React from 'react'
import { Button, Copy16 } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import {
  GetLazyOperationVariables,
  // https://toptal-core.atlassian.net/browse/SPC-1804
  // eslint-disable-next-line no-restricted-imports
  LazyOperation
} from '@staff-portal/operations'
import { NodeType } from '@staff-portal/graphql'

import { SkillNamesListItemFragment } from '../../data/get-skill-names-list'
import { CloneSkillNameModal } from '../../modals'

export interface Props {
  skillName: SkillNamesListItemFragment
}

const CloneSkillNameButton = ({
  skillName,
  skillName: {
    operations: { cloneSkillName: operation }
  }
}: Props) => {
  const { showModal } = useModal(CloneSkillNameModal, { skillName })

  const getLazyOperationVariables: GetLazyOperationVariables = {
    nodeId: skillName.id,
    nodeType: NodeType.SKILL_NAME,
    operationName: 'cloneSkillName'
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
          data-testid='CloneSkillNameButton'
        >
          <Copy16 />
        </Button>
      )}
    </LazyOperation>
  )
}

export default CloneSkillNameButton
