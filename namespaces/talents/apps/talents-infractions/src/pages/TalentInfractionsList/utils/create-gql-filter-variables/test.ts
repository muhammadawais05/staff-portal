import {
  TalentInfractionStatusValue,
  TalentInfractionReasonValue
} from '@staff-portal/graphql/staff'
import { dateRangeQueryParam, enumQueryParam } from '@staff-portal/filters'

import { createGqlFilterVariables } from './create-gql-filter-variables'
import { ReasonSlugQueryParam } from '../reason-slug-query-param'

describe('createGqlFilterVariables', () => {
  describe('when there are no filter values', () => {
    it('should return variables with no filter and default sorting and pagination', () => {
      const gqlFilterVariables = createGqlFilterVariables(
        {},
        { offset: 0, limit: 10 }
      )

      expect(gqlFilterVariables).toStrictEqual({
        filter: {},
        order: {
          direction: 'DESC',
          field: 'OCCURRED_AT'
        },
        pagination: {
          limit: 10,
          offset: 0
        }
      })
    })
  })

  describe('when all filter values are set', () => {
    it('should return variables with filter, sorting and pagination', () => {
      const gqlFilterVariables = createGqlFilterVariables(
        {
          occur_date: dateRangeQueryParam.encode({
            from: '2021-04-10',
            till: '2021-04-11'
          }),
          submission_date: dateRangeQueryParam.encode({
            from: '2021-04-12',
            till: '2021-04-13'
          }),
          creator_id: 'creator_id',
          reason_slug: ReasonSlugQueryParam.encode(
            TalentInfractionReasonValue.COMMUNICATION_RUDE
          ),
          assignee_id: 'assignee_id',
          statuses: enumQueryParam.encode([
            TalentInfractionStatusValue.PENDING_REVIEW,
            TalentInfractionStatusValue.REMEDIATED
          ]),
          client_id: 'client_id',
          engagement_id: 'engagement_id',
          sort: {
            target: 'CREATED_AT',
            order: 'asc'
          }
        },
        { offset: 20, limit: 10 }
      )

      expect(gqlFilterVariables).toStrictEqual({
        filter: {
          occurredAt: {
            from: '2021-04-10',
            till: '2021-04-11'
          },
          createdAt: {
            from: '2021-04-12',
            till: '2021-04-13'
          },
          creatorId: 'creator_id',
          reasonSlug: 'COMMUNICATION_RUDE',
          assigneeId: 'assignee_id',
          statuses: ['PENDING_REVIEW', 'REMEDIATED'],
          clientId: 'client_id',
          engagementId: 'engagement_id'
        },
        order: {
          direction: 'ASC',
          field: 'CREATED_AT'
        },
        pagination: {
          limit: 10,
          offset: 20
        }
      })
    })
  })
})
