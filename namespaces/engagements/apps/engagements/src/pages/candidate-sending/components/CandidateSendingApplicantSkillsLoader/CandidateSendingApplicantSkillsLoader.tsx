import { SkeletonLoader } from '@toptal/picasso'
import React from 'react'

import CandidateSendingFeedbackSection from '../CandidateSendingFeedbackSection/CandidateSendingFeedbackSection'

const CandidateSendingApplicantSkillsLoader = () => (
  <CandidateSendingFeedbackSection title='Applicant Skills'>
    <SkeletonLoader.Typography rows={3} />
  </CandidateSendingFeedbackSection>
)

export default CandidateSendingApplicantSkillsLoader
