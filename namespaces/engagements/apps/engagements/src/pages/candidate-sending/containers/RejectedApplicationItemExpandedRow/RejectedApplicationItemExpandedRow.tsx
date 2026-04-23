import React from 'react'
import { MatchQualitySection } from '@staff-portal/talents-quality'

import CandidateSendingApplicantSkills from '../CandidateSendingApplicantSkills/CandidateSendingApplicantSkills'
import JobPositionAnswersSection from '../JobPositionAnswersSection/JobPositionAnswersSection'
import TalentInfoSection from '../TalentInfoSection/TalentInfoSection'
import PreviewTalentCard from '../PreviewTalentCard/PreviewTalentCard'

type Props = {
  talentId: string
  applicantId: string
  jobId?: string
}

const RejectedApplicationItemExpandedRow = ({
  talentId,
  jobId,
  applicantId
}: Props) => (
  <>
    <TalentInfoSection talentId={talentId} />
    <MatchQualitySection talentId={talentId} jobId={jobId} hideTitle />
    <CandidateSendingApplicantSkills applicantId={applicantId} />
    <JobPositionAnswersSection id={applicantId} />
    <PreviewTalentCard talentId={talentId} jobId={jobId} />
  </>
)

export default RejectedApplicationItemExpandedRow
