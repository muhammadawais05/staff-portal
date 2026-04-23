import { useLazyQuery } from '@staff-portal/data-layer-service'

import { GetTalentRejectionReasonDocument } from '../data/get-talent-rejection-reason/get-talent-rejection-reason.staff.gql.types'
import { getSpecializationApplication } from './get-specialization-application'

export const getSpecializationApplicationReasonHook =
  (talentId: string) => () => {
    const [request, { data, loading, called, error }] = useLazyQuery(
      GetTalentRejectionReasonDocument,
      {
        variables: { talentId }
      }
    )

    return {
      request,
      loading,
      error,
      data: getSpecializationApplication(
        data?.node?.specializationApplications?.nodes || []
      )?.rejectionReason?.reason,
      called
    }
  }
