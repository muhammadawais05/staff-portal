import { Tag, Loader, Plus16 } from '@toptal/picasso'
import React from 'react'
import { SkillRating } from '@staff-portal/graphql/staff'

import {
  useGetJobSkillsAutocomplete,
  GetJobSkillsAutocompleteQuery
} from '../../../../../../components/RequiredSkillsAutocomplete/data'
import { JobSkillSet } from '../../../../../../types'

export interface Props {
  jobId: string
  name: string
  totalProfilesCount: number
  requestId?: string
  onAdd: (skillSet: JobSkillSet) => void
}

const JobRecommendedSkillItem = ({
  jobId,
  name,
  requestId,
  totalProfilesCount,
  onAdd
}: Props) => {
  const { getJobSkills, loading } = useGetJobSkillsAutocomplete({
    jobId,
    onCompleted: (data: GetJobSkillsAutocompleteQuery) => {
      const skill = data.node?.skillsAutocomplete?.edges?.[0]?.node

      if (!skill) {
        return
      }

      const skillSet: JobSkillSet = {
        skill,
        rating: SkillRating.COMPETENT,
        main: false,
        destroy: false,
        niceToHave: true,
        // eslint-disable-next-line @miovision/disallow-date/no-new-date
        addedAt: new Date().toISOString(),
        requestId
      }

      onAdd(skillSet)
    }
  })

  const handleClick = (skillName: string) => {
    getJobSkills({ exactName: skillName, limit: 1 })
  }

  const icon = loading ? <Loader size='small' /> : <Plus16 />
  const text = `${name} (${totalProfilesCount})`

  return (
    <Tag.Checkable
      icon={icon}
      disabled={loading}
      onClick={() => handleClick(name)}
    >
      {text}
    </Tag.Checkable>
  )
}

export default JobRecommendedSkillItem
