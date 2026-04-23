import {
  GigParticipationType,
  PublicationGigStatus,
  GigReachOutStatus
} from '@staff-portal/graphql/staff'
import { DeepPartial } from '@staff-portal/utils'

import { PublicationGigType } from '../types'
import { GigFragment } from './gig-fragment'
import { RoleFragment } from './role-fragment'
import { ReachOutFragment } from './get-gig-candidates'
import {
  CreateGigReachOutDocument,
  CreateGigReachOutMutationVariables
} from '../components/SendRequestModal/data/create-gig-reach-out'
import { GigReachOutMessageMetaFragment } from '../data/get-gig-reach-out-message-meta'

export const mockedTalent: RoleFragment = {
  fullName: 'Daniel Reid',
  id: '10',
  timeZone: {
    name: '(UTC+01:00) Europe - London',
    value: 'Europe/London'
  },
  webResource: {
    text: 'Daniel Reid',
    url: 'https://some.talent.com/10'
  }
}

export const mockedMessageMeta: GigReachOutMessageMetaFragment = {
  footer: '<p>Thanks</p>',
  header: '<p>Hello</p>',
  messageBody:
    'My client assigned me a task to create a hello world application in C++. Help!'
}

export const mockedReachOut: ReachOutFragment = {
  id: 'reachoutid',
  status: GigReachOutStatus.SENT,
  participations: {
    totalCount: 1,
    nodes: [
      {
        id: 'participationId',
        participationType: GigParticipationType.FULFILLER,
        role: {
          ...mockedTalent,
          photo: {
            thumb:
              'https://ca.slack-edge.com/E01HSMSV622-UJ376PHFC-9c39d6726748-72'
          },
          slackContacts: {
            nodes: [
              {
                id: 'slack-contact-id',
                webResource: {
                  url: 'https://toptal.slack.com/app_redirect?channel=U01AB7DQHEG'
                }
              }
            ]
          }
        }
      }
    ]
  },
  rejectionReasonIdentifier: 'OTHER',
  rejectionReasonComment: 'I do not have time to work on it'
}

export const mockedStaff: RoleFragment = {
  fullName: 'Alysson Ferreira',
  id: '0',
  webResource: {
    text: 'Alysson Ferreira',
    url: 'https://some.claimer.com/00'
  }
}

const mockedRequests: DeepPartial<GigFragment>[] = [
  {
    id: 'VjEtUHVibGljYXRpb25HaWctMjA',
    createdAt: '2021-01-05T17:00:00.000Z' as const,
    createdBy: {
      role: mockedStaff
    },
    description:
      "My goal to build an browser interface for a program in python. I'm using HTML/CSS/JS to build the web page. What tools should I use in order to interact with the python files from the frontend elements? For example, adding buttons that will invoke functions in the python files etc...",
    title: 'Interacting with Python files from frontend elements',
    approvedAt: null,
    claimedAt: null,
    claimedBy: null,
    status: PublicationGigStatus.PENDING,
    updatedAt: '2021-01-05T17:00:00.000Z' as const,
    skills: ['Javascript'],
    slackConversations: {
      nodes: []
    },
    reachOuts: {
      totalCount: 0
    }
  },
  {
    id: 'VjEtUHVibGljYXRpb25HaWctMjE',
    createdAt: '2021-01-04T20:00:00.000Z' as const,
    createdBy: {
      role: mockedStaff
    },
    description:
      'My goal to add automatic contract test layer on my CI process. What should I do in order to have a contract test layer fully functional. Also how to integrate it with CI?',
    title: 'Questions on how to create a PACT test framework',
    approvedAt: null,
    claimedAt: '2021-01-05T07:00:00.000Z' as const,
    claimedBy: {
      role: {
        fullName: 'Rafael Anachoreta',
        id: '10',
        webResource: {
          text: 'Rafael Anachoreta',
          url: 'https://some.claimer.com/10'
        }
      }
    },
    status: PublicationGigStatus.CLAIMED,
    updatedAt: '2021-01-05T12:00:00.000Z' as const,
    skills: ['Javascript'],
    slackConversations: {
      nodes: []
    },
    reachOuts: {
      totalCount: 0
    }
  },
  {
    id: 'VjEtUHVibGljYXRpb25HaWctMjI2',
    createdAt: '2021-01-04T12:00:00.000Z' as const,
    createdBy: {
      role: mockedStaff
    },
    description:
      'My goal to build a rocket simulation system using quantum computing and probably build a pre-processor. Are there any caveats and optimizations needed in case I want to integrate it with languages like C/C++/Python/Java ?',
    title: 'Build a Rocket simulator using Quantum computing',
    approvedAt: '2021-01-05T02:00:00.000Z' as const,
    claimedAt: '2021-01-05T01:00:00.000Z' as const,
    claimedBy: {
      role: {
        fullName: 'Romeo Copaciu',
        id: '11',
        webResource: {
          text: 'Romeo Copaciu',
          url: 'https://some.claimer.com/11'
        }
      }
    },
    slackConversations: {
      nodes: [
        {
          channelUrl: 'https://link',
          participations: {
            nodes: [
              {
                participationType: GigParticipationType.FULFILLER,
                role: {
                  id: '321',
                  fullName: 'Dante Aligheri',
                  webResource: {
                    text: 'Dante Aligheri',
                    url: 'https://staff.portal.com/talent/321'
                  }
                }
              }
            ]
          }
        }
      ]
    },
    matchedAt: '2021-01-05T03:00:00.000Z' as const,
    status: PublicationGigStatus.MATCHED,
    updatedAt: '2021-01-05T12:00:00.000Z' as const,
    skills: ['Javascript'],
    reachOuts: {
      totalCount: 5
    }
  }
]

export const mockedShortRequest: PublicationGigType = {
  description: 'description',
  id: 'VjEtUHVibGljYXRpb25HaWctMzA',
  skills: ['Javascript'],
  status: PublicationGigStatus.CLAIMED,
  title: 'Request title'
}

export const createGetGigsMock = (gigs?: {
  totalCount: number
  nodes: Partial<GigFragment>[]
}) => ({
  gigs: {
    totalCount: 2,
    nodes: mockedRequests as GigFragment[],
    ...gigs
  }
})

export const createGetGigMock = (gig?: Partial<GigFragment>) => ({
  gig: {
    ...mockedRequests[0],
    ...gig
  } as GigFragment
})

export const buildGigMock = (
  props: Partial<GigFragment> = {
    id: 'VjEtUHVibGljYXRpb25HaWctMzA',
    title: 'Request Title',
    description: 'Just a request description of at least 50 characters.',
    skills: ['Javascript']
  }
) =>
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  createGetGigMock({
    id: props?.id,
    title: props?.title,
    description: props?.description,
    skills: props?.skills
  }).gig

export const createCreateGigReachOutMock = ({
  input
}: {
  input: CreateGigReachOutMutationVariables['input']
}) => ({
  request: { query: CreateGigReachOutDocument, variables: { input } },
  result: {
    data: {
      createGigReachOut: {
        clientMutationId: null,
        notice: null,
        reachOut: {
          id: 'VjEtUDJQUmVhY2hPdXQtNTU',
          status: 'SENT',
          __typename: 'P2PReachOut'
        },
        success: true,
        errors: [],
        __typename: 'CreateReachOutPayload'
      }
    }
  }
})

export const createCreateGigReachOutFailedMock = ({
  input
}: {
  input: CreateGigReachOutMutationVariables['input']
}) => ({
  request: { query: CreateGigReachOutDocument, variables: { input } },
  error: new Error('Network error occurred')
})
