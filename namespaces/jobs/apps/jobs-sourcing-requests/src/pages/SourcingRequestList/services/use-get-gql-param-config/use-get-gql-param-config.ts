import {
  booleanToGql,
  EnumToGqlParam,
  GqlParams,
  IdGqlParam,
  IdsGqlParam,
  SearchBarGqlParam,
  SingleEnumToGqlParam
} from '@staff-portal/filters'
import {
  GenericBusinessTypes,
  JobCommitment,
  JobWorkType,
  SourcingRequestStatus
} from '@staff-portal/graphql/staff'
import { useMemo } from 'react'

const getSearchableNoneMeId = (id: unknown) => {
  if (!id) {
    return undefined
  }

  if (id === 'none' || id === 'me') {
    return id.toUpperCase()
  }

  return id
}

const useGetGqlParamConfig = () =>
  useMemo(
    (): GqlParams => ({
      badges: [SearchBarGqlParam()],
      claimer_id: [getSearchableNoneMeId, 'jobClaimerId'],
      talent_specialist_id: [getSearchableNoneMeId, 'talentSpecialistId'],
      company_id: [IdGqlParam(), 'clientId'],
      client_partner_id: [getSearchableNoneMeId, 'clientPartnerId'],
      business_type: [
        value => SingleEnumToGqlParam(GenericBusinessTypes)(value as string),
        'businessType'
      ],
      statuses: [EnumToGqlParam(SourcingRequestStatus)],
      specialization_ids: [IdsGqlParam(), 'specializationIds'],
      work_types: [EnumToGqlParam(JobWorkType), 'workTypes'],
      commitments: [EnumToGqlParam(JobCommitment)],
      linked_talents: [booleanToGql, 'linkedTalents']
    }),
    []
  )

export default useGetGqlParamConfig
