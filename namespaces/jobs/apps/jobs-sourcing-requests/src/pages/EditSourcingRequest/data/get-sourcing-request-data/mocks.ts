import { MockedResponse } from '@staff-portal/data-layer-service'

import {
  GetSourcingRequestDataQuery,
  GetSourcingRequestDataDocument
} from './get-sourcing-request-data.staff.gql.types'

export const createGetSourcingRequestDataMock = ({
  encodedId,
  data,
  loading
}: {
  encodedId: string
  data?: Partial<GetSourcingRequestDataQuery['node']>
  loading?: boolean
}): MockedResponse => {
  const result = loading
    ? undefined
    : {
        data: {
          node: {
            id: 'VjEtU291cmNpbmdSZXF1ZXN0LTU1OA',
            status: 'REQUESTED',
            enterpriseJobStatus: 'CURRENT_NEED',
            canShareCompanyName: true,
            positions: 1,
            positionsComment: '',
            extraInformation: false,
            extraInformationComment: '',
            sellingPoints: '',
            mustHaveSkillsComment: '',
            niceToHaveSkillsComment: '',
            jobStartDeadline: '2021-10-18',
            jobStartDeadlineComment: '',
            furtherQualificationInterviews: false,
            furtherQualificationInterviewsComment: '',
            maximumTalentHourlyRate: '120.0',
            canShareRate: true,
            canShareRateComment: '',
            canIncreaseRate: true,
            canIncreaseRateComment: '',
            onSiteLocation: null,
            onSiteDuration: null,
            whoCoversTravelCosts: null,
            whoCoversTravelCostsComment: null,
            additionalNotes: '',
            hoursOverlap: 'HOUR_4',
            job: {
              id: 'VjEtSm9iLTI2MzUwNw',
              title: 'Junior Solutions Developer (123)',
              webResource: {
                text: 'Junior Solutions Developer (123)',
                url: 'http://localhost:3000/platform/staff/jobs/123',
                __typename: 'Link'
              },
              client: {
                id: '1',
                enterprise: false,
                __typename: 'Client'
              },
              __typename: 'Job'
            },
            timeZonePreference: {
              name: '(UTC-08:00) America - Los Angeles',
              value: 'America/Los_Angeles',
              __typename: 'TimeZone'
            },
            timeZonePreferenceComment: 'Singapore',
            citizenshipRequirements: false,
            citizenshipRequirementsComment: '',
            skillSets: {
              totalCount: 2,
              nodes: [
                {
                  id: 'VjEtU2tpbGxTZXQtMzI4ODkzOA',
                  rating: 'STRONG',
                  main: false,
                  niceToHave: false,
                  skill: {
                    id: 'VjEtU2tpbGwtMzY5NDA',
                    name: 'Amazon Web Services (AWS)',
                    __typename: 'Skill'
                  },
                  __typename: 'SkillSet'
                },
                {
                  id: 'VjEtU2tpbGxTZXQtMzI4ODkzOQ',
                  rating: 'COMPETENT',
                  main: false,
                  niceToHave: false,
                  skill: {
                    id: 'VjEtU2tpbGwtNzE2NjA',
                    name: 'Site Reliability Engineering (SRE)',
                    __typename: 'Skill'
                  },
                  __typename: 'SkillSet'
                }
              ],
              __typename: 'SourcingRequestSkillSetsConnection'
            },
            operations: {
              updateSourcingRequest: {
                callable: 'ENABLED',
                messages: [],
                __typename: 'Operation'
              },
              __typename: 'SourcingRequestOperations'
            },
            __typename: 'SourcingRequest',
            ...data
          }
        }
      }

  return {
    request: {
      query: GetSourcingRequestDataDocument,
      variables: {
        sourcingRequestId: encodedId
      }
    },
    result
  }
}
