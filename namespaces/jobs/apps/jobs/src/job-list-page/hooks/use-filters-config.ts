/*eslint max-lines-per-function: ["error", 220]*/
import { useMemo } from 'react'
import { RoleScope } from '@staff-portal/graphql/staff'
import { decodeEntityId } from '@staff-portal/data-layer-service'
import { titleize } from '@staff-portal/string'
import {
  FiltersConfig,
  FilterConfigType,
  TIMEZONE_FILTER_OPTIONS
} from '@staff-portal/filters'
import { useGetTalentTypes } from '@staff-portal/verticals'
import { useGetParentCompaniesFilter } from '@staff-portal/clients'
import { useNotifications } from '@toptal/picasso/utils'
import { NOT_SELECTED_PLACEHOLDER } from '@staff-portal/config'

import {
  CUMULATIVE_JOB_STATUSES,
  LIMITED_JOB_STATUSES,
  WORK_TYPE_OPTIONS,
  COMMITMENT_OPTIONS,
  BOOLEAN_SELECTOR_OPTIONS,
  INCLUDE_INTERNALS_OPTIONS,
  TOPTAL_PROJECTS_OPTIONS,
  BUSINESS_TYPE_FILTER_OPTIONS
} from '../utils/get-filter-options'
import { useGetClaimersFilter } from '../hooks'
import { useViewerPermits } from '../data/get-viewer-permits'

