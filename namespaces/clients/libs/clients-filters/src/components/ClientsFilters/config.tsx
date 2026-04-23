import React from 'react'
import {
  SortOption,
  createInputCategory,
  SortOrder,
  createAutocompleteCategory,
  createMultiAutocompleteCategory,
  SearchBarCategory,
  searchBarQueryParam,
  GqlParams,
  SearchBarGqlParam,
  enumQueryParam,
  EnumToGqlParam,
  dateRangeQueryParam,
  DateRangeGqlParam,
  gqlIdQueryParam,
  gqlArrayIdQueryParam,
  IdGqlParam,
  SingleEnumToGqlParam,
  singleEnumQueryParam,
  booleanToGql,
  NumericGqlParam,
  SearchBarCategories,
  TimeZoneRangeGqlParam,
  IdsGqlParam,
  rangeQueryParam
} from '@staff-portal/filters'
import { QueryParamsOptions } from '@staff-portal/query-params-state'
import { DEFAULT_AUTOCOMPLETE_RESULTS_SIZE } from '@staff-portal/config'
import { AutocompleteHighlightOption } from '@staff-portal/ui'
import {
  LanguagesEdgeFragment,
  getSearchBarLanguagesAutocomplete
} from '@staff-portal/languages'
import {
  BUSINESS_TYPE_OPTIONS,
  getClientsAutocomplete,
  ClientAutocompleteEdgeFragment,
  CLIENT_TIER_OPTIONS
} from '@staff-portal/clients'
import {
  ClientSearchOrderField,
  OfacStatus,
  ClientContact,
  ClientClaimerCategory,
  ClientContract,
  ClientCumulativeStatus,
  ClientHierarchies,
  ClientJobStatus,
  ClientSalesCallPriority
} from '@staff-portal/graphql/staff'
import {
  decodeEntityId,
  encodeEntityId
} from '@staff-portal/data-layer-service'

import {
  getClientsKeyWordsAutocomplete,
  gqlIdStaffQueryParam,
  gqlIdMatchersQueryParam,
  MatcherGqlParam,
  SelectFilterOptionGqlParam,
  sortQueryParam
} from '../../utils'
import { CLIENT_PARTNER_CATEGORY_OPTIONS } from '../../config'

export const SORT_OPTIONS: SortOption[] = [
  {
    text: 'Application Date',
    value: ClientSearchOrderField.CREATED_AT,
    defaultSort: SortOrder.DESC
  },
  {
    text: 'Approval Date',
    value: ClientSearchOrderField.ACTIVATED_AT
  },
  {
    text: 'Sales Call Priority',
    value: ClientSearchOrderField.SALES_CALL_PRIORITY
  },
  {
    text: 'Last Login',
    value: ClientSearchOrderField.LAST_LOGIN
  },
  {
    text: 'Last Edited',
    value: ClientSearchOrderField.LAST_EDITED
  },
  {
    text: 'Location',
    value: ClientSearchOrderField.LOCATION
  },
  {
    text: 'Name',
    value: ClientSearchOrderField.NAME
  }
]

export const SEARCH_BAR_CATEGORIES: SearchBarCategories = [
  createMultiAutocompleteCategory<string, ClientAutocompleteEdgeFragment>({
    numberOfAutocompleteResults: DEFAULT_AUTOCOMPLETE_RESULTS_SIZE,
    name: 'keywords',
    toQueryParam: value => value,
    fromQueryParam: value => value,
    getKey: value => value,
    fromOption: ({ label, entityType }) => {
      const value = label || ''

      if (entityType === 'company') {
        const category = SEARCH_BAR_CATEGORIES.find(
          ({ name }) => name === 'names'
        ) as SearchBarCategory<string>

        return { category, value }
      }

      if (entityType === 'language') {
        const category = SEARCH_BAR_CATEGORIES.find(
          ({ name }) => name === 'languages'
        ) as SearchBarCategory<string>

        return { category, value }
      }

      const category = SEARCH_BAR_CATEGORIES.find(
        ({ name }) => name === 'keywords'
      ) as SearchBarCategory<string>

      return { category, value }
    },
    getOptions: getClientsKeyWordsAutocomplete,
    getOptionKey: ({ key }) => key,
    renderOption: ({ label, labelHighlight, nodeTypes }) => (
      <AutocompleteHighlightOption
        label={label}
        labelHighlight={labelHighlight}
        nodeTypes={nodeTypes}
        titleCase
      />
    ),
    fromInputValue: value => value,
    getBadgeLabel: value => value
  }),
  createInputCategory({ name: 'emails' }),
  createAutocompleteCategory<string, ClientAutocompleteEdgeFragment>({
    numberOfAutocompleteResults: DEFAULT_AUTOCOMPLETE_RESULTS_SIZE,
    name: 'names',
    toQueryParam: value => value,
    fromQueryParam: value => value,
    getKey: value => value,
    fromOption: ({ label }) => label || '',
    getOptions: getClientsAutocomplete,
    getOptionKey: ({ key }) => key,
    renderOption: ({ label, labelHighlight, nodeTypes }) => (
      <AutocompleteHighlightOption
        label={label}
        labelHighlight={labelHighlight}
        nodeTypes={nodeTypes}
        titleCase
      />
    ),
    fromInputValue: value => value,
    getBadgeLabel: value => value
  }),
  createInputCategory({ name: 'domains' }),
  createAutocompleteCategory<string, LanguagesEdgeFragment>({
    numberOfAutocompleteResults: DEFAULT_AUTOCOMPLETE_RESULTS_SIZE,
    name: 'languages',
    toQueryParam: value => value,
    fromQueryParam: value => value,
    getKey: value => value,
    fromOption: ({ label }) => label || '',
    getOptions: getSearchBarLanguagesAutocomplete,
    getOptionKey: ({ key }) => key,
    renderOption: ({ label, labelHighlight, nodeTypes }) => (
      <AutocompleteHighlightOption
        label={label}
        labelHighlight={labelHighlight}
        nodeTypes={nodeTypes}
        titleCase
      />
    ),
    fromInputValue: value => value,
    getBadgeLabel: value => value
  }),
  createInputCategory({
    name: 'ids',
    label: 'IDs',
    getBadgeLabel: value => decodeEntityId(value).id,
    toQueryParam: value => decodeEntityId(value).id,
    fromQueryParam: value => encodeEntityId(value, 'Client'),
    fromInputValue: value => encodeEntityId(value, 'Client')
  })
]

