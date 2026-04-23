import { Engagement, EngagementStatus, Job } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { jobPageStubs } from '../../request-stubs'
import {
  getEngagementResponse,
  getPitchSnippetEngagementsResponse
} from '../../responses'

const updateViewPitchSnippetsMocks = (job?: Partial<Job>) => {
  const engagement = getEngagementResponse({
    status: EngagementStatus.DRAFT,
    detailedStatus: 'Draft',
    cumulativeStatus: 'draft',
    companyHourlyRate: '80.0',
    talentHourlyRate: '50.0',
    viewIntroDraftV2: {
      enabled: true,
      messages: [],
      url: null,
      __typename: 'UrlWithMessages'
    },
    feedbacks: {
      totalCount: 0,
      nodes: []
    },
    talent: {
      id: encodeEntityId('123', 'Talent'),
      fullName: 'Some Full Name',
      webResource: {
        text: 'Some Full Name',
        url: 'https://staging.toptal.net/platform/staff/talents/507726',
        __typename: 'Link'
      },
      __typename: 'Talent'
    },
    resumeUrl: null
  } as unknown as Engagement).data.node

  cy.stubGraphQLRequests({
    ...jobPageStubs(job),
    GetPitchSnippetEngagements: getPitchSnippetEngagementsResponse(),
    GetCandidateIntroDrafts: {
      data: {
        node: {
          id: 'VjEtSm9iLTI1NTI5NQ',
          candidateIntroDrafts: {
            nodes: [engagement],
            edges: [],
            __typename: 'JobEngagementConnection'
          },
          __typename: 'Job'
        }
      }
    }
  })
}

export default updateViewPitchSnippetsMocks
