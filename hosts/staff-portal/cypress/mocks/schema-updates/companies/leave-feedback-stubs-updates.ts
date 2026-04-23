import { encodeEntityId } from '@staff-portal/data-layer-service'
import { Engagement } from '@staff-portal/graphql/staff'

import { enabledOperationMock } from '~integration/mocks'
import { getClientOperations } from '~integration/mocks/fragments'
import { successMutationMock } from '~integration/mocks/mutations'
import { companiesBasicTabStubs } from '~integration/mocks/request-stubs/companies/tabs'

const engagements = {
  nodes: [
    {
      id: encodeEntityId('123', 'Engagement'),
      talent: {
        webResource: {
          text: 'Barb Haag',
          url: 'https://staging.toptal.net/platform/staff/talents/818119',
          __typename: 'Link'
        },
        __typename: 'Talent'
      },
      job: {
        vertical: {
          id: encodeEntityId('1', 'Vertical'),
          name: 'Developer',
          __typename: 'Vertical'
        },
        webResource: {
          text: 'Supreme Chief Brand Experience Engager Developer (271298)',
          url: 'https://staging.toptal.net/platform/staff/jobs/271298',
          __typename: 'Link'
        },
        __typename: 'Job'
      },
      webResource: {
        text: 'Jakubowski-Graham MX → Supreme Chief Brand Experience Engager Developer (271298)',
        url: 'https://staging.toptal.net/platform/staff/engagements/287906',
        __typename: 'Link'
      },
      __typename: 'Engagement'
    },
    {
      id: encodeEntityId('124', 'Engagement'),
      talent: {
        webResource: {
          text: 'Ivette Thiel',
          url: 'https://staging.toptal.net/platform/staff/talents/814087',
          __typename: 'Link'
        },
        __typename: 'Talent'
      },
      job: {
        jobType: 'designer',
        vertical: {
          id: encodeEntityId('2', 'Vertical'),
          name: 'Designer',
          __typename: 'Vertical'
        },
        webResource: {
          text: 'Senior Web Designer (270651)',
          url: 'https://staging.toptal.net/platform/staff/jobs/270651',
          __typename: 'Link'
        },
        __typename: 'Job'
      },
      webResource: {
        text: 'Jakubowski-Graham MX → Senior Web Designer (270651)',
        url: 'https://staging.toptal.net/platform/staff/engagements/287892',
        __typename: 'Link'
      },
      __typename: 'Engagement'
    }
  ] as unknown as Engagement[],
  totalCount: 2
}

const operations = getClientOperations({
  leaveFeedbackClient: enabledOperationMock()
})

const updateLeaveFeedbackStubs = () => {
  const client = {
    engagements: engagements,
    operations: operations
  }

  cy.stubGraphQLRequests({
    ...companiesBasicTabStubs(client),
    GetLazyOperation: {
      data: {
        node: {
          __typename: 'Client',
          id: encodeEntityId('123', 'Client'),
          operations: {
            leaveFeedbackClient: enabledOperationMock(),
            __typename: 'ClientOperations'
          }
        }
      }
    },
    GetClientEngagementSurveyQuestions: {
      data: {
        clientEngagementSurveyQuestions: [
          {
            answers: [
              {
                title: 'Yes',
                score: 1,
                __typename: 'EngagementSurveysAnswer'
              },
              {
                title: 'No',
                score: 0,
                __typename: 'EngagementSurveysAnswer'
              }
            ],
            type: null,
            note: null,
            required: true,
            title: 'Would the client continue to work with the talent?',
            __typename: 'EngagementSurveyQuestion'
          }
        ]
      }
    },
    LeaveFeedback: {
      data: {
        leaveFeedbackClient: successMutationMock()
      }
    }
  })
}

export default updateLeaveFeedbackStubs
