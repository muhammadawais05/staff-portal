import {
  TalentCumulativeStatus,
  RateChangeRequestTypeEnum
} from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { generateTaskCardsFromSubjects } from './generate-task-cards-from-subjects'

describe('transformTaskSubjectsToCards', () => {
  const taskId = encodeEntityId('taskId', 'Test')
  const EXPECTED_TASK_DETAILS_CARD = {
    entityId: taskId,
    type: 'Task Details',
    title: 'Task Details'
  }

  it('adds `Task Details` card', () => {
    const result = generateTaskCardsFromSubjects(taskId, [])

    expect(result).toEqual([EXPECTED_TASK_DETAILS_CARD])
  })

  it('adds `Activity` card', () => {
    const id = encodeEntityId('test', 'Test')
    const result = generateTaskCardsFromSubjects(taskId, [], { id })

    expect(result).toEqual([
      EXPECTED_TASK_DETAILS_CARD,
      {
        entityId: id,
        type: 'Activity',
        title: 'Activity'
      }
    ])
  })

  it('maps `Client` subject to `Company` card', () => {
    const id = encodeEntityId('test', 'Test')
    const result = generateTaskCardsFromSubjects(taskId, [
      {
        id,
        __typename: 'Client',
        fullName: 'test'
      }
    ])

    expect(result).toEqual([
      {
        entityId: id,
        type: 'Company',
        title: 'test',
        subtitle: 'Company'
      },
      EXPECTED_TASK_DETAILS_CARD
    ])
  })

  it('maps `CommunityEvent` subject to `Community Event` card', () => {
    const id = encodeEntityId('test', 'Test')
    const result = generateTaskCardsFromSubjects(taskId, [
      {
        id,
        __typename: 'CommunityEvent'
      }
    ])

    expect(result).toEqual([
      {
        entityId: id,
        type: 'Community Event',
        title: 'Community Event'
      },
      EXPECTED_TASK_DETAILS_CARD
    ])
  })

  it('maps `Talent` subject `Talent` card', () => {
    const id = encodeEntityId('test', 'Test')
    const result = generateTaskCardsFromSubjects(taskId, [
      {
        id,
        __typename: 'Talent',
        fullName: 'test',
        cumulativeStatus: TalentCumulativeStatus.REJECTED_INACTIVE
      }
    ])

    expect(result).toEqual([
      {
        entityId: id,
        type: 'Talent',
        title: 'test',
        subtitle: 'REJECTED_INACTIVE'
      },
      EXPECTED_TASK_DETAILS_CARD
    ])
  })

  it('maps `Invoice` subject to `Invoice` card without consolidated invoice', () => {
    const id = encodeEntityId('test', 'Test')
    const result = generateTaskCardsFromSubjects(taskId, [
      {
        id,
        __typename: 'Invoice',
        consolidatedInvoice: null
      }
    ])

    expect(result).toEqual([
      {
        entityId: id,
        type: 'Invoice',
        title: 'test',
        subtitle: 'Invoice'
      },
      EXPECTED_TASK_DETAILS_CARD
    ])
  })

  it('maps `Invoice` subject to `Invoice` card with consolidated invoice', () => {
    const id = encodeEntityId('test', 'Test')
    const result = generateTaskCardsFromSubjects(taskId, [
      {
        id,
        __typename: 'Invoice',
        consolidatedInvoice: {
          id: '123'
        }
      }
    ])

    expect(result).toEqual([
      {
        entityId: id,
        type: 'Invoice',
        title: 'test',
        subtitle: 'Invoice (original)'
      },
      EXPECTED_TASK_DETAILS_CARD
    ])
  })

  it('maps `Payment` subject to `Payment` card', () => {
    const id = encodeEntityId('test', 'Test')
    const result = generateTaskCardsFromSubjects(taskId, [
      {
        id,
        __typename: 'Payment'
      }
    ])

    expect(result).toEqual([
      {
        entityId: id,
        type: 'Payment',
        title: 'test',
        subtitle: 'Payment'
      },
      EXPECTED_TASK_DETAILS_CARD
    ])
  })

  it('maps `Job` subject to `Job` card', () => {
    const id = encodeEntityId('test', 'Test')
    const result = generateTaskCardsFromSubjects(taskId, [
      {
        id,
        __typename: 'Job',
        title: 'job title',
        jobType: 'product_manager'
      }
    ])

    expect(result).toEqual([
      {
        entityId: id,
        type: 'Job',
        title: 'job title',
        subtitle: 'Product Manager Job'
      },
      EXPECTED_TASK_DETAILS_CARD
    ])
  })

  it('maps `Engagement` subject to `Job` card', () => {
    const id = encodeEntityId('test', 'Test')
    const result = generateTaskCardsFromSubjects(taskId, [
      {
        id: encodeEntityId('unused', 'Test'),
        __typename: 'Engagement',
        job: {
          id,
          title: 'job title',
          jobType: 'developer',
          __typename: 'Job'
        }
      }
    ])

    expect(result).toEqual([
      {
        entityId: id,
        type: 'Job',
        title: 'job title',
        subtitle: 'Developer Job'
      },
      EXPECTED_TASK_DETAILS_CARD
    ])
  })

  it('maps `RateChangeRequest` subject to `Rate Change Request` card', () => {
    const id = encodeEntityId('test', 'Test')
    const result = generateTaskCardsFromSubjects(taskId, [
      {
        id,
        requestTypeEnumValue: RateChangeRequestTypeEnum.FUTURE_ENGAGEMENTS,
        __typename: 'RateChangeRequest'
      }
    ])

    expect(result).toEqual([
      {
        entityId: id,
        type: 'Rate Change Request',
        title: 'Rate Change Request',
        subtitle: 'Future Engagements'
      },
      EXPECTED_TASK_DETAILS_CARD
    ])
  })

  it('filters out `Engagement` subject without job', () => {
    const result = generateTaskCardsFromSubjects(taskId, [
      {
        id: encodeEntityId('test', 'Test'),
        __typename: 'Engagement',
        job: null
      }
    ])

    expect(result).toEqual([EXPECTED_TASK_DETAILS_CARD])
  })

  it('groups same card types together', () => {
    const id1 = encodeEntityId('test 1', 'Test')
    const id2 = encodeEntityId('test 2', 'Test')
    const result = generateTaskCardsFromSubjects(taskId, [
      {
        id: id1,
        __typename: 'Client',
        fullName: 'test1'
      },
      {
        id: id2,
        __typename: 'Client',
        fullName: 'test2'
      }
    ])

    expect(result).toEqual([
      {
        type: 'Company',
        title: 'Company (2)',
        taskCards: [
          {
            entityId: id1,
            type: 'Company',
            title: 'test1',
            subtitle: 'Company'
          },
          {
            entityId: id2,
            type: 'Company',
            title: 'test2',
            subtitle: 'Company'
          }
        ]
      },
      EXPECTED_TASK_DETAILS_CARD
    ])
  })

  it('returns both grouped and ungrouped cards', () => {
    const id1 = encodeEntityId('test 1', 'Test')
    const id2 = encodeEntityId('test 2', 'Test')
    const id3 = encodeEntityId('test 3', 'Test')
    const result = generateTaskCardsFromSubjects(taskId, [
      {
        id: id1,
        __typename: 'Client',
        fullName: 'test1'
      },
      {
        id: id2,
        __typename: 'Job',
        title: 'job title',
        jobType: 'developer'
      },
      {
        id: id3,
        __typename: 'Client',
        fullName: 'test2'
      }
    ])

    expect(result).toEqual([
      {
        entityId: id2,
        type: 'Job',
        title: 'job title',
        subtitle: 'Developer Job'
      },
      {
        type: 'Company',
        title: 'Company (2)',
        taskCards: [
          {
            entityId: id1,
            type: 'Company',
            title: 'test1',
            subtitle: 'Company'
          },
          {
            entityId: id3,
            type: 'Company',
            title: 'test2',
            subtitle: 'Company'
          }
        ]
      },
      EXPECTED_TASK_DETAILS_CARD
    ])
  })

  it('sorts task cards by priority', () => {
    const result = generateTaskCardsFromSubjects(
      taskId,
      [
        {
          id: encodeEntityId('test 1', 'Test'),
          __typename: 'Client',
          fullName: 'test'
        },
        {
          id: encodeEntityId('test 2', 'Test'),
          __typename: 'Job',
          title: 'job title',
          jobType: 'developer'
        },
        {
          id: encodeEntityId('test 3', 'Test'),
          __typename: 'Talent',
          fullName: 'John Doe',
          cumulativeStatus: TalentCumulativeStatus.ACTIVE
        },
        {
          id: encodeEntityId('test 4', 'Test'),
          __typename: 'Invoice',
          consolidatedInvoice: null
        },
        {
          id: encodeEntityId('unused', 'Test'),
          __typename: 'Engagement',
          job: {
            id: encodeEntityId('test 5', 'Test'),
            title: 'job title',
            jobType: 'developer',
            __typename: 'Job'
          }
        },
        {
          id: encodeEntityId('test 6', 'Test'),
          __typename: 'CommunityEvent'
        },
        {
          id: encodeEntityId('test 7', 'Test'),
          __typename: 'Payment'
        },
        {
          id: encodeEntityId('test 8', 'Test'),
          requestTypeEnumValue: RateChangeRequestTypeEnum.FUTURE_ENGAGEMENTS,
          __typename: 'RateChangeRequest'
        }
      ],
      {
        id: encodeEntityId('test 9', 'Test')
      }
    )

    expect(result).toEqual([
      expect.objectContaining({ type: 'Job' }),
      expect.objectContaining({ type: 'Invoice' }),
      expect.objectContaining({ type: 'Payment' }),
      expect.objectContaining({ type: 'Community Event' }),
      expect.objectContaining({ type: 'Rate Change Request' }),
      expect.objectContaining({ type: 'Talent' }),
      expect.objectContaining({ type: 'Company' }),
      expect.objectContaining({ type: 'Task Details' }),
      expect.objectContaining({ type: 'Activity' })
    ])
  })

  it('keeps only unique entities', () => {
    const duplicateId = encodeEntityId('duplicated', 'Test')
    const result = generateTaskCardsFromSubjects(taskId, [
      {
        id: duplicateId,
        __typename: 'Job',
        title: 'job title',
        jobType: 'developer'
      },
      {
        id: encodeEntityId('test', 'Test'),
        __typename: 'Engagement',
        job: {
          id: duplicateId,
          title: 'job title',
          jobType: 'developer',
          __typename: 'Job'
        }
      }
    ])

    expect(result).toEqual([
      {
        entityId: duplicateId,
        type: 'Job',
        title: 'job title',
        subtitle: 'Developer Job'
      },
      EXPECTED_TASK_DETAILS_CARD
    ])
  })
})
