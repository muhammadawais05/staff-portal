import { camelCase } from 'lodash-es'
import { ClientCollectionSpeed } from '@staff-portal/graphql/staff'
import i18n from '@staff-portal/billing/src/utils/i18n'

export const collectionSpeedSelectionOptions = Object.keys(
  ClientCollectionSpeed
).map(collectionSpeed => ({
  text: i18n.t(`options:collectionSpeed.${camelCase(collectionSpeed)}`),
  value: collectionSpeed
}))
