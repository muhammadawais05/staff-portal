import { TalentSpecializationApplicationFragment } from '../talent-specialization-application-fragment'
import { GET_TALENT_SPECIALIZATION_APPLICATIONS } from './get-talent-specialization-applications.staff.gql'

export const specializationApplicationsDefaultMocks: TalentSpecializationApplicationFragment[] =
  [
    {
      id: 'VjEtU3BlY2lhbGl6YXRpb25BcHBsaWNhdGlvbi0yMjE5MjE',
      fullName: 'Full name',
      status: 'CANCELLED',
      startedAt: '2020-07-17T12:23:48+03:00',
      completedAt: '2020-07-20T15:47:16+03:00',
      operations: {
        id: 'test-id',
        convertSpecializationApplication: {
          callable: 'HIDDEN',
          messages: [
            'The specialization application should be in applied status.'
          ],
          __typename: 'Operation'
        },
        rejectSpecializationApplication: {
          callable: 'HIDDEN',
          messages: [
            'The specialization application should be in applied status.'
          ],
          __typename: 'Operation'
        },
        restoreSpecializationApplication: {
          callable: 'ENABLED',
          messages: [],
          __typename: 'Operation'
        }
      },
      specialization: {
        id: 'VjEtU3BlY2lhbGl6YXRpb24tMQ',
        title: 'Core',
        __typename: 'Specialization'
      },
      rejectionReason: null,
      performer: {
        id: 'test-id',
        fullName: 'Juan Sanchez',
        webResource: {
          text: 'Juan Sanchez',
          url: 'https://staging.toptal.net/platform/staff/staff/498468',
          __typename: 'Link'
        },
        __typename: 'Staff'
      },
      __typename: 'SpecializationApplication'
    } as TalentSpecializationApplicationFragment
  ]

export const createGetTalentSpecializationApplicationsMock = ({
  talentId,
  talentFullName = 'Kristine Corkery',
  specializationTitle
}: {
  talentId: string
  talentFullName?: string
  specializationTitle: string
}) => ({
  request: {
    query: GET_TALENT_SPECIALIZATION_APPLICATIONS,
    variables: { talentId }
  },
  result: {
    data: {
      node: {
        id: talentId,
        fullName: talentFullName,
        eligibleForRestoration: false,
        status: 'active',
        cancelableMeetings: [],
        specializationApplications: {
          nodes: [
            {
              id: 'VjEtU3BlY2lhbGl6YXRpb25BcHBsaWNhdGlvbi00ODQy',
              status: 'APPROVED',
              startedAt: '2016-04-04T11:11:51+03:00',
              completedAt: '2016-04-04T11:11:51+03:00',
              rejectNoteTasks: {
                totalCount: 0,
                __typename: 'RejectNoteTasksConnection'
              },
              operations: {
                id: 'test-id',
                convertSpecializationApplication: null,
                rejectSpecializationApplication: {
                  callable: 'HIDDEN',
                  messages: [
                    'The specialization application should be in applied status.'
                  ],
                  __typename: 'Operation'
                },
                restoreSpecializationApplication: {
                  callable: 'ENABLED',
                  messages: [],
                  __typename: 'Operation'
                },
                __typename: 'SpecializationApplicationOperations'
              },
              specialization: {
                id: 'VjEtU3BlY2lhbGl6YXRpb24tMQ',
                title: specializationTitle,
                __typename: 'Specialization'
              },
              rejectionReason: null,
              performer: null,
              __typename: 'SpecializationApplication'
            }
          ],
          __typename: 'SpecializationApplicationConnection'
        },
        operations: {
          sendTalentToSpecialization: null,
          addTalentToRemoteConsulting: null,
          __typename: 'TalentOperations'
        },
        __typename: 'Talent'
      }
    }
  }
})

export const createGetTalentSpecializationApplicationsFailedMock = ({
  talentId
}: {
  talentId: string
}) => ({
  request: {
    query: GET_TALENT_SPECIALIZATION_APPLICATIONS,
    variables: { talentId }
  },
  error: new Error('Network error occurred')
})
