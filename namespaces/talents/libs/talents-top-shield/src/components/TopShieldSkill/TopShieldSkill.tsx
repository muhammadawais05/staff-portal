import React from 'react'
import { Tag, SelectOption } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import {
  Maybe,
  UpdateTopShieldApplicationSkillInput
} from '@staff-portal/graphql/staff'
import { EditableField } from '@staff-portal/editable'
import { NO_VALUE } from '@staff-portal/config'

import { useUpdateSkill } from './hooks/use-update-skill'
import { getLazySkill } from './hooks/get-lazy-skill'
import { TOP_SHIELD_SKILLS } from '../../constants'
import * as S from './styles'

const TOP_SHIELD_SKILL_OPTIONS = TOP_SHIELD_SKILLS.map(skill => ({
  text: skill,
  value: skill
}))

interface Props {
  talentId: string
  applicationId: string
  skill: Maybe<string> | undefined
  operationDisabled: boolean
}

const TopShieldSkill = ({
  talentId,
  applicationId,
  skill,
  operationDisabled
}: Props) => {
  const { handleChange } = useUpdateSkill(applicationId)

  return (
    <EditableField<
      Pick<UpdateTopShieldApplicationSkillInput, 'skill'>,
      string,
      SelectOption[]
    >
      name='skill'
      value={skill ?? undefined}
      onChange={handleChange}
      disabled={operationDisabled}
      queryValue={getLazySkill(talentId)}
      editor={props => (
        <Form.Select
          {...props}
          enableReset
          options={TOP_SHIELD_SKILL_OPTIONS}
          size='small'
          width='full'
        />
      )}
      viewer={skill ? <Tag css={S.tag}>{skill}</Tag> : NO_VALUE}
    />
  )
}

export default TopShieldSkill
