import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetEmailTemplateData($templateId: ID!) {
    node(id: $templateId) {
      ...GetEmailTemplateDataFragment
    }
  }

  fragment GetEmailTemplateDataFragment on EmailTemplate {
    id
    name
    private
    brandedTemplate
    rawTemplate
    token
    sendingFrom
    brandedTemplate
    role {
      id
      fullName
      webResource {
        url
      }
    }
    targetRole {
      title
      value
    }
  }
`
