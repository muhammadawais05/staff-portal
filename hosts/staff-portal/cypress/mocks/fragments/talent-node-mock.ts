import {
  Talent,
  TalentAllocatedHoursAvailability,
  TalentCumulativeStatus
} from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { contactMock } from '../contact-mock'

export const talentNodeMock = (node?: Partial<Talent>) => ({
  node: () =>
    ({
      allocatedHoursAvailability: TalentAllocatedHoursAvailability.FULL_TIME,
      associatedRoles: {
        nodes: []
      },
      availableHours: 5,
      cumulativeStatus: TalentCumulativeStatus.ACTIVE,
      endingEngagements: {
        nodes: []
      },
      engagements: {
        __typename: 'TalentEngagementConnection',
        counters: {
          successRate: 1,
          clientsNumber: 1,
          approvedTrialsNumber: 1,
          trialsNumber: 1,
          acceptedInterviewsNumber: 1,
          interviewsNumber: 1,
          rejectedTrialsNumber: 1,
          repeatedClientsNumber: 1,
          successfulTrialsNumber: 1,
          trialSuccessRate: 1,
          workingNumber: 1
        }
      },
      fullName: 'John Doe',
      id: encodeEntityId('123', 'Talent'),
      type: 'Developer',
      roleTitle: 'Developer',
      talentType: 'Developer',
      email: 'talent-mock@toptal.io',
      skype: 'john_doe1410259',
      scheduledMeetings: {
        nodes: []
      },
      phoneNumber: '+5501916491724',
      resumeUrl: 'https://example.com/resume',
      webResource: {
        __typename: 'Link',
        text: 'John Doe',
        url: 'https://staging.toptal.net/platform/staff/talents/123'
      },
      contacts: {
        nodes: [contactMock()],
        totalCount: 1
      },
      __typename: 'Talent',
      ...node
    } as Talent)
})
