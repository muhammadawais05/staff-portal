/* eslint-disable max-lines-per-function */
/* eslint-disable max-lines */
import { add, format, sub } from '@staff-portal/date-time-utils'
import {
  TalentCumulativeStatus,
  OfacStatus,
  OperationCallableTypes,
  VisualComplianceStatus,
  TalentAllocatedHoursAvailability,
  TalentSupplyHealthPriority,
  Vertical,
  Scalars
} from '@staff-portal/graphql/staff'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { mapToTypename } from '@staff-portal/test-utils'
import { GetUserVerticalsDocument } from '@staff-portal/verticals'

import {
  GetTalentProfileGeneralDataDocument,
  TalentProfileGeneralDataFragment,
  GetTalentProfileGeneralDataQueryVariables
} from './get-talent-profile-general-data.staff.gql.types'

const OPERATION = {
  callable: OperationCallableTypes.ENABLED,
  messages: [],
  __typename: 'Operation'
}

export const createTalentProfileGeneralDataFragmentMock = (
  partialTalentProfileGeneralDataFragment: Partial<TalentProfileGeneralDataFragment> = {}
): TalentProfileGeneralDataFragment => {
  return {
    id: '123',
    primarySkill: {
      title: 'TEST_TEXT'
    },
    admissionPostUrl: 'TEST_LINK',
    linkedinUrl: 'TEST_LINK',
    profile: {
      id: '123',
      website: 'TEST_LINK',
      github: 'TEST_LINK',
      industrySets: {
        nodes: []
      }
    },
    talentPartner: null,
    talentPartnership: {
      employmentStartDate: '2021-06-07'
    },
    type: 'Developer',
    roleTitle: 'Developer',
    email: 'TEST_EMAIL',
    toptalEmail: 'TEST_EMAIL',
    slackContacts: {
      nodes: [
        {
          id: '123',
          webResource: {
            text: 'TEST_TEXT',
            url: 'TEST_LINK'
          }
        }
      ]
    },
    otherRoles: {
      nodes: []
    },
    currentInterviews: null,
    sourcer: {
      id: '123',
      __typename: 'Staff',
      webResource: {
        text: 'TEST_TEXT',
        url: 'TEST_LINK'
      }
    },
    canIssueSourcingCommission: false,
    phoneContacts: {
      nodes: [
        {
          id: '1',
          value: 'TEST_NUMBER',
          primary: true
        }
      ]
    },
    skypeContacts: {
      nodes: [{ id: '2', value: 'TEST_SKYPE' }]
    },
    additionalSkypeIds: {
      nodes: ['TEST_SKYPE']
    },
    supplyHealthModelData: {
      priority: TalentSupplyHealthPriority.MEDIUM,
      snapshotAt: '2021-06-07T14:00:04+03:00'
    },
    deltaWaitingDays: 0,
    lastClosedEngagementEndDate: null,
    lastAvailabilityIncreaseDate: null,
    engagements: {
      counters: {
        trialsNumber: 2,
        workingNumber: 1,
        clientsNumber: 5,
        repeatedClientsNumber: 1
      }
    },
    investigations: {
      nodes: []
    },
    allocatedHours: 40,
    twitter: 'TEST_TWITTER',
    legalName: 'TEST_NAME',
    billingName: 'TEST_NAME',
    useBillingName: true,
    locationV2: { countryName: 'TEST_COUNTRY' },
    cityDescription: 'TEST_CITY',
    timeZone: { name: 'EU/AS', value: 'EU/AS' },
    citizenship: {
      name: 'TEST_COUNTRY',
      id: '123'
    },
    cumulativeStatus: TalentCumulativeStatus.ACTIVE,
    eligibleForRestoration: true,
    joinedAt: sub(new Date(), { days: 1 }).toISOString(),
    applicationDetailsSubmittedAt: sub(new Date(), { days: 1 }).toISOString(),
    activatedAt: sub(new Date(), { days: 1 }).toISOString(),
    updatedAt: sub(new Date(), { days: 1 }).toISOString(),
    signingBonusExpiresAt: format(
      sub(new Date(), { days: 1 }),
      'yyyy-MM-dd'
    ) as Scalars['Time'],
    reapplicationDate: format(
      sub(new Date(), { days: 1 }),
      'yyyy-MM-dd'
    ) as Scalars['Date'],
    currentSignInAt: sub(new Date(), { days: 1 }).toISOString(),
    currentSignInIp: 'TEST_IP',
    ipLocation: {
      cityName: 'TEST_CITY',
      countryName: 'TEST_COUNTRY'
    },
    tosAcceptedAt: sub(new Date(), { days: 1 }).toISOString(),
    cocAcceptedAt: sub(new Date(), { days: 1 }).toISOString(),
    workingTime: {
      from: sub(new Date(), { days: 1 }).toLocaleTimeString(),
      to: add(new Date(), { days: 1 }).toLocaleTimeString()
    },
    availableShiftRange: {
      from: sub(new Date(), { days: 1 }).toLocaleTimeString(),
      to: add(new Date(), { days: 1 }).toLocaleTimeString()
    },
    weeklyRate: '1234',
    hourlyRate: '123',
    rateRecommendation: {
      meanHour: '1',
      meanWeek: '5',
      quantity: 4
    },
    predictedTimeZone: null,
    ofacStatus: OfacStatus.NORMAL,
    visualComplianceStatus: VisualComplianceStatus.FULLY_CHECKED,
    specialHandling: true,
    prescreeningRecordingUrl: 'TEST_LINK',
    languages: {
      nodes: []
    },
    activePaymentHold: {
      amountThreshold: '3',
      dateThreshold: null
    },
    unallocatedMemorandum: {
      totalAmount: '1234',
      webResource: {
        url: 'TEST_LINK',
        text: 'TEST_TEXT'
      }
    },
    applicantSkills: {
      nodes: []
    },
    specializationApplications: {
      nodes: []
    },
    applicationInfo: null,
    vertical: {
      id: '123',
      specializations: {
        totalCount: 1
      }
    },
    recentIdVerification: null,
    viewerActiveAvailabilitySubscription: {
      id: '123',
      active: true,
      comment: 'Subscription reason',
      operations: {
        unsubscribe: OPERATION,
        updateComment: OPERATION
      }
    },
    jobPreferences: null,
    ...partialTalentProfileGeneralDataFragment
  }
}

