import React from 'react'
import { render, screen } from '@testing-library/react'
import { SourcingStatus } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { Table } from '@toptal/picasso'
import { parseAndFormatDate } from '@staff-portal/date-time-utils'

import SourcedTalentsItem from './SourcedTalentsItem'
import { SourcedTalentFragment } from '../../data/sourced-talent-fragment.staff.gql.types'

const SOURCED_TALENT: SourcedTalentFragment = {
  id: 'TALENT_ID',
  fullName: 'Sourced Talent',
  joinedAt: '2020-05-01T01:00:00',
  type: 'Developer',
  sourcingStatus: SourcingStatus.SCREENING_TECHNICAL,
  nextMeetingDate: '2022-06-01',
  webResource: { url: 'url.to' },
  technicalStepsProgress: { currentStep: 1, totalSteps: 3 }
}

const arrangeTest = () =>
  render(
    <TestWrapper>
      <Table>
        <Table.Body>
          <SourcedTalentsItem sourcedTalent={SOURCED_TALENT} index={0} />
        </Table.Body>
      </Table>
    </TestWrapper>
  )

describe('SourcedTalentsItem', () => {
  it('renders the component', () => {
    arrangeTest()

    expect(screen.getByTestId('SourcedTalentsList-item')).toBeInTheDocument()
    expect(screen.getByTestId('SourcedTalentsList-item')).toHaveTextContent(
      SOURCED_TALENT.fullName
    )
    expect(
      screen.getByTestId('SourcedTalentsList-item-talent-avatar')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('SourcedTalentsList-item-talent-url')
    ).toHaveAttribute('href', SOURCED_TALENT.webResource.url)
    expect(screen.getByTestId('SourcedTalentsList-item')).toHaveTextContent(
      SOURCED_TALENT.type
    )
    expect(
      screen.getByTestId('SourcedTalentsList-item-talent-joined-at')
    ).toHaveTextContent(parseAndFormatDate(SOURCED_TALENT.joinedAt))
    expect(
      screen.getByTestId('SourcedTalentsList-item-talent-next-meeting-date')
    ).toHaveTextContent(parseAndFormatDate(SOURCED_TALENT.nextMeetingDate))
    expect(screen.getByTestId('SourcedTalent-status-field')).toBeInTheDocument()
  })
})
