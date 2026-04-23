import { snakeCase } from 'lodash-es'
import { asQueryParam } from '@staff-portal/query-params-state'
import i18n from '@staff-portal/billing/src/utils/i18n'

export const PayeeRolesToGqlParam = (values: unknown) =>
  (values as string[]).map(key => key.toUpperCase())

export const PresetGqlParam = () => (value: unknown) => {
  return snakeCase(value as string).toUpperCase()
}

export const PayeeRolesQueryParam = asQueryParam({
  decode(values: string[]) {
    return values.map(key => key.toUpperCase())
  },
  encode(values: string[]) {
    return values.map(key => key.toLowerCase())
  }
})

export const PaymentListPresetQueryParam = asQueryParam({
  encode: (key: string) =>
    i18n.t(`paymentList:filters.fields.radio.preset.${key}`),
  decode: (label: string) =>
    Object.entries(
      i18n.t<string>('paymentList:filters.fields.radio.preset', {
        returnObjects: true
      })
    )
      .find(([, text]) => text === label)
      ?.shift() || ''
})
