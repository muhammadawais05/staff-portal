import { get, uniqBy } from 'lodash-es'
import { Client, Maybe, Scalars } from '@staff-portal/graphql/staff'
import { convertToJSDate } from '@staff-portal/billing/src/_lib/dateTime'

import { Engagement } from '../../../components/EngagementsTable/EngagementsTable'

export type SortField = {
  name: string
  label: string
  dataType: SortDataType
  emptyLast?: boolean
}

export type SortDataType = 'string' | 'date' | 'number'

export interface HasClient {
  client?: Maybe<Pick<Client, 'id' | 'fullName' | '_companyId'>>
  consolidationDefault?: Maybe<{ id: string }>
  isWorking?: Maybe<boolean>
  [others: string]: unknown
}

const filterWorkingOrOwningCDsEngagements =
  (consolidationDefaultId?: string) => (engagement: HasClient) =>
    engagement.consolidationDefault?.id === consolidationDefaultId ||
    engagement.isWorking

export const getSortedUniqueClientsWithId = (
  engagements: HasClient[],
  consolidationDefaultId?: string
) => {
  const clients = consolidationDefaultId
    ? engagements.filter(
        filterWorkingOrOwningCDsEngagements(consolidationDefaultId)
      )
    : engagements

  return uniqBy(
    clients.map(({ client }) => ({
      ...client,
      fullName: `${client?.fullName} #${client?._companyId}`
    })),
    'id'
  ).sort(
    (client1, client2) =>
      client1?.fullName?.localeCompare(client2?.fullName || '') || 0
  )
}

export const mapEngagementListFields = (engagement: Engagement) => ({
  ...engagement,
  effectivePurchaseOrder:
    engagement.purchaseOrderLine ?? engagement.job?.purchaseOrderLine
})

export const filterByClientsOrIds =
  (engagementIds: string[], selectedClientIds: string[]) =>
  (engagement: Engagement) =>
    engagementIds.includes(engagement.id) ||
    selectedClientIds.includes(engagement.client?.id as string)

export const filterNonWorkingForOtherCDs =
  (consolidationDefaultId?: string) =>
  (
    engagement: Engagement & {
      consolidationDefault?: {
        id: string
      }
    }
  ) =>
    engagement.isWorking ||
    (consolidationDefaultId &&
      engagement.consolidationDefault?.id === consolidationDefaultId)

export const sortByField =
  <T>(sortField: SortField) =>
  (elementA: T, elementB: T) =>
    sortByType(sortField.dataType, sortField.emptyLast)(
      get(elementA, sortField.name),
      get(elementB, sortField.name)
    )

const sortByType = (type: SortDataType, emptyLast = false) => {
  if (type === 'string') {
    return (elementA: string, elementB: string) =>
      elementA?.localeCompare(elementB)
  } else if (type === 'date') {
    return (elementA: Scalars['Date'], elementB: Scalars['Date']) =>
      convertToJSDate(elementA)?.valueOf() -
      convertToJSDate(elementB)?.valueOf()
  }

  const emptyValue = emptyLast ? Number.MAX_VALUE : 0

  return (elementA: string, elementB: string) =>
    Number(elementA || emptyValue) - Number(elementB || emptyValue)
}
