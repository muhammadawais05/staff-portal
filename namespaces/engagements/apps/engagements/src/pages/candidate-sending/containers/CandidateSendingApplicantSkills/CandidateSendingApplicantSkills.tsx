import { useQuery } from '@staff-portal/data-layer-service'
import { SkillSetField } from '@staff-portal/talents'
import React, { useMemo } from 'react'

import CandidateSendingFeedbackSection from '../../components/CandidateSendingFeedbackSection/CandidateSendingFeedbackSection'
import { GetApplicantSkillsDocument } from '../../data/get-applicant-skills/get-applicant-skills.staff.gql.types'
import { getFeedbackApplicationTalent } from '../../utils/get-feedback-application-talent/get-feedback-application-talent'
import CandidateSendingApplicantSkillsLoader from '../../components/CandidateSendingApplicantSkillsLoader/CandidateSendingApplicantSkillsLoader'

interface Props {
  applicantId: string
}

const CandidateSendingApplicantSkills = ({ applicantId }: Props) => {
  const { data, loading } = useQuery(GetApplicantSkillsDocument, {
    variables: { applicantId }
  })

  const jobSkills = useMemo(
    () => data?.node?.job.skillSets?.nodes.map(({ skill: { id } }) => id),
    [data?.node?.job.skillSets?.nodes]
  )

  if (loading && !data) {
    return <CandidateSendingApplicantSkillsLoader />
  }

  if (!data?.node) {
    return null
  }

  const talent = getFeedbackApplicationTalent(data.node)

  if (!talent) {
    return null
  }

  return (
    <CandidateSendingFeedbackSection title='Applicant Skills'>
      <SkillSetField
        talentType={talent.type}
        skills={talent.skillSets?.nodes}
        highlightedSkillIds={jobSkills}
      />
    </CandidateSendingFeedbackSection>
  )
}

export default CandidateSendingApplicantSkills
