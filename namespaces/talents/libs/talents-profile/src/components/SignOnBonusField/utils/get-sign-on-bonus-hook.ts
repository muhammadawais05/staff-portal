import { useLazyQuery } from '@staff-portal/data-layer-service'
import { Scalars } from '@staff-portal/graphql/staff'

import { GetTalentSignOnBonusDocument } from '../data/get-sign-on-bonus/get-sign-on-bonus.staff.gql.types'

export const getTalentSignOnBonusHook = (talentId: string) => () => {
  const [request, { data, loading, called, error }] = useLazyQuery(
    GetTalentSignOnBonusDocument,
    {
      variables: { talentId }
    }
  )

  return {
    request,
    loading,
    error,
    // TODO: use helper to convert Scalars['Time'] to Scalars['Date']
    data: data?.node?.signingBonusExpiresAt as Scalars['Date'],
    called
  }
}
