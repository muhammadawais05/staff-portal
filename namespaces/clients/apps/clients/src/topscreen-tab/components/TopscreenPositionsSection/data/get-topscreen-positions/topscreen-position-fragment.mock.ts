import {
  TopscreenStepType,
  PositionStatus,
  OperationCallableTypes
} from '@staff-portal/graphql/staff'

import { TopscreenPositionFragment } from './get-topscreen-positions.staff.gql.types'

export const topscreenPositionFragmentMock: TopscreenPositionFragment = {
  id: '123',
  title: 'Mock Position',
  description: 'Java',
  status: PositionStatus.PENDING,
  jobUrl: 'https://mockjoburl.net',
  stepTypes: {
    nodes: [
      TopscreenStepType.ENGLISH,
      TopscreenStepType.ONLINE_TEST,
      TopscreenStepType.TECHNICAL_ONE,
      TopscreenStepType.TECHNICAL_TWO
    ]
  },
  operations: {
    activateTopscreenPosition: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    },
    updateTopscreenPosition: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    }
  }
}

export const topscreenPositionActivateEnabledFragmentMock: TopscreenPositionFragment =
  {
    id: '125',
    title: 'Mock Position3',
    description: 'Java',
    status: PositionStatus.PENDING,
    jobUrl: 'https://mockjoburl.net',
    stepTypes: {
      nodes: [
        TopscreenStepType.ENGLISH,
        TopscreenStepType.ONLINE_TEST,
        TopscreenStepType.TECHNICAL_ONE
      ]
    },
    operations: {
      activateTopscreenPosition: {
        callable: OperationCallableTypes.ENABLED,
        messages: []
      },
      updateTopscreenPosition: {
        callable: OperationCallableTypes.HIDDEN,
        messages: []
      }
    }
  }

export const topscreenPositionSingleStepTypeFragmentMock: TopscreenPositionFragment =
  {
    id: '124',
    title: 'Mock Position3',
    description: 'Java',
    status: PositionStatus.PENDING,
    jobUrl: 'https://mockjoburl.net',
    stepTypes: {
      nodes: [TopscreenStepType.TECHNICAL_ONE]
    },
    operations: {
      activateTopscreenPosition: {
        callable: OperationCallableTypes.ENABLED,
        messages: []
      },
      updateTopscreenPosition: {
        callable: OperationCallableTypes.HIDDEN,
        messages: []
      }
    }
  }

export const topscreenPositionsFragmentMock: TopscreenPositionFragment[] = [
  topscreenPositionFragmentMock,
  topscreenPositionActivateEnabledFragmentMock,
  topscreenPositionSingleStepTypeFragmentMock
]
