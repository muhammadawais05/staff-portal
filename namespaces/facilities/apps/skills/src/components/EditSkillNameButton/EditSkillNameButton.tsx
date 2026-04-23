import React from 'react'
import { Button, Pencil16 } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import {
  GetLazyOperationVariables,
  // https://toptal-core.atlassian.net/browse/SPC-1804
  // eslint-disable-next-line no-restricted-imports
  LazyOperation
} from '@staff-portal/operations'
import { NodeType } from '@staff-portal/graphql'

import { VerticalWithSkillCategoriesFragment } from '../../data/get-verticals-with-categories'
import { SkillNamesListItemFragment } from '../../data/get-skill-names-list'
import { EditSkillNameModal } from '../../modals'

export interface Props {
  skillName: SkillNamesListItemFragment
  verticalsWithCategories: VerticalWithSkillCategoriesFragment[]
  skillPageSlugs: string[]
}

const EditSkillNameButton = ({
  skillName,
  skillName: {
    operations: { updateSkillName: operation }
  },
  skillPageSlugs,
  verticalsWithCategories
}: Props) => {
  const { showModal } = useModal(EditSkillNameModal, {
    skillName,
    verticalsWithCategories,
    skillPageSlugs
  })

  const getLazyOperationVariables: GetLazyOperationVariables = {
    nodeId: skillName.id,
    nodeType: NodeType.SKILL_NAME,
    operationName: 'updateSkillName'
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
          data-testid='EditSkillNameButton'
        >
          <Pencil16 />
        </Button>
      )}
    </LazyOperation>
  )
}

export default EditSkillNameButton
