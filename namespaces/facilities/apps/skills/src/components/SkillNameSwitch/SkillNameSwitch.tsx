import React from 'react'
import { useNotifications } from '@toptal/picasso/utils'
import { concatMutationErrors } from '@staff-portal/data-layer-service'
import {
  isOperationDisabled,
  isOperationHidden
} from '@staff-portal/operations'
import { InlineSwitch } from '@staff-portal/editable'
import { useModal } from '@staff-portal/modals-service'

import { SkillNamesListItemFragment } from '../../data/get-skill-names-list'
import { useToggleCheckSkillName } from './data/toggle-check-skill-name'
import { SkillNameToggleCheckPromptModal, SkillNameCheckType } from '../index'

export interface Props {
  skillName: SkillNamesListItemFragment
  type: SkillNameCheckType
}

const SkillNameSwitch = ({
  skillName: {
    id: skillNameId,
    name,
    editorChecked,
    verticalChecked,
    operations: { toggleCheckSkillName: operation }
  },
  type
}: Props) => {
  const { showError } = useNotifications()
  const isChecked = type === 'editor' ? editorChecked : verticalChecked
  const { toggleCheckSkillName, loading } = useToggleCheckSkillName({
    skillNameId,
    onCompleted: ({ toggleCheckSkillName: result }) => {
      if (!result?.success && result?.errors) {
        showError(concatMutationErrors(result?.errors))
      }
    },
    onError: () => {
      showError(`An error occurred, the skill ${type} was not updated.`)
    }
  })

  const { showModal } = useModal(SkillNameToggleCheckPromptModal, {
    type,
    name,
    loading,
    onSubmit: () => toggleCheckSkillName(type)
  })

  return isOperationHidden(operation) ? (
    <>{isChecked ? 'Yes' : 'No'}</>
  ) : (
    <InlineSwitch
      loading={loading}
      value={isChecked}
      onChange={showModal}
      disabled={isOperationDisabled(operation)}
    />
  )
}

export default SkillNameSwitch
