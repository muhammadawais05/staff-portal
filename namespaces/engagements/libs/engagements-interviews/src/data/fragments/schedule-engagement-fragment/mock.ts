import { ScheduleEngagementFragment } from './schedule-engagement-fragment.staff.gql.types'

export const createScheduleEngagementFragmentMock = (
  scheduleEngagement: Partial<ScheduleEngagementFragment> = {}
): ScheduleEngagementFragment => ({
  id: 'engagement-id',
  job: {
    id: 'job-id',
    title: 'Job Title',
    claimer: {
      id: '1',
      fullName: 'Claimer Full Name',
      phoneNumber: 'claimer-123456',
      email: 'test@test.test',
      skype: 'skype_id'
    },
    ...scheduleEngagement.job
  },
  client: {
    id: '1',
    fullName: 'Client Full Name',
    enterprise: true,
    timeZone: {
      name: '(UTC+03:00) Asia - Kuwait',
      value: 'Asia/Kuwait'
    },
    contact: {
      id: 'contact-id',
      phoneNumber: 'client-123456'
    },
    emailCarbonCopyOptions: {
      nodes: [
        {
          default: true,
          label: 'Test',
          role: {
            id: '1',
            email: 'test@test.test',
            fullName: 'User Name'
          }
        }
      ]
    },
    ...scheduleEngagement.client
  },
  talent: {
    id: 'talent-id',
    fullName: 'Talent Full Name',
    skype: 'skype-id',
    phoneNumber: 'talent-123456',
    toptalEmail: 'talent-toptal-email',
    ...scheduleEngagement.talent
  },
  ...scheduleEngagement
})
