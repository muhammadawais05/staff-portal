import React, { memo } from 'react'
import { Section } from '@toptal/picasso'
import { useNotifications } from '@staff-portal/error-handling'
import {
  useGetTalentSkillSets,
  VettedSkillsFields
} from '@staff-portal/talents'

interface Props {
  talentId: string
}

const TalentSkillsSection = ({ talentId }: Props) => {
  const { showDevError } = useNotifications()
  const { talentType, skillSets, loading } = useGetTalentSkillSets({
    talentId,
    onError: () => showDevError('Failed fetching skill set fields.')
  })

  if (!loading && !skillSets?.length) {
    return null
  }

  return (
    <Section
      title='Skills'
      variant='withHeaderBar'
      data-testid='talent-skills-section'
    >
      <VettedSkillsFields
        talentType={talentType}
        skills={skillSets}
        loading={loading}
      />
    </Section>
  )
}

export default memo(TalentSkillsSection)
