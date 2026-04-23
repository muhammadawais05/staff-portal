import { render } from '@testing-library/react'
import React from 'react'
import {
  ActivityOutcome,
  ActivityType,
  ClientRelatedActivitySubtype,
  Scalars
} from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { ActivityFragment } from '@staff-portal/activities'

import ActivityNoteContent from './ActivityNoteContent'

jest.mock('@toptal/picasso/ShowMore', () => () => (
  <div data-testid='show-more' />
))

const arrangeTest = (note: ActivityFragment) =>
  render(
    <TestWrapper>
      <ActivityNoteContent note={note} />
    </TestWrapper>
  )

describe('ActivityNoteContent', () => {
  it('show regular fields', () => {
    const occurredAt: Scalars['Time'] = '2020-05-21T21:59:59-06:00'
    const { getByText } = arrangeTest({
      type: ActivityType.CLIENT_RELATED,
      subtype: ClientRelatedActivitySubtype.PRE_SALES_CALL,
      occurredAt,
      duration: 2,
      outcome: ActivityOutcome.COMPLETED,
      details: 'Some message',
      activityContactRoles: {
        nodes: [
          {
            fullName: 'John Smith',
            webResource: {
              text: 'John Smith',
              url: 'some url'
            }
          }
        ]
      }
    } as ActivityFragment)
    const messages = [
      'Pre-sales call',
      'May 22, 2020',
      'Completed',
      'John Smith',
      '2 minutes',
      'Some message'
    ]

    messages.forEach(element => {
      expect(getByText(element)).toBeInTheDocument()
    })
  })

  describe('shome more', () => {
    it('visible for a long text', () => {
      const occurredAt: Scalars['Time'] = '2020-05-21T21:59:59-06:00'
      const { queryByTestId } = arrangeTest({
        type: ActivityType.CLIENT_RELATED,
        subtype: ClientRelatedActivitySubtype.PRE_SALES_CALL,
        occurredAt,
        duration: 2,
        outcome: ActivityOutcome.COMPLETED,
        details:
          'Ex soluta quia hic ut mollitia quo. Quas id qui facilis officia voluptatum est suscipit. Repellat eius reiciendis est excepturi. Accusamus corrupti neque ullam ut facilis.',
        activityContactRoles: {
          nodes: [
            {
              fullName: 'John Smith',
              webResource: {
                text: 'John Smith',
                url: 'some url'
              }
            }
          ]
        }
      } as ActivityFragment)

      expect(queryByTestId('show-more')).toBeInTheDocument()
    })
    it('not visible for a show text', () => {
      const occurredAt: Scalars['Time'] = '2020-05-21T21:59:59-06:00'
      const { queryByTestId } = arrangeTest({
        type: ActivityType.CLIENT_RELATED,
        subtype: ClientRelatedActivitySubtype.PRE_SALES_CALL,
        occurredAt,
        duration: 2,
        outcome: ActivityOutcome.COMPLETED,
        details: 'Ex soluta quia hic ut mollitia quo.',
        activityContactRoles: {
          nodes: [
            {
              fullName: 'John Smith',
              webResource: {
                text: 'John Smith',
                url: 'some url'
              }
            }
          ]
        }
      } as ActivityFragment)

      expect(queryByTestId('show-more')).not.toBeInTheDocument()
    })
  })
})
