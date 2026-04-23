import { OperationCallableTypes } from '@staff-portal/graphql/staff'

import {
  TalentOnlineTestAttemptFragment,
  TalentOnlineTestAttemptOperationsFragment
} from './get-talent-online-tests.staff.gql.types'
import { GET_TALENT_ONLINE_TESTS } from './get-talent-online-tests.staff.gql'

export const getTestMock = ({
  testName,
  acceptThreshold,
  rejectThreshold,
  canceledAt = '',
  createdAt,
  finishedAt = '',
  maxScore,
  pending = false,
  tracked = false,
  pureScore,
  operations
}: {
  testName: string
  acceptThreshold: number
  rejectThreshold: number
  canceledAt?: string
  createdAt: string
  finishedAt?: string
  maxScore: number
  pending?: boolean
  tracked?: boolean
  pureScore: number
  operations?: Partial<TalentOnlineTestAttemptOperationsFragment>
}) =>
  ({
    test: {
      __typename: 'CodilityTest',
      name: testName,
      acceptThreshold,
      rejectThreshold,
      id: 'VjEtSGFja2VyUmFua1Rlc3QtMQ'
    },
    __typename: 'CodilityResult',
    canceledAt,
    createdAt,
    finishedAt,
    id: 'VjEtQ29kaWxpdHlSZXN1bHQtNjg3NTM',
    maxScore,
    pending,
    pureScore,
    resultUrl: 'https://codility.com',
    testUrl: 'https://codility.com',
    tracked,
    operations: {
      sendNewTestForOnlineTestAttempt: {
        callable: OperationCallableTypes.ENABLED,
        messages: [],
        __typename: 'Operation'
      },
      cancelOnlineTestAttempt: {
        callable: OperationCallableTypes.HIDDEN,
        messages: [],
        __typename: 'Operation'
      },
      trackOnlineTestAttempt: {
        callable: OperationCallableTypes.ENABLED,
        messages: [],
        __typename: 'Operation'
      },
      __typename: 'OnlineTestAttemptOperations',
      ...operations
    }
  } as TalentOnlineTestAttemptFragment)

export const createGetTalentOnlineTestsMock = ({
  talentId,
  onlineTests = []
}: {
  talentId: string
  onlineTests?: TalentOnlineTestAttemptFragment[]
}) => ({
  request: { query: GET_TALENT_ONLINE_TESTS, variables: { talentId } },
  result: {
    data: {
      node: {
        __typename: 'Talent',
        id: talentId,
        onlineTestAttempts: {
          __typename: 'OnlineTestAttemptConnection',
          nodes: onlineTests
        }
      }
    }
  }
})

export const createGetTalentOnlineTestsFailedMock = ({
  talentId
}: {
  talentId: string
}) => ({
  request: { query: GET_TALENT_ONLINE_TESTS, variables: { talentId } },
  error: new Error('Network error occurred')
})

export const createTalentOnlineTestHiddenOperations =
  (): TalentOnlineTestAttemptOperationsFragment => ({
    sendNewTestForOnlineTestAttempt: {
      callable: OperationCallableTypes.HIDDEN,
      messages: [],
      __typename: 'Operation'
    },
    cancelOnlineTestAttempt: {
      callable: OperationCallableTypes.HIDDEN,
      messages: [],
      __typename: 'Operation'
    },
    trackOnlineTestAttempt: {
      callable: OperationCallableTypes.HIDDEN,
      messages: [],
      __typename: 'Operation'
    },
    __typename: 'OnlineTestAttemptOperations'
  })
