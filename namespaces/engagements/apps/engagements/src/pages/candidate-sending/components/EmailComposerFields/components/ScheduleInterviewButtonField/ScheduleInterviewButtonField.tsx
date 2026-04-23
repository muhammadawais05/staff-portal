import React from 'react'
import { Maybe } from '@staff-portal/graphql/staff'

import BaseEmailComposerField from '../BaseEmailComposerField/BaseEmailComposerField'
import { TalentCard } from '../../../../components'
import { PitchStepTalentFragment } from '../../../../data/get-pitch-step-data'
import PreviewTalentCard from '../../../../containers/PreviewTalentCard/PreviewTalentCard'

export type Props = {
  talent: Maybe<PitchStepTalentFragment> | undefined
  jobId?: string
  showTalentCardPreview?: boolean
}

const ScheduleInterviewButtonField = ({
  talent,
  jobId,
  showTalentCardPreview = false
}: Props) => {
  if (!talent) {
    return null
  }

  const { fullName, locationV2, topSkillTitle } = talent

  return (
    <BaseEmailComposerField
      label='Schedule Interview Button'
      visibilityControlFieldName='showScheduleInterview'
    >
      {showTalentCardPreview ? (
        <PreviewTalentCard
          talentId={talent.id}
          jobId={jobId}
          withFormWrapper={false}
        />
      ) : (
        <TalentCard
          fullName={fullName}
          countryName={locationV2?.country?.name}
          cityName={locationV2?.cityName}
          topSkillTitle={topSkillTitle}
        />
      )}
    </BaseEmailComposerField>
  )
}

export default ScheduleInterviewButtonField
