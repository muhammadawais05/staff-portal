import { createOperationMock } from '@staff-portal/operations/src/mocks'
import {
  TalentAllocatedHoursAvailability,
  TopShieldApplicationStatus
} from '@staff-portal/graphql/staff'
import { createTaskListItemMock } from '@staff-portal/tasks-list-item/src/mocks'
import { createNoteMock } from '@staff-portal/notes/src/mocks'

import {
  TalentTopShieldEngagementFragment,
  TalentTopShieldFragment
} from './data/get-talent-top-shield'
import { TopShieldApplicationQuarterFragment } from './data/top-shield-application-quarter-fragment'
import { TopShieldApplicationFragment } from './data'

export const createActiveEngagementMock = (
  fields?: Partial<TalentTopShieldEngagementFragment>
): TalentTopShieldEngagementFragment => ({
  id: 'VjEtUmF0ZUNoYW5nZVJlcXVlc3QtMjI5NQ',
  startDate: '2020-01-01',
  engagementBreaks: {
    nodes: [
      {
        startDate: '2020-02-01T00:00:00.000Z',
        endDate: '2020-02-19T00:00:00.000Z'
      }
    ]
  },
  job: {
    estimatedEndDate: '2021-01-01',
    title: 'Junior Web Dev'
  },
  ...fields
})

export const createQuarterMock = (
  fields?: Partial<TopShieldApplicationQuarterFragment>
): TopShieldApplicationQuarterFragment => ({
  id: '123',
  startDate: '2020-06-01',
  endDate: '2022-01-01',
  paymentEndDate: '2020-07-01',
  operations: {
    updateTopShieldApplicationQuarter: createOperationMock()
  },
  ...fields
})

export const createTopShieldApplicationMock = (
  fields?: Partial<TalentTopShieldFragment>,
  topShieldFields?: Partial<TopShieldApplicationFragment>
): TalentTopShieldFragment => ({
  id: '123',
  fullName: 'David Mason',
  allocatedHours: 40,
  availableHours: 20,
  roleTitle: 'Developer',
  type: 'test',
  allocatedHoursAvailability: TalentAllocatedHoursAvailability.FULL_TIME,
  availableHoursIncludingEndingEngagements: 20,
  allocatedHoursAvailabilityIncludingEndingEngagements:
    TalentAllocatedHoursAvailability.FULL_TIME,
  workingPeriods: {
    nodes: []
  },
  engagements: {
    nodes: []
  },
  topShieldApplication: {
    id: 'VjEtVGFsZW50LTE4OTI1NTQ',
    contractSignedDate: '2019-01-01',
    initialPitchDate: '2019-01-01',
    scheduledEndDate: '2019-01-01',
    interviewCompletedDate: '2019-01-01',
    startDate: '2019-02-01',
    status: TopShieldApplicationStatus.ACTIVE,
    segment: 'Newcomer',
    skill: 'React',
    defaultNoteAnswers: {
      nodes: []
    },
    outreachStage: null,
    outreachStatus: null,
    operations: {
      updateContractSignedDate: createOperationMock(),
      updateInitialPitchDate: createOperationMock(),
      updateInterviewCompletedDate: createOperationMock(),
      updateScheduledEndDate: createOperationMock(),
      updateSegment: createOperationMock(),
      updateSkill: createOperationMock(),
      updateStartDate: createOperationMock(),
      updateStatus: createOperationMock(),
      updateTopShieldApplicationOutreachStage: createOperationMock(),
      updateTopShieldApplicationOutreachStatus: createOperationMock(),
      addGeneralTopShieldApplicationNote: createOperationMock(),
      addTopShieldApplicationInterviewNote: createOperationMock(),
      createTopShieldApplicationQuarter: createOperationMock()
    },
    tasks: {
      nodes: [createTaskListItemMock({ status: 'pending' })],
      totalCount: 1
    },
    notes: {
      nodes: [createNoteMock()],
      totalCount: 1
    },
    quarters: {
      nodes: [createQuarterMock()],
      totalCount: 1
    },
    ...topShieldFields
  },
  ...fields
})
