import { encodeEntityId } from '@staff-portal/data-layer-service'
import { Job } from '@staff-portal/graphql/staff'

import { enabledOperationMock } from '~integration/mocks'

export const getJobEditResponse = (job?: Partial<Job>) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Job'),
      title: 'Principal Brand Experience Engager Developer (285456)',
      claimer: {
        id: encodeEntityId('123', 'User'),
        name: 'John Doe',
        email: 'test@mail.com',
        phone: '+123456789',
        avatarUrl: 'https://'
      },
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lacus arcu, blandit non semper elementum, fringilla\nsodales est. Ut porttitor blandit sapien pellentesque pretium. Donec ut diam sed urna venenatis hendrerit. Nulla eros\narcu, mattis vitae congue cursus, tincidunt sed turpis. Curabitur non enim diam, eget elementum dolor. Vivamus enim\ntortor, tempor at vehicula ac, malesuada id est. Praesent at nibh eget metus dapibus dapibus. Donec arcu orci, sagittis\neu interdum vitae, facilisis quis nibh.\n\nMauris luctus molestie velit, at vestibulum magna cursus sit amet. Nulla in accumsan libero. Donec sed sem lectus.\nMauris congue sapien et diam euismod vitae scelerisque diam tincidunt. Praesent a justo enim, vitae venenatis dolor.\nDonec in tortor at magna dapibus suscipit sit amet a libero. Vivamus porttitor rhoncus tellus, at luctus nisl semper\nbibendum. Fusce eget accumsan orci. Donec eleif',
      postedAt: '2022-03-11T23:29:37+03:00',
      startDate: '2022-03-13',
      workType: 'REMOTE',
      commitment: 'full_time',
      skillLongShot: null,
      nicheLongShot: null,
      maxHourlyRate: 120,
      noRateLimit: false,
      uncertainOfBudgetReason: null,
      uncertainOfBudgetReasonComment: null,
      budgetDetails: 'RATE_SPECIFIED',
      hasPreferredHours: false,
      workingTimeFrom: '00:00:00',
      workingTimeTo: '24:00:00',
      hiddenForTalents: false,
      hoursOverlapEnum: null,
      estimatedLength: 'LENGTH_12_MONTHS',
      timeLengthOnsite: null,
      longshotReasons: null,
      expectedWeeklyHours: null,
      status: 'PENDING_ENGINEER',
      matcherCallScheduled: false,
      cumulativeStatus: 'PENDING_ENGINEER',
      hiredCount: 0,
      talentCount: 1,
      currentInvestigation: null,
      __typename: 'Job',
      location: null,
      vertical: {
        id: encodeEntityId('123', 'Vertical'),
        commitmentSettingsApplicable: true,
        specializations: {
          nodes: [
            {
              id: encodeEntityId('123', 'Specialization'),
              title: 'Frontend',
              __typename: 'Specialization'
            }
          ],
          __typename: 'VerticalSpecializationConnection'
        },
        skillCategories: {
          nodes: [
            {
              id: encodeEntityId('123', 'SkillCategory'),
              title: 'Other',
              position: 13,
              __typename: 'SkillCategory'
            }
          ],
          __typename: 'SkillCategoryConnection'
        },
        coreSkills: {
          nodes: [
            {
              id: encodeEntityId('123', 'SkillConnection'),
              skills: [
                {
                  id: encodeEntityId('123', 'Skill'),
                  name: 'Other',
                  competentProfilesCount: 0,
                  expertProfilesCount: 0,
                  strongProfilesCount: 0,
                  totalProfilesCount: 0,
                  category: {
                    id: encodeEntityId('123', 'SkillCategory'),
                    title: 'Other',
                    position: 13,
                    __typename: 'SkillCategory'
                  },
                  __typename: 'Skill'
                }
              ],
              __typename: 'SkillName'
            }
          ],
          __typename: 'SkillNameConnection'
        },
        __typename: 'Vertical'
      },
      commitmentSettings: {
        id: encodeEntityId('123', 'CommitmentSettings'),
        minimumHours: 5,
        lastComment: 'Commitment settings were inherited',
        __typename: 'CommitmentSettings'
      },
      specialization: {
        id: encodeEntityId('123', 'Specialization'),
        title: 'Other',
        position: 13,
        __typename: 'Specialization'
      },
      // claimer: {
      //   id: encodeEntityId('123', 'Staff'),
      //   __typename: 'Staff'
      // },
      engagements: { totalCount: 1, __typename: 'JobEngagementConnection' },
      webResource: {
        url: 'https://staging.toptal.net/platform/staff/jobs/285456',
        __typename: 'Link'
      },
      countryRequirements: { nodes: [], __typename: 'CountryConnection' },
      languages: {
        nodes: [
          {
            id: encodeEntityId('123', 'Language'),
            name: 'English',
            __typename: 'Language'
          }
        ],
        __typename: 'LanguageConnection'
      },
      timeZonePreference: {
        value: 'America/New_York',
        name: '(UTC-04:00) America - New York',
        __typename: 'TimeZone'
      },
      operations: {
        removeJob: enabledOperationMock(),
        __typename: 'JobOperations'
      },
      industries: {
        nodes: [
          {
            id: encodeEntityId('123', 'Industry'),
            name: 'eCommerce',
            __typename: 'Industry'
          }
        ],
        __typename: 'IndustryConnection'
      },
      skillSets: {
        nodes: [
          {
            id: encodeEntityId('123', 'SkillSet'),
            main: false,
            rating: 'EXPERT',
            niceToHave: false,
            skill: {
              id: encodeEntityId('123', 'Skill'),
              name: 'Magento 2',
              competentProfilesCount: 32,
              expertProfilesCount: 73,
              strongProfilesCount: 23,
              totalProfilesCount: 128,
              category: {
                id: encodeEntityId('123', 'SkillCategory'),
                title: 'Platforms',
                position: 11,
                description: 'e.g., iOS, Android, Linux',
                __typename: 'SkillCategory'
              },
              __typename: 'Skill'
            },
            __typename: 'SkillSet'
          }
        ],
        __typename: 'SkillSetConnection'
      },
      defaultSkillCategory: {
        id: encodeEntityId('123', 'SkillCategory'),
        __typename: 'SkillCategory'
      }
    }
  },
  ...job
})
