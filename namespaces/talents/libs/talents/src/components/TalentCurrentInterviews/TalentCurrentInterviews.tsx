import React from 'react'
import {
  Tooltip,
  Typography,
  Container,
  TypographyProps
} from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'
import { TalentEngagementStatus } from '@staff-portal/graphql/staff'
import { getTalentProfilePath } from '@staff-portal/routes'
import { decodeEntityId } from '@staff-portal/data-layer-service'

import { TalentCurrentInterviewsFragment } from './data/talent-current-interviews-fragment'
import { CurrentInterviewsEntryCounts } from './components'
import { TalentTabValue } from '../../enums'

const getLinkHref = (talentId: string) => {
  const jobsTabHash = TalentTabValue.TALENT_JOBS
  const jobsFilter = TalentEngagementStatus.IN_INTERVIEW.toLowerCase()

  return `${getTalentProfilePath(
    decodeEntityId(talentId).id
  )}?jobs_filter=${jobsFilter}#${jobsTabHash}`
}

const getLinkColor = (totalCount: number): TypographyProps['color'] => {
  if (totalCount < 3) {
    return 'inherit'
  }

  if (totalCount < 5) {
    return 'yellow'
  }

  return 'red'
}

export interface Props {
  talentId: string
  talentType: string
  data: TalentCurrentInterviewsFragment
}

const TalentCurrentInterviews = ({ talentId, talentType, data }: Props) => {
  const tooltipContent = (
    <>
      <Typography>Interview activity last 48 hours</Typography>
      <CurrentInterviewsEntryCounts
        currentInterviewsEntry={data.inLast2DaysCounts}
        talentType={talentType}
      />

      <Container top='xsmall'>
        <Typography>Interview activity last 7 days</Typography>
        <CurrentInterviewsEntryCounts
          currentInterviewsEntry={data.inLast2To7DaysCounts}
          talentType={talentType}
        />
      </Container>
    </>
  )

  return (
    <Tooltip content={tooltipContent}>
      {/*
       * The Link component does not accept 'yellow' or 'red' colors, so the color is set in the Typography component
       */}
      <Link href={getLinkHref(talentId)} noUnderline>
        <Typography
          as='span'
          size='medium'
          weight='semibold'
          color={getLinkColor(data.totalCount)}
        >
          {data.totalCount}
        </Typography>
      </Link>
    </Tooltip>
  )
}

export default TalentCurrentInterviews
