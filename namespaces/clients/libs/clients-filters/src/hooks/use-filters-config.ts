import { useMemo } from 'react'
import {
  FiltersConfig,
  FilterConfigType,
  TIMEZONE_FILTER_OPTIONS
} from '@staff-portal/filters'
import { useGetCountries } from '@staff-portal/facilities'
import {
  CLIENT_STATUS_OPTIONS,
  useGetParentCompaniesFilter
} from '@staff-portal/clients'
import { OFAC_STATUS_OPTIONS } from '@staff-portal/ofac-compliance'
import {
  NOT_SELECTED_OPTION,
  NOT_SELECTED_PLACEHOLDER
} from '@staff-portal/config'

import { useGetClientsIndustries } from './use-get-client-industries'
import { useGetInterestedInOptions } from './use-get-interested-in-options'
import {
  CLIENT_CONTRACT_OPTIONS,
  CLIENT_HIERARCHY_OPTIONS,
  BOOLEAN_SELECTOR_OPTIONS,
  RATINGS_OPTIONS,
  CLIENT_JOB_STATUS_OPTIONS,
  LEAD_PRIORITIES_OPTIONS,
  LEAD_INTENT_OPTIONS,
  CLIENT_CONTACT_OPTIONS,
  SALES_CALL_PRIORITY_OPTIONS,
  CLAIMER_CATEGORY_OPTIONS,
  INVOICING_TYPE_FILTER_OPTIONS,
  CLIENT_TIER_ITEMS,
  CLIENT_PARTNER_CATEGORY_ITEMS,
  BUSINESS_TYPE_FILTER_OPTIONS
} from '../config'
import { useMatchersFilters } from './use-matcher-filters'
import { useFlagsFilter } from './use-flags-filter'
import { useStaffFilters } from './use-staff-filters'

