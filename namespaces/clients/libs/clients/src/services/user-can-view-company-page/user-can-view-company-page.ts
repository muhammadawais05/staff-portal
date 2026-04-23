import { Client, Maybe } from '@staff-portal/graphql/staff'

// After discussing the possible approaches with the BE, we've agreed
// to use the `webResource.url` field for the accessibility check.
// If that field is `null`, that means that the user doesn't have
// permission to access the company page
export const userCanViewCompanyPage = (
  company: Maybe<Pick<Client, 'webResource'>> | undefined
) => company?.webResource.url !== null
