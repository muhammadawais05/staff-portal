import React from 'react'
import { Container, Table } from '@toptal/picasso'
import { EngagementStatus } from '@staff-portal/engagements-interviews'

import * as TableStyles from '../../styles'
import {
  CandidateIntroDraftsMoreDropdown,
  EngagementPitchLink,
  HourlyRate,
  Talent
} from './components'
import { CandidateIntroDraftItem } from '../../../../types'

interface Props {
  candidate: CandidateIntroDraftItem
  index: number
}

const Item = ({ candidate, index }: Props) => {
  const {
    id: engagementId,
    companyHourlyRate,
    jobIssues,
    talent,
    viewIntroDraftV2,
    statusFeedback,
    talentHourlyRate
  } = candidate

  if (!talent) {
    return null
  }

  const { fullName: talentFullName, webResource } = talent

  return (
    <Table.Row
      data-testid='CandidateIntroDraftsTable-row'
      stripeEven={Boolean(index % 2)}
    >
      <Table.Cell css={TableStyles.talentCol}>
        <Talent
          talentName={talentFullName}
          talentProfileUrl={webResource?.url}
          jobIssues={jobIssues}
        />
      </Table.Cell>

      <Table.Cell css={TableStyles.talentRateCol}>
        <HourlyRate hourlyRate={talentHourlyRate} />
      </Table.Cell>

      <Table.Cell css={TableStyles.billRateCol}>
        <HourlyRate hourlyRate={companyHourlyRate} />
      </Table.Cell>

      <Table.Cell css={TableStyles.introStatusCol}>
        <EngagementStatus.WithFeedback
          engagement={candidate}
          feedback={statusFeedback}
        />
      </Table.Cell>

      <Table.Cell css={TableStyles.actionsCol}>
        <Container flex>
          <EngagementPitchLink
            engagementId={engagementId}
            link={viewIntroDraftV2}
          />
          <CandidateIntroDraftsMoreDropdown candidate={candidate} />
        </Container>
      </Table.Cell>
    </Table.Row>
  )
}

export default Item
