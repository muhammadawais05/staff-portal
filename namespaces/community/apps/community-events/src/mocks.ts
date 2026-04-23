import { OperationCallableTypes } from '@staff-portal/graphql/staff'

import { EventTag, CommunityEvents } from './types'

export const FAKE_EVENT_TAGS: EventTag[] = [
  {
    id: '0',
    title: 'Python',
    active: true,
    operations: {
      updateCommunityEventTag: {
        callable: OperationCallableTypes.ENABLED,
        messages: []
      },
      removeCommunityEventTag: {
        callable: OperationCallableTypes.ENABLED,
        messages: []
      }
    }
  },
  {
    id: '1',
    title: 'Finance',
    active: false,
    operations: {
      updateCommunityEventTag: {
        callable: OperationCallableTypes.ENABLED,
        messages: []
      },
      removeCommunityEventTag: {
        callable: OperationCallableTypes.ENABLED,
        messages: []
      }
    }
  },
  {
    id: '2',
    title: 'Data Science',
    active: true,
    operations: {
      updateCommunityEventTag: {
        callable: OperationCallableTypes.ENABLED,
        messages: []
      },
      removeCommunityEventTag: {
        callable: OperationCallableTypes.ENABLED,
        messages: []
      }
    }
  }
]

export const FAKE_COMMUNITY_EVENTS: CommunityEvents = [
  {
    id: '1',
    name: 'First Event - Long Name',
    shortName: 'First Event - Short Name',
    description: 'First Event Description',
    attendees: {
      totalCount: 5
    }
  },
  {
    id: '2',
    name: 'Second Event - Long Name',
    shortName: 'Second Event - Short Name',
    description: 'Second Event Description'
  }
]
