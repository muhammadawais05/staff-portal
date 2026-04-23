import { gql } from '@staff-portal/data-layer-service'
import { TIME_ZONE_FRAGMENT } from '@staff-portal/date-time-utils'
import { WEB_RESOURCE_FRAGMENT } from '@staff-portal/facilities'
import { TALENT_PARTNER_FRAGMENT } from '@staff-portal/talents'

const TALENT_ROLE_STEPS_FRAGMENT = gql`
  fragment TalentRoleStepsFragment on Talent {
    roleSteps(
      filter: { statuses: [CLAIMED] }
      pagination: { limit: 1, offset: 0 }
      order: { direction: DESC, field: CREATED_AT }
    ) {
      nodes {
        id
        step {
          id
          title
        }
      }
    }
  }
`

const TALENT_REJECTION_DEADLINES_FRAGMENT = gql`
  fragment TalentRejectionDeadlinesFragment on Talent {
    inactivityRejectionDeadlines(
      order: { field: DATE, direction: ASC }
      pagination: { offset: 0, limit: 1 }
    ) {
      nodes {
        id
        date
      }
    }
  }
`

const TALENT_INVESTIGATIONS_FRAGMENT = gql`
  fragment TalentInvestigationsFragment on Talent {
    investigations(filter: { current: true }) {
      nodes {
        id
        startedAt
      }
    }
  }
`

const TALENT_CONTACTS_FRAGMENT = gql`
  fragment TalentContactsFragment on Talent {
    contacts(filter: { type: [PHONE, PHONE_WITH_NOTES] }) {
      nodes {
        id
        primary
        value
        note
      }
    }
  }
`

const TALENT_ENGAGEMENTS_FRAGMENT = gql`
  fragment TalentEngagementsFragment on Talent {
    engagements {
      jobCounters {
        active
        removed
        closed
      }
      counters {
        acceptedInterviewsNumber
        approvedTrialsNumber
        interviewsNumber
        successRate
        trialsNumber
        workingNumber
      }
    }
  }
`

const TALENT_SPECIALIZATIONS_FRAGMENT = gql`
  fragment TalentSpecializationsFragment on Talent {
    specializationApplications(filter: { statuses: [APPROVED, PENDING] }) {
      nodes {
        id
        status
        specialization {
          id
          title
        }
      }
    }
  }
`

const TALENT_BREAKS_FRAGMENT = gql`
  fragment TalentBreaksFragment on Talent {
    breaks(filter: { statuses: [SCHEDULED] }) {
      totalCount
    }
  }
`

const TALENT_APPLICATIONS_FRAGMENT = gql`
  fragment TalentApplicationsFragment on Talent {
    applications(filter: { statuses: [PENDING] }) {
      totalCount
    }
  }
`

export const TASK_TALENT_FRAGMENT = gql`
  fragment TaskTalentFragment on Talent {
    id
    webResource {
      url
      text
    }
    talentType
    resumeUrl
    email
    skype
    additionalSkypeIds(order: { field: RECENCY, direction: DESC }) {
      nodes
    }
    photo {
      thumb
    }
    cumulativeStatus
    hourlyRate
    cityDescription
    locationV2 {
      countryName
      cityName
    }
    primarySkill {
      title
    }
    timeZone {
      ...TimeZoneFragment
    }
    linkedinUrl
    profile {
      id
      github {
        text
        url
      }
      resumeFiles(pagination: { limit: 1, offset: 0 }) {
        nodes {
          identifier
          uploadedAt
          url
        }
      }
    }
    joinedAt
    legalName
    citizenship {
      id
      name
    }
    reapplicationDate
    availableHours
    allocatedHoursConfirmedAt
    invoices: invoicesNullable {
      totalCount
      ...WebResourceFragment
    }
    disputedInvoices: invoicesNullable(filter: { statuses: [disputed] }) {
      totalCount
      ...WebResourceFragment
    }

    ...TalentApplicationsFragment
    ...TalentBreaksFragment
    ...TalentRoleStepsFragment
    ...TalentRejectionDeadlinesFragment
    ...TalentInvestigationsFragment
    ...TalentContactsFragment
    ...TalentSpecializationsFragment
    ...TalentEngagementsFragment
    ...TalentPartnerFragment
  }

  ${TIME_ZONE_FRAGMENT}
  ${TALENT_APPLICATIONS_FRAGMENT}
  ${TALENT_BREAKS_FRAGMENT}
  ${TALENT_ROLE_STEPS_FRAGMENT}
  ${TALENT_REJECTION_DEADLINES_FRAGMENT}
  ${TALENT_INVESTIGATIONS_FRAGMENT}
  ${TALENT_CONTACTS_FRAGMENT}
  ${TALENT_SPECIALIZATIONS_FRAGMENT}
  ${TALENT_ENGAGEMENTS_FRAGMENT}
  ${TALENT_PARTNER_FRAGMENT}
  ${WEB_RESOURCE_FRAGMENT}
`
