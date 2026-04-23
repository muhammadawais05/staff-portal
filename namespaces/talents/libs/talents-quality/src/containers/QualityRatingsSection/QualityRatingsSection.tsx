import React from 'react'
import { Container } from '@toptal/picasso'
import { TalentSoftSkillsSection } from '@staff-portal/talents-soft-skills'

import MatchQualitySection from '../MatchQualitySection/MatchQualitySection'

interface Props {
  talentId: string
  jobId?: string
}

const QualityRatingsSection = ({ talentId, jobId }: Props) => {
  return (
    <Container top='medium' data-testid='quality-ratings-section'>
      <MatchQualitySection talentId={talentId} jobId={jobId} />
      <TalentSoftSkillsSection talentId={talentId} />
    </Container>
  )
}

export default QualityRatingsSection
