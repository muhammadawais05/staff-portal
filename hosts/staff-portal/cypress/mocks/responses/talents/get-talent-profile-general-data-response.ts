import {
  OfacStatus,
  Talent,
  TalentAllocatedHoursAvailability,
  TalentCumulativeStatus,
  VisualComplianceStatus
} from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getTalentProfileGeneralDataResponse = (
  talent?: Partial<Talent>
) => ({
  data: {
    staffNode: {
      id: encodeEntityId('123', 'Talent'),
      cumulativeStatus: TalentCumulativeStatus.REJECTED,
      type: 'Developer',
      roleTitle: 'Developer',
      jobPreferences: null,
      email: 'cypress-email@toptal.io',
      skillSets: {
        nodes: []
      },
      legalName: 'cypress iscool',
      primarySkill: null,
      admissionPostUrl: null,
      linkedinUrl: null,
      otherRoles: {
        nodes: [],
        __typename: 'RoleOrClientConnection'
      },
      currentInterviews: {
        totalCount: 0,
        inLast2DaysCounts: [],
        inLast2To7DaysCounts: [],
        __typename: 'TalentCurrentInterviews'
      },
      sourcer: null,
      referrer: null,
      talentPartner: null,
      talentPartnership: null,
      canIssueSourcingCommission: false,
      profile: {
        id: 'VjEtVGFsZW50UHJvZmlsZS0xNTM4NDI5',
        industrySets: null,
        website: null,
        github: null,
        __typename: 'TalentProfile'
      },
      toptalEmail: null,
      slackContacts: {
        nodes: [],
        __typename: 'ContactConnection'
      },
      phoneContacts: {
        nodes: [
          {
            id: 'PHONE-ID',
            type: 'PHONE',
            primary: true,
            value: '/talents/911',
            __typename: 'Contact'
          }
        ],
        __typename: 'ContactConnection'
      },
      skypeContacts: {
        nodes: [
          {
            id: 'SKYPE-ID',
            type: 'SKYPE',
            value: 'cypress-skype',
            __typename: 'Contact'
          }
        ],
        __typename: 'ContactConnection'
      },
      additionalSkypeIds: {
        nodes: [],
        __typename: 'StringConnection'
      },
      supplyHealthModelData: {
        priority: 'HIGH',
        snapshotAt: '2022-01-10T12:21:44+03:00',
        __typename: 'TalentSupplyHealthModelData'
      },
      deltaWaitingDays: null,
      lastClosedEngagementEndDate: null,
      lastAvailabilityIncreaseDate: null,
      engagements: {
        counters: {
          trialsNumber: 0,
          workingNumber: 0,
          clientsNumber: 0,
          repeatedClientsNumber: 0,
          __typename: 'TalentEngagementsCounters'
        },
        __typename: 'TalentEngagementConnection'
      },
      twitter: null,
      recentIdVerification: null,
      billingName: null,
      useBillingName: false,
      locationV2: {
        countryName: 'India',
        __typename: 'Location'
      },
      cityDescription: 'Ahmedabad, Gujarat',
      timeZone: {
        name: '(UTC+05:30) Asia - Calcutta',
        value: 'Asia/Calcutta',
        __typename: 'TimeZone'
      },
      citizenship: {
        id: 'VjEtQ291bnRyeS0xMDI',
        name: 'India',
        __typename: 'Country'
      },
      eligibleForRestoration: false,
      joinedAt: '2021-11-24T10:14:31+03:00',
      applicationDetailsSubmittedAt: '2021-11-24T10:20:12+03:00',
      activatedAt: null,
      updatedAt: '2021-11-24T20:30:12+03:00',
      reapplicationDate: null,
      currentSignInAt: '2021-11-24T10:14:46+03:00',
      currentSignInIp: '223.238.232.8',
      allocatedHours: 0,
      ipLocation: {
        cityName: 'Ahmedabad',
        countryName: 'India',
        __typename: 'Location'
      },
      investigations: {
        nodes: [],
        __typename: 'InvestigationConnection'
      },
      tosAcceptedAt: null,
      cocAcceptedAt: null,
      workingTime: null,
      availableShiftRange: null,
      weeklyRate: null,
      hourlyRate: null,
      rateRecommendation: {
        meanHour: '30',
        meanWeek: '1229',
        quantity: 29,
        __typename: 'TalentRateRecommendation'
      },
      predictedTimeZone: {
        name: '(UTC+05:30) Asia - Calcutta',
        value: 'Asia/Calcutta',
        __typename: 'TimeZone'
      },
      ofacStatus: OfacStatus.NORMAL,
      visualComplianceStatus: VisualComplianceStatus.FULLY_CHECKED,
      specialHandling: false,
      signingBonusExpiresAt: null,
      prescreeningRecordingUrl: null,
      languages: {
        nodes: [],
        __typename: 'LanguageConnection'
      },
      billingNotes: null,
      paymentsHoldDescription: null,
      activePaymentHold: null,
      unallocatedMemorandum: {
        totalAmount: '0',
        webResource: {
          url: 'https://staging.toptal.net/platform/staff/memos?badges%5Btalent_ids%5D=3012798&status=unallocated',
          text: '0',
          __typename: 'Link'
        },
        __typename: 'UnallocatedMemorandumConnection'
      },
      applicantSkills: {
        nodes: [],
        __typename: 'TalentApplicantSkillConnection'
      },
      specializationApplications: {
        nodes: [],
        __typename: 'SpecializationApplicationConnection'
      },
      applicationInfo: null,
      vertical: {
        id: encodeEntityId('1', 'Vertical'),
        specializations: {
          totalCount: 15,
          __typename: 'VerticalSpecializationConnection'
        },
        __typename: 'Vertical'
      },
      viewerActiveAvailabilitySubscription: null,
      allocatedHoursAvailability: TalentAllocatedHoursAvailability.UNAVAILABLE,
      allocatedHoursAvailabilityIncludingEndingEngagements:
        TalentAllocatedHoursAvailability.UNAVAILABLE,
      availableHours: 0,
      availableHoursIncludingEndingEngagements: 0,
      allocatedHoursConfirmedAt: null,
      preliminarySearchSetting: {
        enabled: true,
        __typename: 'TalentPreliminarySearchSetting'
      },
      endingEngagements: {
        nodes: [],
        __typename: 'EndingEngagementConnection'
      },
      associatedRoles: {
        nodes: [],
        __typename: 'RoleOrClientConnection'
      },
      ...talent,
      __typename: 'Talent'
    }
  }
})
