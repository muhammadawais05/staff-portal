import { FilterConfigType, FiltersConfig } from '@staff-portal/filters'
import { GenericBusinessTypes } from '@staff-portal/graphql/staff'
import { useMemo } from 'react'
import {
  NOT_SELECTED_OPTION,
  NOT_SELECTED_PLACEHOLDER
} from '@staff-portal/config'

import {
  JOB_COMMITMENT_MAPPING,
  JOB_WORK_TYPE_MAPPING,
  SOURCING_REQUEST_STATUS_MAPPING
} from '../../../../config'
import { useGetSourcingRequestFilterOptions } from '../../data/get-sourcing-request-filter-options/get-sourcing-request-filter-options.staff.gql'
import { convertConfigurationToFilterOptions } from '../convert-configuration-to-filter-options/convert-configuration-to-filter-options'
import { useGetJobTypes } from '../use-get-job-types'

export const NOT_CLAIMED_OPTION = {
  label: 'Not Claimed',
  value: 'none'
}

export const CLAIMED_BY_ME_OPTION = {
  label: 'Claimed by Me',
  value: 'me'
}

const ADDITIONAL_OPTIONS = [
  NOT_SELECTED_OPTION,
  NOT_CLAIMED_OPTION,
  CLAIMED_BY_ME_OPTION
]

export const useFiltersConfig = () => {
  const {
    loading: loadingSourcingRequestFilterOptions,
    clientPartners,
    companies,
    jobClaimers,
    talentSpecialists
  } = useGetSourcingRequestFilterOptions()

  const { loadingJobTypesOptions, jobTypesOptions } = useGetJobTypes()

  return useMemo<FiltersConfig>(() => {
    const clientPartnersOptions = [...ADDITIONAL_OPTIONS, ...clientPartners]
    const jobClaimersOptions = [...ADDITIONAL_OPTIONS, ...jobClaimers]
    const talentSpecialistsOptions = [
      ...ADDITIONAL_OPTIONS,
      ...talentSpecialists
    ]
    const companiesOptions = [NOT_SELECTED_OPTION, ...companies]

    return [
      [
        {
          type: FilterConfigType.SELECT,
          name: 'claimer_id',
          label: 'Job Claimer',
          options: jobClaimersOptions,
          loading: loadingSourcingRequestFilterOptions
        },
        {
          type: FilterConfigType.SELECT,
          name: 'talent_specialist_id',
          label: 'Talent Specialist',
          options: talentSpecialistsOptions,
          loading: loadingSourcingRequestFilterOptions
        }
      ],
      [
        {
          type: FilterConfigType.SELECT,
          name: 'company_id',
          label: 'Company',
          options: companiesOptions,
          loading: loadingSourcingRequestFilterOptions
        },
        {
          type: FilterConfigType.SELECT,
          name: 'client_partner_id',
          label: 'Client Partner',
          options: clientPartnersOptions,
          loading: loadingSourcingRequestFilterOptions
        }
      ],
      {
        type: FilterConfigType.RADIO,
        name: 'business_type',
        label: 'Business Type',
        options: [
          NOT_SELECTED_OPTION,
          {
            label: 'Enterprise',
            value: GenericBusinessTypes.ENTERPRISE
          },
          {
            label: 'Not Enterprise',
            value: GenericBusinessTypes.NOT_ENTERPRISE
          }
        ]
      },
      {
        type: FilterConfigType.CHECKBOX,
        name: 'statuses',
        label: 'Statuses',
        options: convertConfigurationToFilterOptions(
          SOURCING_REQUEST_STATUS_MAPPING
        )
      },
      {
        type: FilterConfigType.TYPE_SELECTOR,
        name: 'job_types',
        subCategoryName: 'specialization_ids',
        label: 'Job type',
        placeholder: NOT_SELECTED_PLACEHOLDER,
        searchPlaceholder: 'Search Talent Types',
        loading: loadingJobTypesOptions,
        options: jobTypesOptions
      },
      {
        type: FilterConfigType.CHECKBOX,
        name: 'work_types',
        label: 'Work Type',
        options: convertConfigurationToFilterOptions(JOB_WORK_TYPE_MAPPING)
      },
      {
        type: FilterConfigType.CHECKBOX,
        name: 'commitments',
        label: 'Commitments',
        options: convertConfigurationToFilterOptions(JOB_COMMITMENT_MAPPING)
      },
      {
        type: FilterConfigType.RADIO,
        name: 'linked_talents',
        label: 'Linked Talents',
        options: [
          NOT_SELECTED_OPTION,
          {
            label: 'Yes',
            value: 'yes'
          },
          {
            label: 'No',
            value: 'no'
          }
        ]
      }
    ]
  }, [
    clientPartners,
    companies,
    jobClaimers,
    jobTypesOptions,
    loadingJobTypesOptions,
    loadingSourcingRequestFilterOptions,
    talentSpecialists
  ])
}
