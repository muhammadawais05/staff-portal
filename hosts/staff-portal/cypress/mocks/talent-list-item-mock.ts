import { Talent } from '@staff-portal/graphql/staff'

const talentListItemMock = (talent?: Partial<Talent>) =>
  ({
    id: 'VjEtVGFsZW50LTMwNDcxOTI',
    roleFlags: {
      nodes: [
        {
          id: 'VjEtUm9sZUZsYWctODI5ODk2',
          comment: 'This part was obfuscated, some content was here.',
          flaggedBy: {
            id: 'VjEtU3RhZmYtMTgxMDgxMw',
            fullName: 'Nancy Brout',
            __typename: 'Staff'
          },
          createdAt: '2022-02-07T20:19:07+03:00',
          updatedAt: '2022-02-07T20:19:07+03:00',
          flag: {
            id: 'VjEtRmxhZy0xMjEyMTY',
            color: null,
            title: 'Profile for improvement',
            __typename: 'Flag'
          },
          operations: {
            removeRoleFlag: {
              callable: 'HIDDEN',
              messages: [],
              __typename: 'Operation'
            },
            updateRoleFlag: {
              callable: 'HIDDEN',
              messages: [],
              __typename: 'Operation'
            },
            __typename: 'RoleFlagOperations'
          },
          __typename: 'RoleFlag'
        }
      ],
      __typename: 'RoleFlagConnection'
    },
    fullName: 'Cristi Pagac',
    photo: null,
    webResource: {
      url: 'https://demo.com',
      __typename: 'Link'
    },
    resumeUrl: 'https://demo.com',
    suspended: false,
    sendToJobUrl: 'https://demo.com',
    cumulativeStatus: 'ACTIVE',
    newcomer: true,
    topShield: false,
    associatedRoles: {
      nodes: [],
      __typename: 'RoleOrClientConnection'
    },
    talentPartner: null,
    cityDescription: 'Pontevedra',
    locationV2: {
      countryName: 'Spain',
      __typename: 'Location'
    },
    timeZone: {
      name: '(UTC+01:00) Europe - Madrid',
      __typename: 'TimeZone'
    },
    currentSignInAt: '2022-02-01T15:46:38+03:00',
    currentSignInIp: '84.125.88.8',
    ipLocation: {
      cityName: 'Vigo',
      countryName: 'Spain',
      __typename: 'IpLocation'
    },
    lastVisitedDate: '2022-02-08',
    activatedAt: '2022-02-09T05:07:30+03:00',
    updatedAt: '2022-02-09T05:07:30+03:00',
    joinedAt: '2021-12-09T18:31:25+03:00',
    deltaWaitingDays: 0,
    lastClosedEngagementEndDate: null,
    lastAvailabilityIncreaseDate: '2022-02-09',
    ofacStatus: 'NORMAL',
    ofacStatusComment: null,
    hourlyRate: '50.0',
    defaultClientRates: {
      hourlyRate: '97',
      weeklyRateFullTime: '3104.0',
      weeklyRatePartTime: '1552.0',
      __typename: 'DefaultClientRates'
    },
    investigations: {
      nodes: [],
      __typename: 'InvestigationConnection'
    },
    currentInterviews: {
      totalCount: 0,
      inLast2DaysCounts: [],
      inLast2To7DaysCounts: [],
      __typename: 'TalentCurrentInterviews'
    },
    vertical: {
      id: 'VjEtVmVydGljYWwtMQ',
      specializations: {
        totalCount: 15,
        __typename: 'VerticalSpecializationConnection'
      },
      __typename: 'Vertical'
    },
    specializationApplications: {
      nodes: [
        {
          id: 'VjEtU3BlY2lhbGl6YXRpb25BcHBsaWNhdGlvbi0xMDMzMjM0',
          status: 'APPROVED',
          specialization: {
            id: 'VjEtU3BlY2lhbGl6YXRpb24tMQ',
            title: 'Core',
            __typename: 'Specialization'
          },
          __typename: 'SpecializationApplication'
        }
      ],
      __typename: 'SpecializationApplicationConnection'
    },
    operations: {
      createTalentAvailabilityRequest: {
        callable: 'HIDDEN',
        messages: [],
        __typename: 'Operation'
      },
      __typename: 'TalentOperations'
    },
    skillSets: {
      nodes: [
        {
          id: 'VjEtU2tpbGxTZXQtMzQ3NjkyNQ',
          rating: 'EXPERT',
          connections: {
            totalCount: 1,
            __typename: 'SkillConnectionSkillableConnection'
          },
          skill: {
            id: 'VjEtU2tpbGwtMzY5Mjg',
            name: 'Linux',
            __typename: 'Skill'
          },
          vettedResult: {
            result: 'NO',
            __typename: 'VettedResult'
          },
          __typename: 'SkillSet'
        },

        {
          id: 'VjEtU2tpbGxTZXQtMzQ5Njg3MA',
          rating: 'COMPETENT',
          connections: {
            totalCount: 6,
            __typename: 'SkillConnectionSkillableConnection'
          },
          skill: {
            id: 'VjEtU2tpbGwtMzcwNjA',
            name: 'Web Development',
            __typename: 'Skill'
          },
          vettedResult: null,
          __typename: 'SkillSet'
        }
      ],
      __typename: 'TalentSkillSets'
    },
    type: 'Developer',
    allocatedHoursAvailability: 'PART_TIME',
    allocatedHoursAvailabilityIncludingEndingEngagements: 'PART_TIME',
    availableHours: 20,
    availableHoursIncludingEndingEngagements: 20,
    allocatedHours: 20,
    allocatedHoursConfirmedAt: null,
    availabilityRequestMetadata: {
      lowActivity: false,
      pending: 0,
      prediction: null,
      recentConfirmed: 0,
      recentRejected: 0,
      __typename: 'TalentAvailabilityRequestMetadata'
    },
    preliminarySearchSetting: {
      enabled: true,
      __typename: 'TalentPreliminarySearchSetting'
    },
    unavailableAllocatedHoursChangeRequest: null,
    endingEngagements: {
      nodes: [],
      __typename: 'EndingEngagementConnection'
    },
    __typename: 'Talent',
    profile: {
      id: 'VjEtVGFsZW50UHJvZmlsZS0xNTYyNzE5',
      yearsOfManagementExperience: 0,
      yearsOfEnterpriseExperience: '0',
      employments: {
        cumulativeReportRange: null,
        __typename: 'TalentProfileEmploymentConnection'
      },
      customRequirements: {
        backgroundCheck: true,
        drugTest: true,
        timeTrackingTools: true,
        __typename: 'TalentCustomRequirementFields'
      },
      travelVisas: {
        nodes: [
          {
            id: 'VjEtVGFsZW50VHJhdmVsVmlzYS03MjY2',
            expiryDate: null,
            visaType: 'Citizenship',
            country: {
              id: 'VjEtQ291bnRyeS0yMDc',
              name: 'Spain',
              __typename: 'Country'
            },
            __typename: 'TalentTravelVisa'
          }
        ],
        totalCount: 1,
        __typename: 'TalentTravelVisaConnection'
      },
      industrySets: {
        nodes: [
          {
            industry: {
              id: 'VjEtSW5kdXN0cnktNjcw',
              name: 'Education',
              __typename: 'Industry'
            },
            connections: {
              nodes: []
            }
          }
        ],
        totalCount: 5,
        __typename: 'ProfileIndustrySetConnection'
      },
      __typename: 'TalentProfile'
    },
    feedbackStatistics: {
      nodes: [],
      __typename: 'FeedbackStatisticEntryConnection'
    },
    engagements: {
      counters: {
        workingNumber: 0,
        clientsNumber: 0,
        repeatedClientsNumber: 0,
        acceptedInterviewsNumber: 0,
        approvedTrialsNumber: 0,
        interviewsNumber: 0,
        successRate: 0,
        trialsNumber: 0,
        __typename: 'TalentEngagementsCounters'
      },
      __typename: 'TalentEngagementConnection'
    },
    jobPreferences: null,
    ...talent
  } as unknown as Talent)

export default talentListItemMock
