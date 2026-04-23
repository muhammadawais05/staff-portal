import { PatchClientProfileInput } from '@staff-portal/graphql/staff'

import { ClientSocialMediaFragment } from '../data'
import { getTwitterValue } from './get-twitter-value'

export const adjustInputValues = (
  companyDetails?: Omit<ClientSocialMediaFragment, 'id' | 'operations'> | null
): Partial<Record<keyof PatchClientProfileInput, string>> => {
  return {
    twitter: getTwitterValue(companyDetails?.twitterLink?.text),
    facebook: companyDetails?.facebookLink?.text || '',
    zoominfoProfile: companyDetails?.zoominfoProfileUrl || '',
    linkedin: companyDetails?.linkedinLink?.text || '',
    crunchbase: companyDetails?.crunchbaseLink?.text || ''
  }
}
