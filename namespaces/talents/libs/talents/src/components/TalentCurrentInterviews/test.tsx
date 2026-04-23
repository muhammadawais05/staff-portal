import React from 'react'
import { render, screen } from '@testing-library/react'
import { EngagementStatus } from '@staff-portal/graphql/staff'
import { decodeEntityId } from '@staff-portal/data-layer-service'
import { TestWrapper, assertOnTooltipText } from '@staff-portal/test-utils'

import TalentCurrentInterviews, { Props } from './TalentCurrentInterviews'

const defaultProps: Props = {
  talentId: 'VjEtVGFsZW50LTYxMDE0MA',
  talentType: 'TalentType',
  data: {
    totalCount: 0,
    inLast2DaysCounts: [],
    inLast2To7DaysCounts: []
  }
}

const arrangeTest = (props = defaultProps) =>
  render(
    <TestWrapper>
      <TalentCurrentInterviews
        talentId={props.talentId}
        data={props.data}
        talentType={props.talentType}
      />
    </TestWrapper>
  )

describe('TalentCurrentInterviews', () => {
  it('links the total number of interviews to the talent profile jobs tab with proper jobs filter', () => {
    const props: Props = {
      talentId: 'VjEtVGFsZW50LTIyNjUxMzk',
      talentType: 'TalentType',
      data: {
        ...defaultProps.data,
        totalCount: 3
      }
    }

    arrangeTest(props)

    const decodedId = decodeEntityId(props.talentId).id
    const expectedHref = `/talents/${decodedId}?jobs_filter=in_interview#talent_jobs`

    expect(
      screen.getByText(`${props.data.totalCount}`).parentElement as HTMLElement
    ).toHaveAttribute('href', expectedHref)
  })

  it('shows the number of interviews in the last 48 hours by engagement status', () => {
    const props: Props = {
      ...defaultProps,
      data: {
        ...defaultProps.data,
        inLast2DaysCounts: [
          {
            count: 2,
            engagementStatus: EngagementStatus.PENDING_EXPIRATION
          }
        ]
      }
    }

    arrangeTest(props)

    assertOnTooltipText(
      screen.getByText(`${props.data.totalCount}`),
      /Pending Expiration: 2/i
    )
  })

  it('shows the number of interviews in the last 7 days by engagement status', () => {
    const props: Props = {
      ...defaultProps,
      data: {
        ...defaultProps.data,
        inLast2To7DaysCounts: [
          {
            count: 2,
            engagementStatus: EngagementStatus.PENDING_EXPIRATION
          }
        ]
      }
    }

    arrangeTest(props)

    assertOnTooltipText(
      screen.getByText(`${props.data.totalCount}`),
      /Pending Expiration: 2/i
    )
  })
})