const useFiltersConfig = () => {
  const {
    talentTypesWithSpecializations: talentTypes,
    loading: loadingTalentTypes
  } = useGetTalentTypes()

  const { options: jobClaimerOptions, loading: loadingJobClaimers } =
    useGetClaimersFilter(RoleScope.JOB_CLAIMERS)

  const { options: companyClaimerOptions, loading: loadingCompanyClaimers } =
    useGetClaimersFilter(RoleScope.COMPANY_CLAIMERS)

  const {
    options: projectSalesSpecialistOptions,
    loading: loadingProjectSalesSpecialist
  } = useGetClaimersFilter(RoleScope.COMPANY_SMB_PROJECT_SALES_SPECIALISTS)

  const {
    options: projectRelationshipManagerOptions,
    loading: loadingProjectRelationshipManager
  } = useGetClaimersFilter(RoleScope.COMPANY_SMB_PROJECT_RELATIONSHIP_MANAGERS)

  const { options: accountManagerOptions, loading: loadingAccountManager } =
    useGetClaimersFilter(RoleScope.OPPORTUNITY_SMB_ACCOUNT_MANAGERS)

  const {
    options: relationshipManagerOptions,
    loading: loadingRelationshipManager
  } = useGetClaimersFilter(RoleScope.OPPORTUNITY_SMB_RELATIONSHIP_MANAGERS)

  const { options: parentCompaniesOptions, loading: loadingParentCompanies } =
    useGetParentCompaniesFilter()

  const talentTypesOptions = useMemo(() => {
    if (!talentTypes) {
      return []
    }

    return talentTypes
      .map(({ talentType, specializations }) => ({
        id: talentType,
        label: titleize(talentType),
        children: specializations.nodes
          .map(({ id, title }) => ({
            id: decodeEntityId(id).id,
            label: title
          }))
          .sort((firstItem, secondItem) =>
            firstItem.label.localeCompare(secondItem.label)
          )
      }))
      .sort((firstItem, secondItem) =>
        firstItem.label.localeCompare(secondItem.label)
      )
  }, [talentTypes])

  const { showError } = useNotifications()
  const { permits, loading: loadingPermits } = useViewerPermits(() => {
    showError('An error occurred, unable to fetch user permits.')
  })

  const filtersConfig = useMemo<FiltersConfig>(() => {
    const filtersList: FiltersConfig = [
      [
        {
          type: FilterConfigType.SELECT,
          name: 'claimer_id',
          label: 'Job Claimer',
          options: jobClaimerOptions,
          loading: loadingJobClaimers
        },
        {
          type: FilterConfigType.SELECT,
          name: 'company_claimer_id',
          label: 'Company Claimer',
          options: companyClaimerOptions,
          loading: loadingCompanyClaimers
        }
      ],
      [
        {
          type: FilterConfigType.SELECT,
          name: 'project_sales_specialist_id',
          label: 'Project Sales Specialist',
          options: projectSalesSpecialistOptions,
          loading: loadingProjectSalesSpecialist
        },
        {
          type: FilterConfigType.SELECT,
          name: 'project_relationship_manager_id',
          label: 'Project Relationship Manager',
          options: projectRelationshipManagerOptions,
          loading: loadingProjectRelationshipManager
        }
      ],
      [
        {
          type: FilterConfigType.SELECT,
          name: 'account_manager_id',
          label: 'Account Manager',
          options: accountManagerOptions,
          loading: loadingAccountManager
        },
        {
          type: FilterConfigType.SELECT,
          name: 'relationship_manager_id',
          label: 'Relationship Manager',
          options: relationshipManagerOptions,
          loading: loadingRelationshipManager
        }
      ],
      [
        {
          type: FilterConfigType.SELECT,
          name: 'business_type',
          label: 'Business Type',
          options: BUSINESS_TYPE_FILTER_OPTIONS,
          enableReset: true,
          placeholder: NOT_SELECTED_PLACEHOLDER
        },

        {
          type: FilterConfigType.SELECT,
          name: 'parent_client_id',
          label: 'Parent Company',
          options: parentCompaniesOptions,
          loading: loadingParentCompanies,
          enableReset: true,
          placeholder: NOT_SELECTED_PLACEHOLDER
        }
      ],
      {
        type: FilterConfigType.SLIDER_RANGE,
        name: 'timezones',
        label: 'Time zone',
        options: TIMEZONE_FILTER_OPTIONS
      },
      {
        type: FilterConfigType.CHECKBOX,
        name: 'cumulative_statuses',
        label: 'Status',
        loading: loadingPermits,
        options: permits?.canViewAllJobStatuses
          ? CUMULATIVE_JOB_STATUSES
          : LIMITED_JOB_STATUSES
      },
      {
        type: FilterConfigType.TYPE_SELECTOR,
        name: 'job_types',
        subCategoryName: 'specialization_ids',
        label: 'Job type',
        placeholder: NOT_SELECTED_PLACEHOLDER,
        searchPlaceholder: 'Search Talent Types',
        loading: loadingTalentTypes,
        options: talentTypesOptions
      },
      {
        type: FilterConfigType.CHECKBOX,
        name: 'work_types',
        label: 'Work type',
        options: WORK_TYPE_OPTIONS
      },
      {
        type: FilterConfigType.CHECKBOX,
        name: 'commitments',
        label: 'Commitment',
        options: COMMITMENT_OPTIONS
      },
      {
        type: FilterConfigType.RADIO,
        name: 'in_investigation',
        label: 'In investigation',
        options: BOOLEAN_SELECTOR_OPTIONS
      },
      {
        type: FilterConfigType.RADIO,
        name: 'include_internal',
        label: 'Include internal',
        options: INCLUDE_INTERNALS_OPTIONS
      },
      {
        type: FilterConfigType.RADIO,
        name: 'skill_long_shot',
        label: 'Skill long shot',
        options: BOOLEAN_SELECTOR_OPTIONS
      },
      {
        type: FilterConfigType.RADIO,
        name: 'toptal_projects',
        label: 'Toptal projects',
        options: TOPTAL_PROJECTS_OPTIONS
      }
    ]

    return filtersList
  }, [
    loadingTalentTypes,
    talentTypesOptions,
    jobClaimerOptions,
    loadingJobClaimers,
    companyClaimerOptions,
    loadingCompanyClaimers,
    accountManagerOptions,
    loadingAccountManager,
    loadingProjectRelationshipManager,
    loadingProjectSalesSpecialist,
    loadingRelationshipManager,
    projectRelationshipManagerOptions,
    projectSalesSpecialistOptions,
    relationshipManagerOptions,
    parentCompaniesOptions,
    loadingParentCompanies,
    permits
  ])

  return { filtersConfig }
}

export default useFiltersConfig
