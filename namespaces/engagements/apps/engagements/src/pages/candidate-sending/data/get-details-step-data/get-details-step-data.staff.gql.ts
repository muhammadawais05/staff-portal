import { gql } from '@staff-portal/data-layer-service'
import { WEB_RESOURCE_FRAGMENT } from '@staff-portal/facilities'

import { RELATED_JOB_APPLICATION_FRAGMENT } from '../related-job-application-fragment'

export default gql`
  query GetDetailsStepData(
    $talentId: ID!
    $hasTalentId: Boolean!
    $attributes: NewEngagementWizardAttributes!
  ) {
    commitmentSettingsHoursOptions
    minimumCommitmentEnabled
    newEngagementWizard(step: DETAILS, attributes: $attributes) {
      ...DetailsStepDataFragment
    }
  }

  fragment DetailsStepDataFragment on NewEngagementWizard {
    job {
      ...DetailsStepPaymentsJobFragment
      ...DetailsStepJobApplicationsFragment
    }
    talent {
      ...DetailsStepPaymentsTalentFragment
    }
    newEngagement {
      ...DetailsStepNewEngagementFragment
    }
    mostRecentEngageableApplication {
      ... on AvailabilityRequest {
        id
        baseHourlyRate
        requestedHourlyRate
      }
      ... on JobApplication {
        id
        baseHourlyRate
        requestedHourlyRate
      }
    }
  }

  fragment DetailsStepNewEngagementFragment on NewEngagement {
    commitment
    canBeDiscounted
    defaultPartTimeDiscount
    defaultFullTimeDiscount
    defaultMarkup
    defaultUpcharge
    companyFullTimeRate
    companyHourlyRate
    companyPartTimeRate
    discountMultiplier
    fullTimeDiscount
    partTimeDiscount
    rateMethod
    rateOverrideReason
    talentFullTimeRate
    talentHourlyRate
    talentPartTimeRate
    markup
  }

  fragment DetailsStepPaymentsJobFragment on Job {
    id
    vertical {
      id
      commitmentSettingsApplicable
    }
    client {
      ...DetailsStepPaymentsJobClientFragment
    }
    commitmentSettings {
      id
      minimumHours
    }
    timeZonePreference {
      name
      value
    }
    semiMonthlyBilling
  }

  fragment DetailsStepPaymentsJobClientFragment on Client {
    id
    netTerms
    fullName
    contact {
      id
      fullName
    }
    billingDefaults {
      id
      billCycle
      billDay
    }
    enterprise
    ...WebResourceFragment
  }

  fragment DetailsStepPaymentsTalentFragment on Talent {
    id
    fullName
    weeklyRate
    hourlyRate
    type
    profileLink {
      url
      text
      newTab
    }
    defaultClientRates {
      hourlyRate
      weeklyRatePartTime
      weeklyRateFullTime
    }
    ...WebResourceFragment
  }

  fragment DetailsStepJobApplicationsFragment on Job {
    id
    relatedJobApplications: applications(
      filter: { statuses: [PENDING, CANCELLED], talentIds: [$talentId] }
    ) @include(if: $hasTalentId) {
      nodes {
        ...RelatedJobApplicationFragment
      }
    }
  }

  ${RELATED_JOB_APPLICATION_FRAGMENT}
  ${WEB_RESOURCE_FRAGMENT}
`
