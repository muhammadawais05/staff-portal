import { FilterConfigType, FilterConfig } from '@staff-portal/filters'
import { NOT_SELECTED_PLACEHOLDER } from '@staff-portal/config'

import { useGetClientStaffOptions } from '../data'
import {
  EXTRA_USER_OPTIONS,
  EXTRA_CLIENT_PARTNER_OPTIONS,
  EXTRA_STAFF_OPTIONS
} from '../config'

export const useStaffFilters = (): Record<string, FilterConfig> => {
  const {
    accountManagerOptions,
    claimerOptions,
    clientPartnerOptions,
    deliveryManagerOptions,
    financeTeamMemberOptions,
    initialLoading,
    projectRelationshipManagerOptions,
    relationshipManagerOptions,
    salesSpecialistsOptions,
    matchingOperationsCoordinatorsOptions
  } = useGetClientStaffOptions()

  return {
    claimer: {
      type: FilterConfigType.SELECT,
      label: 'Claimer',
      name: 'claimer_id',
      options: [...EXTRA_USER_OPTIONS, ...claimerOptions],
      loading: initialLoading,
      enableReset: true,
      placeholder: NOT_SELECTED_PLACEHOLDER
    },
    enterpriseClientPartner: {
      type: FilterConfigType.SELECT,
      label: 'Enterprise Client Partner',
      name: 'client_partner_id',
      options: [...EXTRA_CLIENT_PARTNER_OPTIONS, ...clientPartnerOptions],
      loading: initialLoading,
      enableReset: true,
      placeholder: NOT_SELECTED_PLACEHOLDER
    },
    projectSalesSpecialist: {
      type: FilterConfigType.SELECT,
      label: 'Project Sales Specialist',
      name: 'project_sales_specialist_id',
      options: [...EXTRA_STAFF_OPTIONS, ...salesSpecialistsOptions],
      loading: initialLoading,
      enableReset: true,
      placeholder: NOT_SELECTED_PLACEHOLDER
    },
    projectRelationshipManager: {
      type: FilterConfigType.SELECT,
      label: 'Project Relationship Manager',
      name: 'project_relationship_manager_id',
      options: [...EXTRA_STAFF_OPTIONS, ...projectRelationshipManagerOptions],
      loading: initialLoading,
      enableReset: true,
      placeholder: NOT_SELECTED_PLACEHOLDER
    },
    relationshipManager: {
      type: FilterConfigType.SELECT,
      label: 'Relationship Manager',
      name: 'relationship_manager_id',
      options: [...EXTRA_STAFF_OPTIONS, ...relationshipManagerOptions],
      loading: initialLoading,
      enableReset: true,
      placeholder: NOT_SELECTED_PLACEHOLDER
    },
    matchingOperationsCoordinator: {
      type: FilterConfigType.SELECT,
      label: 'Matching Operations Coordinator',
      name: 'matching_operations_coordinator_id',
      options: [
        ...EXTRA_STAFF_OPTIONS,
        ...matchingOperationsCoordinatorsOptions
      ],
      loading: initialLoading,
      enableReset: true,
      placeholder: NOT_SELECTED_PLACEHOLDER
    },
    accountManager: {
      type: FilterConfigType.SELECT,
      label: 'Account Manager',
      name: 'account_manager_id',
      options: [...EXTRA_STAFF_OPTIONS, ...accountManagerOptions],
      loading: initialLoading,
      enableReset: true,
      placeholder: NOT_SELECTED_PLACEHOLDER
    },
    deliveryManager: {
      type: FilterConfigType.SELECT,
      label: 'Delivery Manager',
      name: 'project_delivery_manager_id',
      options: [...EXTRA_STAFF_OPTIONS, ...deliveryManagerOptions],
      loading: initialLoading,
      enableReset: true,
      placeholder: NOT_SELECTED_PLACEHOLDER
    },
    financeTeamMember: {
      type: FilterConfigType.SELECT,
      label: 'Finance Team Member',
      name: 'finance_team_member_id',
      options: financeTeamMemberOptions,
      loading: initialLoading,
      enableReset: true,
      placeholder: NOT_SELECTED_PLACEHOLDER
    }
  }
}
