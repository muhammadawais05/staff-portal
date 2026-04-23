import { render } from '@toptal/picasso/test-utils'
import React from 'react'
import {
  EngagementStatus,
  OperationCallableTypes,
  Scalars
} from '@staff-portal/graphql/staff'
import { getRoleTypeText } from '@staff-portal/facilities'

import {
  getEngagementStatusDetails,
  EngagementStatusDetailsParam
} from './get-engagement-status-details'
import { getStatusMessageMapping } from './get-status-message-mapping'

const TALENT_TYPE = 'FinanceExpert'
const FORMATTED_TALENT_TYPE = getRoleTypeText(TALENT_TYPE).toLowerCase()

const MESSAGE_ONLY_CASES = getStatusMessageMapping({
  talentType: FORMATTED_TALENT_TYPE
})

const mockedEngagementStatus = ({
  status,
  lastRelevantPerformedAction,
  postponedPerformedAction
}: Partial<EngagementStatusDetailsParam>): EngagementStatusDetailsParam => ({
  id: '1',
  status: status as EngagementStatus,
  talent: {
    id: 'abc',
    type: TALENT_TYPE
  },
  expiresOn: '2021-06-11',
  lastRelevantPerformedAction,
  postponedPerformedAction,
  operations: {
    proposeEngagementEnd: {
      callable: OperationCallableTypes.HIDDEN,
      messages: []
    }
  }
})

describe('getEngagementStatusDetails', () => {
  it.each(Object.keys(MESSAGE_ONLY_CASES))(
    'returns message only for %s',
    status => {
      const { message, comment, occurredAt } = getEngagementStatusDetails(
        mockedEngagementStatus({
          status: status as EngagementStatus
        })
      )

      expect(message).toBe(MESSAGE_ONLY_CASES[status as EngagementStatus])
      expect(comment).toBeUndefined()
      expect(occurredAt).toBeUndefined()
    }
  )

  describe('when there is lastRelevantPerformedAction', () => {
    const COMMENT = 'This part was obfuscated, some content was here.'
    const DATE: Scalars['Date'] = '2021-06-11'

    it('returns message with performer name and link', () => {
      const PERFORMER = {
        id: 'VjEtU3RhZmYtNTUyNzcy',
        webResource: {
          text: 'Felipe Padilha Barcellos',
          url: 'https://staging.toptal.net/platform/staff/staff/552772'
        }
      }

      const { message, comment, occurredAt } = getEngagementStatusDetails(
        mockedEngagementStatus({
          status: EngagementStatus.REJECTED_INTERVIEW,
          lastRelevantPerformedAction: {
            comment: COMMENT,
            occurredAt: DATE,
            performer: PERFORMER
          }
        })
      )

      const { container, getByText } = render(<>{message}</>)

      expect(container).toHaveTextContent(
        `${PERFORMER.webResource.text} rejected ${FORMATTED_TALENT_TYPE}'s interview with comment:`
      )
      expect(getByText(PERFORMER.webResource.text)).toHaveAttribute(
        'href',
        PERFORMER.webResource.url
      )
      expect(comment).toBe(COMMENT)
      expect(occurredAt).toBe(DATE)
    })

    it('returns message with System as performer', () => {
      const { message, comment, occurredAt } = getEngagementStatusDetails(
        mockedEngagementStatus({
          status: EngagementStatus.REJECTED_INTERVIEW,
          lastRelevantPerformedAction: {
            comment: COMMENT,
            occurredAt: DATE,
            performer: null
          }
        })
      )

      const { container } = render(<>{message}</>)

      expect(container).toHaveTextContent(
        `System rejected ${FORMATTED_TALENT_TYPE}'s interview with comment:`
      )
      expect(comment).toBe(COMMENT)
      expect(occurredAt).toBe(DATE)
    })
  })

  describe('when there is postponedPerformedAction', () => {
    const COMMENT = 'This part was obfuscated, some content was here.'
    const DATE = '2021-06-11'

    it('returns message with System as performer', () => {
      const { message, comment, occurredAt } = getEngagementStatusDetails(
        mockedEngagementStatus({
          status: EngagementStatus.EXPIRATION_POSTPONED,
          postponedPerformedAction: {
            comment: COMMENT,
            occurredAt: DATE,
            performer: null
          }
        })
      )

      const { container } = render(<>{message}</>)

      expect(container).toHaveTextContent(
        'System postponed interview expiration till Jun 11, 2021 with comment:'
      )
      expect(comment).toBe(COMMENT)
      expect(occurredAt).toBe(DATE)
    })
  })
})
