import { ReactNode } from 'react'
import { SearchChroniclesVariables } from '@staff-portal/chronicles'

export type PerformedActionsRouterParams = {
  entityId: string
  entityType: PerformedActionPathEntityType
}

export type PerformedActionPathEntityType =
  | 'clients'
  | 'company_representatives'
  | 'invoices'
  | 'jobs'
  | 'leaders'
  | 'opportunities'
  | 'operational_issues'
  | 'payments'
  | 'payment_groups'
  | 'project_opportunities'
  | 'smb_opportunities'
  | 'staff'
  | 'talents'
  | 'talent_partners'
  | 'referral_partners'
  | 'permissions'

export type PerformedActionEntityUseGetSearchDataParameters = {
  entityType: string
  entityId: string
  decodedEntityId: string
}

export type PerformedActionEntityUseGetSearchData = {
  entityGid: string
  searchVariables: Pick<SearchChroniclesVariables, 'feeds'>
}

export type PerformedActionEntityUseGetFiltersData = {
  component: ReactNode
  searchVariables: Pick<SearchChroniclesVariables, 'payload' | 'feeds'>
}

export type PerformedActionEntityData = {
  entityType: string
  useGetSearchData?: (
    parameters: PerformedActionEntityUseGetSearchDataParameters
  ) => PerformedActionEntityUseGetSearchData | null
  useGetFilters?: () => PerformedActionEntityUseGetFiltersData
}

export type PerformedActionEntitiesData = {
  [key in PerformedActionPathEntityType]: PerformedActionEntityData
}

export type PerformedActionEntityLink =
  | {
      url?: string
      text?: string
    }
  | undefined
