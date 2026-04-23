import { gql } from '@staff-portal/data-layer-service'
import { WEB_RESOURCE_FRAGMENT } from '@staff-portal/facilities'

export default gql`
  query GetEmailingSectionsData($attributes: NewEngagementWizardAttributes!) {
    newEngagementWizard(step: PITCH, attributes: $attributes) {
      ...EmailingSectionsDataFragment
    }
  }

  fragment EmailingSectionsDataFragment on NewEngagementWizard {
    job {
      id

      client {
        id
        clientPartner {
          id
          fullName
        }
      }

      claimer {
        id
        fullName
      }

      ...WebResourceFragment
    }
  }

  ${WEB_RESOURCE_FRAGMENT}
`
