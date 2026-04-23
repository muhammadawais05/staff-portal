import React from 'react'
import { Section, Avatar, Paper, Container, Typography } from '@toptal/picasso'
import { useGetNode } from '@staff-portal/data-layer-service'

import * as S from './styles'
import {
  SkillsTalentCardSection,
  IndustriesTalentCardSection,
  HighlightsTalentCardSection,
  PortfolioTalentCardSection,
  JobApplicationInfoSection,
  JobApplicantTalentCardSkeletonLoader
} from './components'
import { GetJobApplicationTalentCardDocument } from './data/get-job-application-talent-card'

type Props = {
  jobApplicationId: string
}

const JobApplicantTalentCard = ({ jobApplicationId }: Props) => {
  const { data: talentCard, loading } = useGetNode(
    GetJobApplicationTalentCardDocument
  )({ jobApplicationId })

  if (loading && !talentCard) {
    return <JobApplicantTalentCardSkeletonLoader />
  }

  if (!talentCard?.talentPitch) {
    return null
  }

  const {
    talent: {
      fullName,
      photo,
      locationV2,
      topSkillTitle,
      webResource: { url }
    },
    talentPitch: {
      skillItems,
      industryItems,
      highlights,
      designPortfolioItems
    },
    createdAt,
    applicationComment
  } = talentCard

  return (
    <Container>
      <JobApplicationInfoSection
        createdAt={createdAt}
        applicationComment={applicationComment}
        talentName={fullName}
        talentUrl={url}
      />
      <Paper css={S.paper}>
        <Section data-testid='job-applicant-talent-card' variant='bordered'>
          <Container flex alignItems='center'>
            <Container right='small'>
              <Avatar size='small' name={fullName} src={photo?.small || ''} />
            </Container>
            <Container>
              <Typography weight='semibold'>{fullName}</Typography>
              <Typography size='xsmall' color='dark-grey'>
                {topSkillTitle} • {locationV2?.cityName},{' '}
                {locationV2?.stateName}, {locationV2?.country?.name}
              </Typography>
            </Container>
          </Container>
          <SkillsTalentCardSection skillItems={skillItems} />
          <IndustriesTalentCardSection industryItems={industryItems} />
          <HighlightsTalentCardSection highlightItems={highlights} />
          <PortfolioTalentCardSection portfolioItems={designPortfolioItems} />
        </Section>
      </Paper>
    </Container>
  )
}

export default JobApplicantTalentCard
