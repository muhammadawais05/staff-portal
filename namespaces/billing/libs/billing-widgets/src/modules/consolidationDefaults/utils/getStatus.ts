import i18n from '@staff-portal/billing/src/utils/i18n'

import { GetConsolidationDefaultsQuery } from '../data/getConsolidationDefaults.graphql.types'

type ConsolidationDefault = Exclude<
  GetConsolidationDefaultsQuery['node'],
  undefined | null
>['consolidationDefaults']['nodes'][0]

type Status = {
  hasActions: boolean
  status: string
}

const baseKey = 'billingDetails:consolidationDefaults.list.status'

const getStatus = (consolidationDefault: ConsolidationDefault): Status => {
  if (consolidationDefault.deleted) {
    return { hasActions: false, status: i18n.t(`${baseKey}.deleted`) }
  }

  return consolidationDefault.engagements?.nodes?.some(
    engagement => engagement?.isWorking
  )
    ? { hasActions: true, status: i18n.t(`${baseKey}.active`) }
    : { hasActions: false, status: i18n.t(`${baseKey}.expired`) }
}

export default getStatus
