import {
  AvailabilityRequest,
  OperationCallableTypes
} from '@staff-portal/graphql/staff'

export const jobAvailabilityRequestMock = () =>
  ({
    job: {
      id: 'VjEtSm9iLTI2NjE2Mw',
      skillSets: {
        nodes: [
          {
            id: 'VjEtU2tpbGxTZXQtMzI0MDk5Ng',
            skill: {
              id: 'VjEtU2tpbGwtMzY5MTQ'
            }
          },
          {
            id: 'VjEtU2tpbGxTZXQtMzI0MDk5Nw',
            skill: {
              id: 'VjEtU2tpbGwtMzcxNDU'
            }
          },
          {
            id: 'VjEtU2tpbGxTZXQtMzI0MDk5OA',
            skill: {
              id: 'VjEtU2tpbGwtMzc3ODk'
            }
          }
        ]
      },
      applicantsEmailMessaging: {
        id: 'VjEtRW1haWxNZXNzYWdpbmdKb2JBcHBsaWNhdGlvbi00NzE1NjA',
        operations: {
          sendEmailTo: {
            callable: OperationCallableTypes.ENABLED,
            messages: []
          }
        }
      }
    },
    talent: {
      id: 'VjEtVGFsZW50LTEyMTc3OQ',
      fullName: 'Bethany Bechtelar',
      type: 'Developer',
      locationV2: {
        country: {
          id: 'VjEtQ291bnRyeS0xMA',
          name: 'Argentina'
        }
      },
      timeZone: {
        name: '(UTC-03:00) America - Buenos Aires'
      },
      webResource: {
        url: 'https://staging.toptal.net/platform/staff/talents/121779'
      },
      hourlyRate: '38.0',
      photo: null,
      talentPartner: null,
      resumeUrl: 'https://staging.toptal.net/resume/obfuscated_slug_407',
      skillSets: {
        nodes: [
          {
            id: 'VjEtU2tpbGxTZXQtOTgxMTc',
            rating: 'EXPERT',
            connections: {
              totalCount: 0
            },
            skill: {
              id: 'VjEtU2tpbGwtMzcwMTY',
              name: 'DevOps'
            },
            vettedResult: {
              result: 'DISQUALIFIED'
            }
          },
          {
            id: 'VjEtU2tpbGxTZXQtMTI4MDAw',
            rating: 'EXPERT',
            connections: {
              totalCount: 3
            },
            skill: {
              id: 'VjEtU2tpbGwtMzY5MTg',
              name: 'CSS'
            },
            vettedResult: {
              result: 'DISQUALIFIED'
            }
          }
        ]
      },
      matchQualityMetrics: {
        nodes: [
          {
            label: 'Portfolio Items',
            labelLink: 'https://staging.toptal.net/resume/obfuscated_slug_407',
            labelTooltip:
              'Talent meets minimum count of portfolio items:\n6 for Designers\n3 for other verticals',
            name: 'PORTFOLIO_COUNT',
            value: 'FAILED',
            valueTooltip:
              'Talent only has 1 portfolio item.\n3 are required for Developers.'
          }
        ]
      },
      engagements: {
        counters: {
          workingNumber: 0,
          clientsNumber: 11,
          repeatedClientsNumber: 2,
          acceptedInterviewsNumber: 22,
          approvedTrialsNumber: 13,
          interviewsNumber: 32,
          successRate: 41,
          trialsNumber: 14
        }
      }
    },
    jobPositionAnswers: {
      nodes: []
    },
    operations: {
      withdrawAvailabilityRequest: {
        callable: OperationCallableTypes.ENABLED,
        messages: []
      }
    },
    status: 'PENDING',
    expirationReason: null,
    talentComment: null,
    rejectReason: null,
    emailMessaging: {
      id: 'VjEtRW1haWxNZXNzYWdpbmdBdmFpbGFiaWxpdHlSZXF1ZXN0ZWUtNzg0MDE3',
      operations: {
        sendEmailTo: {
          callable: OperationCallableTypes.ENABLED,
          messages: []
        }
      }
    }
  } as unknown as AvailabilityRequest)