// eslint-disable-next-line max-lines-per-function
// eslint-disable-next-line complexity
export const createGetTalentProfileGeneralDataMock = (
  partialTalentProfileGeneralDataFragment: Partial<TalentProfileGeneralDataFragment> = {}
): MockedResponse => {
  const talentProfileGeneralDataFragment =
    createTalentProfileGeneralDataFragmentMock(
      partialTalentProfileGeneralDataFragment
    )

  const talentProfileGeneralData = {
    staffNode: {
      ...talentProfileGeneralDataFragment,
      primarySkill: {
        ...talentProfileGeneralDataFragment.primarySkill,
        __typename: 'SkillPage'
      },
      talentPartner: null,
      talentPartnership: {
        ...talentProfileGeneralDataFragment.talentPartnership,
        employmentStartDate:
          talentProfileGeneralDataFragment.talentPartnership
            ?.employmentStartDate
      },
      profile: {
        __typename: 'TalentProfile',
        ...talentProfileGeneralDataFragment.profile
      },
      slackContacts: {
        ...talentProfileGeneralDataFragment.slackContacts,
        nodes: talentProfileGeneralDataFragment.slackContacts.nodes.map(
          node => ({
            ...node,
            webResource: {
              ...node.webResource,
              __typename: 'Link'
            },
            __typename: 'Contact'
          })
        ),
        __typename: 'ContactConnection'
      },
      preliminarySearchSetting: {
        __typename: 'TalentPreliminarySearchSetting',
        enabled: true
      },
      otherRoles: {
        nodes: [...(talentProfileGeneralDataFragment.otherRoles?.nodes ?? [])],
        __typename: 'RoleOrClientConnection'
      },
      investigations: {
        nodes: [
          ...(talentProfileGeneralDataFragment?.investigations?.nodes ?? [])
        ],
        __typename: 'InvestigationConnection'
      },
      sourcer: {
        ...talentProfileGeneralDataFragment.sourcer,
        webResource: {
          ...talentProfileGeneralDataFragment.sourcer?.webResource,
          __typename: 'Staff'
        }
      },
      referrer: null,
      phoneContacts: {
        ...talentProfileGeneralDataFragment.phoneContacts,
        nodes: talentProfileGeneralDataFragment.phoneContacts.nodes.map(
          node => ({
            ...node,
            __typename: 'Contact'
          })
        ),
        __typename: 'ContactConnection'
      },
      skypeContacts: {
        ...talentProfileGeneralDataFragment.skypeContacts,
        nodes: talentProfileGeneralDataFragment.skypeContacts.nodes.map(
          node => ({
            ...node,
            __typename: 'Contact'
          })
        ),
        __typename: 'ContactConnection'
      },
      additionalSkypeIds: {
        ...talentProfileGeneralDataFragment.additionalSkypeIds,
        __typename: 'ScheduledMeetingsConnection'
      },
      supplyHealthModelData: {
        ...talentProfileGeneralDataFragment.supplyHealthModelData,
        __typename: 'TalentSupplyHealthModelData'
      },
      engagements: {
        ...talentProfileGeneralDataFragment.engagements,
        counters: {
          ...talentProfileGeneralDataFragment.engagements.counters,
          __typename: 'TalentEngagementsCounters'
        },
        __typename: 'TalentEngagementConnection'
      },

      locationV2: {
        ...talentProfileGeneralDataFragment.locationV2,
        __typename: 'Location'
      },
      timeZone: talentProfileGeneralDataFragment.timeZone && {
        ...talentProfileGeneralDataFragment.timeZone,
        __typename: 'TimeZone'
      },
      citizenship: talentProfileGeneralDataFragment.citizenship && {
        ...talentProfileGeneralDataFragment.citizenship,
        __typename: 'Country'
      },
      ipLocation: {
        ...talentProfileGeneralDataFragment.ipLocation,
        __typename: 'Location'
      },
      workingTime: talentProfileGeneralDataFragment.workingTime && {
        ...talentProfileGeneralDataFragment.workingTime,
        __typename: 'TimeOfDayRange'
      },
      availableShiftRange:
        talentProfileGeneralDataFragment.availableShiftRange && {
          ...talentProfileGeneralDataFragment.availableShiftRange,
          __typename: 'TimeOfDayRange'
        },
      specialHandling: talentProfileGeneralDataFragment.specialHandling,
      allocatedHoursAvailability: TalentAllocatedHoursAvailability.FULL_TIME,
      allocatedHoursAvailabilityIncludingEndingEngagements:
        TalentAllocatedHoursAvailability.FULL_TIME,
      availableHours: 20,
      availableHoursIncludingEndingEngagements: 20,
      allocatedHoursConfirmedAt: sub(new Date(), { days: 1 }).toISOString(),
      unavailableAllocatedHoursChangeRequest: null,
      availabilityRequestMetadata: {
        lowActivity: true,
        pending: 1,
        prediction: 4,
        recentConfirmed: 3,
        recentRejected: 2,
        __typename: 'TalentAvailabilityRequestMetadata'
      },
      billingNotes: 'TEST_NOTE',
      associatedRoles: {
        __typename: 'RoleOrClientConnection',
        nodes: []
      },
      endingEngagements: {
        __typename: 'EndingEngagementConnection',
        nodes: []
      },
      rateRecommendation: {
        ...talentProfileGeneralDataFragment.rateRecommendation,
        __typename: 'TalentRateRecommendation'
      },
      languages: {
        nodes: mapToTypename(
          talentProfileGeneralDataFragment.languages?.nodes ?? [],
          'Language'
        ),
        __typename: 'LanguageConnection'
      },
      activePaymentHold: {
        ...talentProfileGeneralDataFragment.activePaymentHold,
        __typename: 'Hold'
      },
      unallocatedMemorandum: {
        ...talentProfileGeneralDataFragment.unallocatedMemorandum,
        webResource: {
          ...talentProfileGeneralDataFragment.unallocatedMemorandum.webResource,
          __typename: 'Link'
        },
        __typename: 'UnallocatedMemorandumConnection'
      },
      applicantSkills: {
        ...talentProfileGeneralDataFragment.applicantSkills,
        __typename: 'TalentApplicantSkillConnection'
      },
      specializationApplications: {
        __typename: 'SpecializationApplicationConnection',
        nodes: [
          ...(talentProfileGeneralDataFragment?.specializationApplications
            ?.nodes ?? [])
        ].map(node => ({
          ...node,
          specialization: {
            __typename: 'Specialization',
            id: node.specialization?.id,
            title: node.specialization?.title
          },
          __typename: 'SpecializationApplication'
        }))
      },
      paymentsHoldDescription: 'until required',
      applicationInfo: talentProfileGeneralDataFragment.applicationInfo && {
        id: talentProfileGeneralDataFragment.applicationInfo.id,
        webResource: talentProfileGeneralDataFragment.applicationInfo
          .webResource
          ? {
              ...talentProfileGeneralDataFragment.applicationInfo.webResource,
              __typename: 'WebResource'
            }
          : undefined,
        __typename: 'ApplicationInfo'
      },
      vertical: {
        id: talentProfileGeneralDataFragment?.vertical?.id,
        specializations: {
          totalCount:
            talentProfileGeneralDataFragment?.vertical?.specializations
              .totalCount ?? 0,
          __typename: 'VerticalSpecializationConnection'
        },
        __typename: 'Vertical'
      },
      recentIdVerification:
        talentProfileGeneralDataFragment.recentIdVerification && {
          ...talentProfileGeneralDataFragment.recentIdVerification,
          __typename: 'Verification'
        },
      viewerActiveAvailabilitySubscription: {
        ...talentProfileGeneralDataFragment.viewerActiveAvailabilitySubscription,
        __typename: 'TalentAvailabilitySubscription'
      },
      __typename: 'Talent'
    }
  }

  return {
    request: {
      query: GetTalentProfileGeneralDataDocument,
      variables: { talentId: talentProfileGeneralData.staffNode?.id }
    },
    result: {
      data: talentProfileGeneralData
    }
  }
}

export const createGetTalentProfileGeneralDataFailedMock = (
  variables: GetTalentProfileGeneralDataQueryVariables,
  errorMessage = 'fake error message.'
) => ({
  request: { query: GetTalentProfileGeneralDataDocument, variables },
  error: new Error(errorMessage)
})

export const createGetUserVerticalsMock = ({
  verticals
}: {
  verticals?: Vertical[]
}) => ({
  request: {
    query: GetUserVerticalsDocument
  },
  result: {
    data: {
      verticals: {
        nodes: verticals?.map(vertical => ({
          ...vertical,
          __typename: 'Vertical'
        })),
        __typename: 'VerticalConnection'
      }
    }
  }
})
