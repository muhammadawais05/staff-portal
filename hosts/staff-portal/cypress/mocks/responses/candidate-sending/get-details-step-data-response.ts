import { encodeEntityId } from '@staff-portal/data-layer-service'
import {
  CommitmentAvailability,
  EngagementRateMethodEnum
} from '@staff-portal/graphql/staff'

export const getDetailsStepDataResponse = () => ({
  data: {
    commitmentSettingsHoursOptions: [0, 5],
    minimumCommitmentEnabled: true,
    newEngagementWizard: {
      job: {
        id: encodeEntityId('123', 'Job'),
        vertical: {
          id: encodeEntityId('123', 'Vertical'),
          commitmentSettingsApplicable: false,
          __typename: 'Vertical'
        },
        client: {
          id: encodeEntityId('123', 'Client'),
          netTerms: 30,
          fullName: "O'Hara-Rice UB",
          contact: {
            id: encodeEntityId('123', 'CompanyRepresentative'),
            fullName: 'Torrie Schmeler',
            __typename: 'CompanyRepresentative'
          },
          billingDefaults: {
            id: 'VjEtQ2xpZW50QmlsbGluZ0RlZmF1bHRzLTQ5MjcxOA',
            billCycle: null,
            billDay: null,
            __typename: 'ClientBillingDefaults'
          },
          enterprise: true,
          webResource: {
            text: "O'Hara-Rice UB",
            url: 'https://staging.toptal.net/platform/staff/companies/2324860',
            __typename: 'Link'
          },
          __typename: 'Client'
        },
        commitmentSettings: {
          id: 'VjEtQ29tbWl0bWVudFNldHRpbmdzLTcxNzM0Nw',
          minimumHours: 0,
          __typename: 'CommitmentSettings'
        },
        timeZonePreference: {
          name: '(UTC-07:00) America - Los Angeles',
          value: 'America/Los_Angeles',
          __typename: 'TimeZone'
        },
        semiMonthlyBilling: false,
        __typename: 'Job',
        relatedJobApplications: {
          nodes: [],
          __typename: 'JobApplicationConnection'
        }
      },
      talent: {
        id: encodeEntityId('123', 'Talent'),
        fullName: 'Andrei Mocanu',
        weeklyRate: '2200.0',
        hourlyRate: '55.0',
        type: 'Designer',
        profileLink: {
          url: 'https://staging.toptal.net/platform/staff/talents/101101',
          text: 'Andrei Mocanu',
          newTab: false,
          __typename: 'TalentProfileLink'
        },
        defaultClientRates: {
          hourlyRate: '80',
          weeklyRatePartTime: '1600.0',
          weeklyRateFullTime: '3200.0',
          __typename: 'DefaultClientRates'
        },
        webResource: {
          text: 'Andrei Mocanu',
          url: 'https://staging.toptal.net/platform/staff/talents/101101',
          __typename: 'Link'
        },
        __typename: 'Talent'
      },
      newEngagement: {
        commitment: CommitmentAvailability.part_time,
        canBeDiscounted: false,
        defaultPartTimeDiscount: '0',
        defaultFullTimeDiscount: '0',
        defaultMarkup: '25.0',
        defaultUpcharge: '0',
        companyFullTimeRate: '3200.0',
        companyHourlyRate: '80.0',
        companyPartTimeRate: '1600.0',
        discountMultiplier: '1',
        rateMethod: EngagementRateMethodEnum.DEFAULT,
        rateOverrideReason: null,
        talentFullTimeRate: '2200.0',
        talentHourlyRate: '55.0',
        talentPartTimeRate: '1100.0',
        markup: '25',
        __typename: 'NewEngagement'
      },
      mostRecentEngageableApplication: null,
      __typename: 'NewEngagementWizard'
    }
  }
})
