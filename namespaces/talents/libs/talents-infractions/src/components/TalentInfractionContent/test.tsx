import React from 'react'
import { render, screen } from '@testing-library/react'
import { RouteContext } from '@staff-portal/navigation'
import {
  OperationCallableTypes,
  TalentInfractionReasonValue,
  TalentInfractionStatusValue
} from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import TalentInfractionContent from './TalentInfractionContent'
import { TalentInfractionFragment } from '../../data/talent-infraction-fragment'

const arrangeTest = (infraction: TalentInfractionFragment) => {
  render(
    <RouteContext.Provider value={path => ({ url: path })}>
      <TestWrapper>
        <TalentInfractionContent infraction={infraction} />
      </TestWrapper>
    </RouteContext.Provider>
  )
}

describe('TalentInfractionContent', () => {
  const CREATED_AT = {
    ISO_FORMAT: '2020-03-04T10:30:00+02:00',
    USER_FORMAT: 'Mar 4, 2020'
  } as const
  const OCCURRED_AT = {
    ISO_FORMAT: '2020-03-03',
    USER_FORMAT: 'Mar 3, 2020'
  } as const

  const infraction = (
    data: Partial<TalentInfractionFragment> = {}
  ): TalentInfractionFragment => ({
    id: 'test',
    createdAt: CREATED_AT.ISO_FORMAT,
    description: 'Infraction description',
    occurredAt: OCCURRED_AT.ISO_FORMAT,
    reasonSlug: TalentInfractionReasonValue.COMMUNICATION_RUDE,
    status: TalentInfractionStatusValue.PENDING_REVIEW,
    summary: 'Infraction',
    attachments: {
      totalCount: 1,
      nodes: [
        {
          id: 'attachment-1',
          webResource: { text: 'Screenshot #1', url: 'url' }
        }
      ]
    },
    creator: {
      id: 'matcher-1',
      webResource: { text: 'Alfreda Veum', url: 'url' }
    },
    engagement: {
      id: 'engagement-1',
      webResource: { text: 'Senior developer', url: 'url' }
    },
    operations: {
      changeInfraction: {
        callable: OperationCallableTypes.ENABLED,
        messages: []
      },
      removeInfraction: {
        callable: OperationCallableTypes.ENABLED,
        messages: []
      }
    },
    review: 'Infraction review',
    talent: {
      id: 'talent-1',
      webResource: { text: 'Vivien Mertz', url: 'url' }
    },
    taskAssignee: {
      id: 'matcher-1',
      webResource: { text: 'Sharron Gutmann', url: 'url' }
    },
    ...data
  })

  it('renders infraction fields', async () => {
    arrangeTest(infraction())

    expect(await screen.findByTestId('item-field: Talent')).toHaveTextContent(
      'TalentVivien Mertz'
    )
    expect(await screen.findByTestId('item-field: Reason')).toHaveTextContent(
      'ReasonRude or unprofessional towards Client or Core Team'
    )
    expect(await screen.findByTestId('item-field: Status')).toHaveTextContent(
      'StatusPending review'
    )
    expect(
      await screen.findByTestId('item-field: Engagement')
    ).toHaveTextContent('EngagementSenior developer')
    expect(
      await screen.findByTestId('item-field: Occurred at')
    ).toHaveTextContent(`Occurred at${OCCURRED_AT.USER_FORMAT}`)
    expect(
      await screen.findByTestId('item-field: Submitted at')
    ).toHaveTextContent(`Submitted at${CREATED_AT.USER_FORMAT}`)
    expect(
      await screen.findByTestId('item-field: Submitted by')
    ).toHaveTextContent('Submitted byAlfreda Veum')
    expect(
      await screen.findByTestId('item-field: Attachments')
    ).toHaveTextContent('AttachmentsScreenshot #1')
    expect(await screen.findByTestId('item-field: Assignee')).toHaveTextContent(
      'AssigneeSharron Gutmann'
    )
    expect(await screen.findByTestId('item-field: Details')).toHaveTextContent(
      'DetailsInfraction description'
    )
    expect(await screen.findByTestId('item-field: Review')).toHaveTextContent(
      'ReviewInfraction review'
    )
  })
})
