import {
  CumulativeJobStatus,
  FieldCheckResult,
  Job,
  JobHoursOverlap,
  JobStatus,
  JobWorkType,
  ContactType
} from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { clientNodeMock } from './client-node-mock'
import { jobOperationsMock } from './job-operations-mock'
import { timeZoneMock } from './time-zone-mock'
import { webResourceMock } from './web-resource-mock'

export const jobNodeMock = (node?: {}) => ({
  node: () =>
    ({
      __typename: 'Job',
      id: encodeEntityId('123', 'Job'),
      jobType: 'designer',
      requiredApplicationPitch: true,
      isSpecializable: true,
      title: 'Test Job',
      talentCount: 2,
      status: JobStatus.ACTIVE,
      cumulativeStatus: CumulativeJobStatus.ACTIVE,
      postedAt: '2021-07-16T23:29:07+03:00',
      commitment: 'full_time',
      workType: JobWorkType.REMOTE,
      matcherCallScheduled: false,
      hiredCount: 1,
      currentInvestigation: null,
      timeZonePreference: timeZoneMock(),
      hasPreferredHours: true,
      preferHoursOverlapping: true,
      hoursOverlapEnum: JobHoursOverlap.HOUR_4,
      autoConsolidationEnabled: false,
      presalesEngagement: false,
      presalesEngagementComment: null,
      workingTimeFrom: '12:00:00',
      workingTimeTo: '24:00:00',
      salesforceLink: {
        text: 'Some link',
        url: 'https://google.com'
      },
      timeLengthOnsite: 0,
      fieldCheck: {
        id: 'some-id',
        skills: FieldCheckResult.COMPLETE,
        commitment: FieldCheckResult.COMPLETE,
        companyTimeZone: FieldCheckResult.COMPLETE,
        estimatedLength: FieldCheckResult.COMPLETE,
        hasPreferredHours: FieldCheckResult.COMPLETE,
        hoursOverlap: FieldCheckResult.COMPLETE,
        jobType: FieldCheckResult.COMPLETE,
        maxHourlyRate: FieldCheckResult.COMPLETE,
        projectSpecCompleteness: FieldCheckResult.COMPLETE,
        projectType: FieldCheckResult.COMPLETE,
        startDate: FieldCheckResult.COMPLETE,
        talentCount: FieldCheckResult.COMPLETE,
        title: FieldCheckResult.COMPLETE
      },
      client: clientNodeMock().node(),
      ...webResourceMock({
        text: 'Test Job'
      }),
      claimer: {
        id: encodeEntityId('123', 'Claimer'),
        fullName: 'John Snow',
        phoneNumber: '555516491724',
        email: 'greg-Cc6427d908dee2bb@toptal.io>',
        skype: 'john_snow_123456'
      },
      operations: jobOperationsMock(),
      skillSets: {
        totalCount: 0,
        nodes: []
      },
      applications: {
        totalCount: 0,
        nodes: []
      },
      availabilityRequests: {
        totalCount: 0,
        nodes: []
      },
      positionQuestions: {
        totalCount: 0,
        nodes: []
      },
      matchingNoteQuestions: {
        totalCount: 0,
        nodes: []
      },
      contacts: {
        totalCount: 0,
        edges: [],
        nodes: [
          {
            id: 'VjEtQ29udGFjdC0zMzQ4ODYz',
            primary: true,
            type: ContactType.PHONE,
            value: 'test-value'
          }
        ]
      },
      notes: {
        operations: {
          createNote: {
            callable: 'ENABLED',
            messages: []
          }
        },
        nodes: []
      },
      ...node
    } as unknown as Job)
})
