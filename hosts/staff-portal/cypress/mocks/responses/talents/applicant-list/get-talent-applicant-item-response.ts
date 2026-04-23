import { encodeEntityId } from '@staff-portal/data-layer-service'
import { Talent } from '@staff-portal/graphql/staff'

export const getTalentApplicantItemResponse = (talent?: Partial<Talent>) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Talent'),
      isNew: false,
      fullName: 'Yolanda Huels',
      webResource: {
        url: 'https://staging.toptal.net/platform/staff/talents/3364954',
        __typename: 'Link'
      },
      admissionPostUrl: null,
      roleFlags: {
        nodes: [
          {
            id: encodeEntityId('123', 'RoleFlag'),
            flag: {
              id: 'VjEtRmxhZy0xMjExMzI',
              token: 'signing_bonus',
              __typename: 'Flag'
            },
            __typename: 'RoleFlag'
          }
        ],
        __typename: 'RoleFlagConnection'
      },
      eligibleForAutomaticRestore: true,
      operations: {
        resumeTalentApplication: {
          callable: 'HIDDEN',
          messages: [
            'Something went wrong. Please try again later.',
            'Cannot run "restore" while Yolanda Huels is in status "applied"',
            'Talent was not rejected in screening'
          ],
          __typename: 'Operation'
        },
        restoreTalentActivation: {
          callable: 'HIDDEN',
          messages: [
            'Cannot run "restore" while Yolanda Huels is in status "applied"',
            'Talent was not rejected in activation',
            'Talent has no specialization'
          ],
          __typename: 'Operation'
        },
        pauseTalent: {
          callable: 'ENABLED',
          messages: [],
          __typename: 'Operation'
        },
        resumeTalent: {
          callable: 'HIDDEN',
          messages: ['Only paused talent can be resumed'],
          __typename: 'Operation'
        },
        updateTalentApplicantSkills: {
          callable: 'ENABLED',
          messages: [],
          __typename: 'Operation'
        },
        __typename: 'TalentOperations'
      },
      specializationApplications: {
        nodes: [
          {
            id: encodeEntityId('123', 'SpecializationApplication'),
            status: 'PENDING',
            specialization: null,
            operations: {
              id: encodeEntityId('123', 'SpecializationApplicationOperations'),
              rejectSpecializationApplication: {
                callable: 'ENABLED',
                messages: [],
                __typename: 'Operation'
              },
              __typename: 'SpecializationApplicationOperations'
            },
            __typename: 'SpecializationApplication'
          }
        ],
        __typename: 'SpecializationApplicationConnection'
      },
      email: 'sank-9149013387fff9d1@toptal.io',
      locationV2: {
        countryName: 'India',
        __typename: 'Location'
      },
      ipLocation: {
        cityName: 'Junagadh',
        countryName: 'India',
        __typename: 'IpLocation'
      },
      currentSignInAt: '2022-04-06T18:52:13+02:00',
      currentSignInIp: '150.129.200.2',
      timeZone: {
        name: '(UTC+05:30) Asia - Calcutta',
        value: 'Asia/Calcutta',
        __typename: 'TimeZone'
      },
      applicantSkills: {
        nodes: [
          {
            id: encodeEntityId('123', 'Skill'),
            name: 'Ruby',
            __typename: 'Skill'
          }
        ],
        __typename: 'TalentApplicantSkillConnection'
      },
      cumulativeStatus: 'APPLIED',
      investigations: {
        nodes: [],
        __typename: 'InvestigationConnection'
      },
      newcomer: false,
      topShield: false,
      vertical: {
        id: encodeEntityId('123', 'Vertical'),
        specializations: {
          totalCount: 15,
          __typename: 'VerticalSpecializationConnection'
        },
        __typename: 'Vertical'
      },
      joinedAt: '2022-04-01T08:43:38+02:00',
      updatedAt: '2022-04-03T19:59:26+02:00',
      type: 'Developer',
      ...talent,
      __typename: 'Talent'
    }
  }
})