export const useFiltersConfig = (): FiltersConfig => {
  const { countries, loading: loadingCountries } = useGetCountries()
  const { industries } = useGetClientsIndustries()
  const { interestedInOptions } = useGetInterestedInOptions()
  const matchersFilters = useMatchersFilters()
  const staffFilters = useStaffFilters()

  const countryOptions = useMemo(() => {
    if (!countries) {
      return []
    }

    return countries.map(({ id, name }) => ({
      value: id,
      label: name ?? ''
    }))
  }, [countries])

  const { options: parentCompaniesOptions, loading: loadingParentCompanies } =
    useGetParentCompaniesFilter()

  return [
    [
      {
        type: FilterConfigType.SELECT,
        label: 'Country',
        name: 'country_id',
        options: countryOptions,
        loading: loadingCountries,
        enableReset: true,
        placeholder: NOT_SELECTED_PLACEHOLDER
      }
    ],
    {
      type: FilterConfigType.DATE_RANGE,
      label: 'Applied On',
      name: 'applied_on'
    },
    ...(matchersFilters as FiltersConfig),
    [
      {
        type: FilterConfigType.SELECT,
        name: 'industry',
        label: 'Industry',
        options: industries,
        enableReset: true,
        placeholder: NOT_SELECTED_PLACEHOLDER
      },
      {
        type: FilterConfigType.SELECT,
        name: 'business_type',
        label: 'Business Type',
        options: BUSINESS_TYPE_FILTER_OPTIONS,
        enableReset: true,
        placeholder: NOT_SELECTED_PLACEHOLDER
      }
    ],
    [staffFilters.claimer, staffFilters.enterpriseClientPartner],
    [
      staffFilters.projectSalesSpecialist,
      staffFilters.projectRelationshipManager
    ],
    [
      staffFilters.relationshipManager,
      {
        type: FilterConfigType.SELECT,
        name: 'invoicing_type',
        label: 'Billing Preference',
        options: INVOICING_TYPE_FILTER_OPTIONS,
        enableReset: true,
        placeholder: NOT_SELECTED_PLACEHOLDER
      }
    ],
    [staffFilters.accountManager, staffFilters.deliveryManager],
    [
      staffFilters.financeTeamMember,
      {
        type: FilterConfigType.SELECT,
        name: 'parent_company_id',
        label: 'Parent Company',
        options: parentCompaniesOptions,
        loading: loadingParentCompanies,
        enableReset: true,
        placeholder: NOT_SELECTED_PLACEHOLDER
      }
    ],
    [staffFilters.matchingOperationsCoordinator],
    {
      type: FilterConfigType.SLIDER_RANGE,
      name: 'timezones',
      label: 'Time zone',
      options: TIMEZONE_FILTER_OPTIONS
    },
    {
      type: FilterConfigType.CHECKBOX,
      name: 'contract',
      label: 'Contract',
      options: CLIENT_CONTRACT_OPTIONS
    },
    {
      type: FilterConfigType.CHECKBOX,
      name: 'hierarchy',
      label: 'Hierarchy',
      options: CLIENT_HIERARCHY_OPTIONS
    },
    {
      type: FilterConfigType.CHECKBOX,
      name: 'ofac_status',
      label: 'OFAC status',
      options: OFAC_STATUS_OPTIONS
    },
    {
      type: FilterConfigType.RADIO,
      name: 'in_investigation',
      label: 'In investigation',
      options: [NOT_SELECTED_OPTION, ...BOOLEAN_SELECTOR_OPTIONS]
    },
    useFlagsFilter(),
    {
      type: FilterConfigType.CHECKBOX,
      name: 'cumulative_statuses',
      label: 'Status',
      options: CLIENT_STATUS_OPTIONS
    },
    {
      type: FilterConfigType.CHECKBOX,
      name: 'ratings',
      label: 'Rating',
      options: RATINGS_OPTIONS
    },
    {
      type: FilterConfigType.CHECKBOX,
      name: 'interested_in',
      label: 'Most interested in',
      options: interestedInOptions
    },
    {
      type: FilterConfigType.CHECKBOX,
      name: 'job_statuses',
      label: 'Jobs',
      options: CLIENT_JOB_STATUS_OPTIONS
    },
    {
      type: FilterConfigType.CHECKBOX,
      name: 'lead_priorities',
      label: 'Lead priorities',
      options: LEAD_PRIORITIES_OPTIONS
    },
    {
      type: FilterConfigType.CHECKBOX,
      name: 'intent_score',
      label: 'Lead Intent',
      options: LEAD_INTENT_OPTIONS
    },
    {
      type: FilterConfigType.RADIO,
      name: 'claimable',
      label: 'Claimable',
      options: [NOT_SELECTED_OPTION, ...BOOLEAN_SELECTOR_OPTIONS]
    },
    {
      type: FilterConfigType.CHECKBOX,
      name: 'available_contacts',
      label: 'Contact info',
      options: CLIENT_CONTACT_OPTIONS
    },
    {
      type: FilterConfigType.RADIO,
      name: 'sales_call_priority',
      label: 'Sales call priority',
      options: SALES_CALL_PRIORITY_OPTIONS
    },
    [
      {
        type: FilterConfigType.SELECT,
        name: 'discount_eligible',
        label: '3% discount eligible',
        options: BOOLEAN_SELECTOR_OPTIONS,
        enableReset: true,
        placeholder: NOT_SELECTED_PLACEHOLDER
      },
      {
        type: FilterConfigType.SELECT,
        name: 'tier',
        label: 'Enterprise Tier',
        options: CLIENT_TIER_ITEMS,
        enableReset: true,
        placeholder: NOT_SELECTED_PLACEHOLDER
      }
    ],
    [
      {
        type: FilterConfigType.SELECT,
        name: 'claimer_category',
        label: 'Claimer Category',
        options: CLAIMER_CATEGORY_OPTIONS,
        enableReset: true,
        placeholder: NOT_SELECTED_PLACEHOLDER
      },
      {
        type: FilterConfigType.SELECT,
        name: 'client_partner_category',
        label: 'Client Partner Category',
        options: CLIENT_PARTNER_CATEGORY_ITEMS,
        enableReset: true,
        placeholder: NOT_SELECTED_PLACEHOLDER
      }
    ]
  ]
}
