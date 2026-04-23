import { gql } from '@apollo/client'

export default gql`
  query InvoicesListFilters {
    companyClientPartners: roles(filter: { scope: COMPANY_CLIENT_PARTNERS }) {
      nodes {
        ...RolesFullNameAndId
      }
    }
    companyClaimers: roles(filter: { scope: COMPANY_CLAIMERS }) {
      nodes {
        ...RolesFullNameAndId
      }
    }
    companyFinanceTeamMembers: roles(
      filter: { scope: COMPANY_FINANCE_TEAM_MEMBERS }
    ) {
      nodes {
        ...RolesFullNameAndId
      }
    }
    companySmbProjectRelationshipManagers: roles(
      filter: { scope: COMPANY_SMB_PROJECT_RELATIONSHIP_MANAGERS }
    ) {
      nodes {
        ...RolesFullNameAndId
      }
    }
    companySmbProjectSalesSpecialists: roles(
      filter: { scope: COMPANY_SMB_PROJECT_SALES_SPECIALISTS }
    ) {
      nodes {
        ...RolesFullNameAndId
      }
    }
    companySmbAccountManagers: roles(
      filter: { scope: OPPORTUNITY_SMB_ACCOUNT_MANAGERS }
    ) {
      nodes {
        ...RolesFullNameAndId
      }
    }
    opportunitySmbRelationshipManagers: roles(
      filter: { scope: OPPORTUNITY_SMB_RELATIONSHIP_MANAGERS }
    ) {
      nodes {
        ...RolesFullNameAndId
      }
    }

    talentMatchers: roles(filter: { scope: TALENT_MATCHERS }) {
      nodes {
        ...RolesFullNameAndId
      }
    }
    jobClaimers: roles(filter: { scope: JOB_CLAIMERS }) {
      nodes {
        ...RolesFullNameAndId
      }
    }
  }

  fragment RolesFullNameAndId on Role {
    __typename
    id
    fullName
  }
`
