export const getCandidateListItemResponse = (candidateId: string) => ({
  data: {
    node: {
      id: candidateId,
      roleFlags: {
        nodes: [
          {
            id: 'VjEtUm9sZUZsYWctNTc0NjQ3',
            comment: 'This part was obfuscated, some content was here.',
            flaggedBy: null,
            createdAt: '2021-04-09T07:31:00+02:00',
            updatedAt: '2021-04-09T07:31:00+02:00',
            flag: {
              id: 'VjEtRmxhZy0xMjEyODI',
              color: null,
              title: 'Full time conversion bonus',
              __typename: 'Flag'
            },
            operations: {
              removeRoleFlag: {
                callable: 'ENABLED',
                messages: [],
                __typename: 'Operation'
              },
              updateRoleFlag: {
                callable: 'ENABLED',
                messages: [],
                __typename: 'Operation'
              },
              __typename: 'RoleFlagOperations'
            },
            __typename: 'RoleFlag'
          },
          {
            id: 'VjEtUm9sZUZsYWctNDMyMzkz',
            comment: 'This part was obfuscated, some content was here.',
            flaggedBy: null,
            createdAt: '2020-08-10T10:56:43+02:00',
            updatedAt: '2020-08-10T10:56:43+02:00',
            flag: {
              id: 'VjEtRmxhZy0xMjExOTA',
              color: null,
              title: 'Photo for replacement',
              __typename: 'Flag'
            },
            operations: {
              removeRoleFlag: {
                callable: 'ENABLED',
                messages: [],
                __typename: 'Operation'
              },
              updateRoleFlag: {
                callable: 'ENABLED',
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
      fullName: 'Earlie Ruecker',
      photo: null,
      webResource: {
        url: 'https://staging.toptal.net/platform/staff/talents/306423',
        __typename: 'Link'
      },
      resumeUrl: 'https://staging.toptal.net/resume/obfuscated_slug_158218',
      suspended: false,
      sendToJobUrl:
        'https://staging.toptal.net/platform/staff/engagements/new?engagement%5Btalent_id%5D=306423',
      cumulativeStatus: 'ACTIVE',
      newcomer: false,
      topShield: false,
      associatedRoles: {
        nodes: [],
        __typename: 'RoleOrClientConnection'
      },
      talentPartner: null,
      cityDescription: 'Birmingham',
      locationV2: {
        countryName: 'United Kingdom',
        __typename: 'Location'
      },
      timeZone: {
        name: '(UTC-03:00) America - Recife',
        __typename: 'TimeZone'
      },
      currentSignInAt: '2020-05-28T17:53:03+02:00',
      currentSignInIp: '168.0.233.54',
      ipLocation: {
        cityName: 'Patos',
        countryName: 'Brazil',
        __typename: 'IpLocation'
      },
      lastVisitedDate: '2020-05-28',
      activatedAt: '2016-02-11T08:11:28+01:00',
      updatedAt: '2022-01-16T08:03:08+01:00',
      joinedAt: '2015-10-09T17:23:28+02:00',
      deltaWaitingDays: 1083,
      lastClosedEngagementEndDate: '2019-02-21',
      lastAvailabilityIncreaseDate: '2016-03-07',
      ofacStatus: 'NORMAL',
      ofacStatusComment: null,
      hourlyRate: '60.0',
      defaultClientRates: {
        hourlyRate: '110',
        weeklyRateFullTime: '3520.0',
        weeklyRatePartTime: '1760.0',
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
            id: 'VjEtU3BlY2lhbGl6YXRpb25BcHBsaWNhdGlvbi0xODY1MQ',
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
          callable: 'ENABLED',
          messages: [],
          __typename: 'Operation'
        },
        __typename: 'TalentOperations',
        subscribeToTalentAvailabilityUpdates: {
          messages: [],
          callable: 'ENABLED',
          __typename: 'Operation'
        },
        createP2PReachOut: {
          callable: 'ENABLED',
          messages: [],
          __typename: 'Operation'
        }
      },
      skillSets: {
        nodes: [
          {
            id: 'VjEtU2tpbGxTZXQtMjI1NTcxNQ',
            rating: 'EXPERT',
            connections: {
              totalCount: 1,
              __typename: 'SkillConnectionSkillableConnection'
            },
            skill: {
              id: 'VjEtU2tpbGwtMzY5MTQ',
              name: 'JavaScript',
              __typename: 'Skill'
            },
            vettedResult: {
              result: 'NO',
              __typename: 'VettedResult'
            },
            __typename: 'SkillSet'
          },
          {
            id: 'VjEtU2tpbGxTZXQtMjI1NTcxOQ',
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
            id: 'VjEtU2tpbGxTZXQtMjI1NTcyMQ',
            rating: 'EXPERT',
            connections: {
              totalCount: 1,
              __typename: 'SkillConnectionSkillableConnection'
            },
            skill: {
              id: 'VjEtU2tpbGwtMzY5MjI',
              name: 'Python',
              __typename: 'Skill'
            },
            vettedResult: {
              result: 'NO',
              __typename: 'VettedResult'
            },
            __typename: 'SkillSet'
          },
          {
            id: 'VjEtU2tpbGxTZXQtMjI1NTcyMg',
            rating: 'EXPERT',
            connections: {
              totalCount: 2,
              __typename: 'SkillConnectionSkillableConnection'
            },
            skill: {
              id: 'VjEtU2tpbGwtMzY5MzY',
              name: 'Ruby',
              __typename: 'Skill'
            },
            vettedResult: {
              result: 'MAYBE',
              __typename: 'VettedResult'
            },
            __typename: 'SkillSet'
          },
          {
            id: 'VjEtU2tpbGxTZXQtMjI1NTcyNA',
            rating: 'EXPERT',
            connections: {
              totalCount: 1,
              __typename: 'SkillConnectionSkillableConnection'
            },
            skill: {
              id: 'VjEtU2tpbGwtMzY5Mjc',
              name: 'Git',
              __typename: 'Skill'
            },
            vettedResult: {
              result: 'NO',
              __typename: 'VettedResult'
            },
            __typename: 'SkillSet'
          },
          {
            id: 'VjEtU2tpbGxTZXQtMjI1NTcyNQ',
            rating: 'EXPERT',
            connections: {
              totalCount: 0,
              __typename: 'SkillConnectionSkillableConnection'
            },
            skill: {
              id: 'VjEtU2tpbGwtMzY5NTI',
              name: 'Test-driven Development (TDD)',
              __typename: 'Skill'
            },
            vettedResult: {
              result: 'NO',
              __typename: 'VettedResult'
            },
            __typename: 'SkillSet'
          },
          {
            id: 'VjEtU2tpbGxTZXQtMjI1NTcxNg',
            rating: 'STRONG',
            connections: {
              totalCount: 0,
              __typename: 'SkillConnectionSkillableConnection'
            },
            skill: {
              id: 'VjEtU2tpbGwtMzY5MzA',
              name: 'Agile Software Development',
              __typename: 'Skill'
            },
            vettedResult: null,
            __typename: 'SkillSet'
          },
          {
            id: 'VjEtU2tpbGxTZXQtMjI1NTcxOA',
            rating: 'STRONG',
            connections: {
              totalCount: 0,
              __typename: 'SkillConnectionSkillableConnection'
            },
            skill: {
              id: 'VjEtU2tpbGwtMzY5Mjk',
              name: 'PostgreSQL',
              __typename: 'Skill'
            },
            vettedResult: null,
            __typename: 'SkillSet'
          },
          {
            id: 'VjEtU2tpbGxTZXQtMjI1NTcyMA',
            rating: 'STRONG',
            connections: {
              totalCount: 1,
              __typename: 'SkillConnectionSkillableConnection'
            },
            skill: {
              id: 'VjEtU2tpbGwtMzcwMDk',
              name: 'D3.js',
              __typename: 'Skill'
            },
            vettedResult: null,
            __typename: 'SkillSet'
          },
          {
            id: 'VjEtU2tpbGxTZXQtMTM5NzA0',
            rating: 'COMPETENT',
            connections: {
              totalCount: 1,
              __typename: 'SkillConnectionSkillableConnection'
            },
            skill: {
              id: 'VjEtU2tpbGwtMzczODA',
              name: 'Emacs',
              __typename: 'Skill'
            },
            vettedResult: null,
            __typename: 'SkillSet'
          },
          {
            id: 'VjEtU2tpbGxTZXQtMTM5NzA1',
            rating: 'COMPETENT',
            connections: {
              totalCount: 1,
              __typename: 'SkillConnectionSkillableConnection'
            },
            skill: {
              id: 'VjEtU2tpbGwtMzkzNzU',
              name: 'Vi',
              __typename: 'Skill'
            },
            vettedResult: null,
            __typename: 'SkillSet'
          },
          {
            id: 'VjEtU2tpbGxTZXQtMTk1MDU5',
            rating: 'COMPETENT',
            connections: {
              totalCount: 1,
              __typename: 'SkillConnectionSkillableConnection'
            },
            skill: {
              id: 'VjEtU2tpbGwtMzcwMDQ',
              name: 'Flask',
              __typename: 'Skill'
            },
            vettedResult: null,
            __typename: 'SkillSet'
          },
          {
            id: 'VjEtU2tpbGxTZXQtMTk1MDYw',
            rating: 'COMPETENT',
            connections: {
              totalCount: 1,
              __typename: 'SkillConnectionSkillableConnection'
            },
            skill: {
              id: 'VjEtU2tpbGwtMzY5MjM',
              name: 'Node.js',
              __typename: 'Skill'
            },
            vettedResult: null,
            __typename: 'SkillSet'
          },
          {
            id: 'VjEtU2tpbGxTZXQtMjI1NTcxNw',
            rating: 'COMPETENT',
            connections: {
              totalCount: 1,
              __typename: 'SkillConnectionSkillableConnection'
            },
            skill: {
              id: 'VjEtU2tpbGwtMzY5MzI',
              name: 'AngularJS',
              __typename: 'Skill'
            },
            vettedResult: null,
            __typename: 'SkillSet'
          },
          {
            id: 'VjEtU2tpbGxTZXQtMjI1NTcyMw',
            rating: 'COMPETENT',
            connections: {
              totalCount: 2,
              __typename: 'SkillConnectionSkillableConnection'
            },
            skill: {
              id: 'VjEtU2tpbGwtMzY5Mzc',
              name: 'Ruby on Rails (RoR)',
              __typename: 'Skill'
            },
            vettedResult: null,
            __typename: 'SkillSet'
          }
        ],
        __typename: 'TalentSkillSets'
      },
      type: 'Developer',
      allocatedHoursAvailability: 'UNAVAILABLE',
      allocatedHoursAvailabilityIncludingEndingEngagements: 'UNAVAILABLE',
      availableHours: 0,
      availableHoursIncludingEndingEngagements: 0,
      allocatedHours: 0,
      allocatedHoursConfirmedAt: '2020-01-24T00:05:14+01:00',
      availabilityRequestMetadata: {
        lowActivity: false,
        pending: 0,
        prediction: 0.1909911256262954,
        recentConfirmed: 0,
        recentRejected: 0,
        __typename: 'TalentAvailabilityRequestMetadata'
      },
      preliminarySearchSetting: {
        enabled: true,
        __typename: 'TalentPreliminarySearchSetting'
      },
      unavailableAllocatedHoursChangeRequest: {
        id: 'VjEtQWxsb2NhdGVkSG91cnNDaGFuZ2VSZXF1ZXN0LTE0Mzg2NQ',
        comment: '',
        futureCommitment: null,
        rejectReason: 'another_freelance_job',
        returnInDate: null,
        __typename: 'AllocatedHoursChangeRequest'
      },
      endingEngagements: {
        nodes: [],
        __typename: 'EndingEngagementConnection'
      },
      __typename: 'Talent',
      profile: {
        id: 'VjEtVGFsZW50UHJvZmlsZS0zNzUwMA',
        yearsOfManagementExperience: 0,
        yearsOfEnterpriseExperience: '0',
        employments: {
          cumulativeReportRange: null,
          __typename: 'TalentProfileEmploymentConnection'
        },
        customRequirements: {
          backgroundCheck: null,
          drugTest: null,
          timeTrackingTools: null,
          __typename: 'TalentCustomRequirementFields'
        },
        travelVisas: {
          nodes: [],
          totalCount: 0,
          __typename: 'TalentTravelVisaConnection'
        },
        industrySets: {
          nodes: [],
          totalCount: 0,
          __typename: 'ProfileIndustrySetConnection'
        },
        __typename: 'TalentProfile'
      },
      feedbackStatistics: {
        nodes: [
          {
            answers: {
              nodes: [
                {
                  label: 'Hire again',
                  score: 100,
                  __typename: 'FeedbackStatisticAnswerEntry'
                },
                {
                  label: 'Timeline adherence',
                  score: 100,
                  __typename: 'FeedbackStatisticAnswerEntry'
                },
                {
                  label: 'Communication',
                  score: 100,
                  __typename: 'FeedbackStatisticAnswerEntry'
                },
                {
                  label: 'Quality of work',
                  score: 100,
                  __typename: 'FeedbackStatisticAnswerEntry'
                }
              ],
              totalCount: 1,
              __typename: 'FeedbackStatisticAnswerEntryConnection'
            },
            __typename: 'FeedbackStatisticEntry'
          }
        ],
        __typename: 'FeedbackStatisticEntryConnection'
      },
      engagements: {
        counters: {
          workingNumber: 0,
          clientsNumber: 1,
          repeatedClientsNumber: 0,
          acceptedInterviewsNumber: 1,
          approvedTrialsNumber: 1,
          interviewsNumber: 2,
          successRate: 50,
          trialsNumber: 1,
          __typename: 'TalentEngagementsCounters'
        },
        __typename: 'TalentEngagementConnection'
      },
      viewerActiveAvailabilitySubscription: null
    }
  }
})
