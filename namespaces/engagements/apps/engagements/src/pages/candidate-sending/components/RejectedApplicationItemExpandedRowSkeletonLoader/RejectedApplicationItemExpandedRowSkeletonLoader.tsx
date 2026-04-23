import React from 'react'
import { Container } from '@toptal/picasso'
import { NoteCardSkeletonLoader } from '@staff-portal/ui'

import { TalentInfoSkeletonLoader } from '../TalentInfoSkeletonLoader/TalentInfoSkeletonLoader'
import CandidateSendingApplicantSkillsLoader from '../CandidateSendingApplicantSkillsLoader/CandidateSendingApplicantSkillsLoader'

const RejectedApplicationItemExpandedRowSkeletonLoader = () => (
  <>
    <TalentInfoSkeletonLoader />
    <CandidateSendingApplicantSkillsLoader />

    <Container bottom='medium'>
      <NoteCardSkeletonLoader />
    </Container>
  </>
)

export default RejectedApplicationItemExpandedRowSkeletonLoader
