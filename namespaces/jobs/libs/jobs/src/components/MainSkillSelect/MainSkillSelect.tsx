import { Form, Select } from '@toptal/picasso'
import React, { ReactNode, useMemo } from 'react'
import { SkillRating } from '@staff-portal/graphql/staff'
import { Form as PicassoForm, useField } from '@toptal/picasso-forms'
import { NOT_SELECTED_PLACEHOLDER } from '@staff-portal/config'

import { JobSkillSet } from '../../types'
import { SkillFragment } from '../../data'

export interface Props {
  skills?: SkillFragment[]
  loading?: boolean
  onChange: (skill: JobSkillSet) => void
  label: string
  name: string
  hint?: ReactNode
  requiredDecoration?: boolean
  titleCase?: boolean
  defaultSkillRating?: SkillRating
}

const MainSkillSelect = ({
  skills,
  onChange,
  label,
  name,
  hint,
  requiredDecoration,
  titleCase,
  defaultSkillRating = SkillRating.STRONG,
  ...props
}: Props) => {
  const {
    meta: { invalid }
  } = useField(name)

  const options = useMemo(
    () => skills?.map(({ id, name }) => ({ text: name, value: id })) || [],
    [skills]
  )

  const onChangeHandle = (skillId: string) => {
    const selectedSkill = skills?.find(skill => skill.id === skillId)

    if (!selectedSkill) {
      return
    }

    const skillSet: JobSkillSet = {
      main: true,
      rating: defaultSkillRating,
      skill: selectedSkill,
      destroy: false,
      niceToHave: true,
      // eslint-disable-next-line @miovision/disallow-date/no-new-date
      addedAt: new Date().toISOString()
    }

    onChange(skillSet)
  }

  return (
    <>
      <Form.Label
        requiredDecoration={requiredDecoration ? 'asterisk' : undefined}
        titleCase={titleCase}
      >
        {label}
      </Form.Label>
      <Select
        {...props}
        options={options}
        placeholder={NOT_SELECTED_PLACEHOLDER}
        onChange={({ target: { value } }) => onChangeHandle(value)}
        data-testid='main-skill-select'
        limit={1000}
        error={invalid}
      />
      {name && <PicassoForm.Input type='hidden' name={name} />}
      {hint && !invalid && <Form.Hint>{hint}</Form.Hint>}
    </>
  )
}

export default MainSkillSelect