export const QUERY_PARAMS_CONFIG: QueryParamsOptions = {
  badges: searchBarQueryParam(SEARCH_BAR_CATEGORIES),
  talent_matchers: gqlIdMatchersQueryParam('Staff'),
  ofac_status: enumQueryParam,
  applied_on: dateRangeQueryParam,
  available_contacts: enumQueryParam,
  claimer_category: singleEnumQueryParam,
  contract: enumQueryParam,
  country_id: gqlIdQueryParam('Country'),
  cumulative_statuses: enumQueryParam,
  flag_ids: gqlArrayIdQueryParam('Flag'),
  hierarchy: enumQueryParam,
  parent_company_id: gqlIdQueryParam('Client'),
  job_statuses: enumQueryParam,
  sales_call_priority: singleEnumQueryParam,
  ratings: enumQueryParam,
  intent_score: enumQueryParam,
  lead_priorities: enumQueryParam,
  timezones: rangeQueryParam,
  claimer_id: gqlIdStaffQueryParam('Staff'),
  client_partner_id: gqlIdStaffQueryParam('Staff'),
  project_sales_specialist_id: gqlIdStaffQueryParam('Staff'),
  project_relationship_manager_id: gqlIdStaffQueryParam('Staff'),
  relationship_manager_id: gqlIdStaffQueryParam('Staff'),
  matching_operations_coordinator_id: gqlIdStaffQueryParam('Staff'),
  account_manager_id: gqlIdStaffQueryParam('Staff'),
  project_delivery_manager_id: gqlIdStaffQueryParam('Staff'),
  finance_team_member_id: gqlIdStaffQueryParam('Staff'),
  sort: sortQueryParam
}

export const GQL_PARAM_CONFIG: GqlParams = {
  badges: [SearchBarGqlParam()],
  ofac_status: [EnumToGqlParam(OfacStatus), 'ofacStatus'],
  applied_on: [DateRangeGqlParam(), 'appliedOn'],
  available_contacts: [EnumToGqlParam(ClientContact), 'availableContacts'],
  business_type: [
    label =>
      BUSINESS_TYPE_OPTIONS.find(({ text }) => label === text)?.value as string,
    'businessTypeV2'
  ],
  claimable: [booleanToGql],
  claimer_category: [
    value => SingleEnumToGqlParam(ClientClaimerCategory)(value as string),
    'claimerCategory'
  ],
  client_partner_category: [
    SelectFilterOptionGqlParam(CLIENT_PARTNER_CATEGORY_OPTIONS),
    'clientPartnerCategory'
  ],
  contract: [EnumToGqlParam(ClientContract)],
  country_id: [IdGqlParam(), 'countryId'],
  cumulative_statuses: [
    EnumToGqlParam(ClientCumulativeStatus),
    'cumulativeStatuses'
  ],
  talent_matchers: [MatcherGqlParam(), 'talentMatchers'],
  discount_eligible: [booleanToGql, 'discountEligible'],
  hierarchy: [EnumToGqlParam(ClientHierarchies)],
  in_investigation: [booleanToGql, 'inInvestigation'],
  flag_ids: [IdsGqlParam(), 'flagIds'],
  industry: [IdGqlParam()],
  intent_score: [NumericGqlParam(), 'intentScore'],
  invoicing_type: [IdGqlParam(), 'invoicingType'],
  parent_company_id: [IdGqlParam(), 'parentClientId'],
  job_statuses: [EnumToGqlParam(ClientJobStatus), 'jobStatuses'],
  lead_priorities: [NumericGqlParam(), 'leadPriorities'],
  ratings: [NumericGqlParam()],
  interested_in: [IdsGqlParam(), 'interestedIn'],
  sales_call_priority: [
    value => SingleEnumToGqlParam(ClientSalesCallPriority)(value as string),
    'salesCallPriority'
  ],
  tier: [SelectFilterOptionGqlParam(CLIENT_TIER_OPTIONS)],
  timezones: [TimeZoneRangeGqlParam()],
  claimer_id: [IdGqlParam(), 'claimerId'],
  client_partner_id: [IdGqlParam(), 'clientPartnerId'],
  project_sales_specialist_id: [IdGqlParam(), 'projectSalesSpecialistId'],
  project_relationship_manager_id: [
    IdGqlParam(),
    'projectRelationshipManagerId'
  ],
  relationship_manager_id: [IdGqlParam(), 'relationshipManagerId'],
  matching_operations_coordinator_id: [
    IdGqlParam(),
    'matchingOperationsCoordinatorId'
  ],
  account_manager_id: [IdGqlParam(), 'accountManagerId'],
  project_delivery_manager_id: [IdGqlParam(), 'projectDeliveryManagerId'],
  finance_team_member_id: [IdGqlParam(), 'financeTeamMemberId']
}
