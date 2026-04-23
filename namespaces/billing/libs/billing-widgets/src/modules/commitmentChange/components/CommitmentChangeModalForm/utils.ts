import { camelCase } from 'lodash-es'
import { EngagementRateMethodEnum } from '@staff-portal/graphql/staff'
import i18n from '@staff-portal/billing/src/utils/i18n'
import { EnumKeysToCamelCase } from '@staff-portal/billing/src/@types/types'

const engagementRateMethodOptions = {
  LEGACY: EngagementRateMethodEnum.LEGACY,
  DEFAULT: EngagementRateMethodEnum.DEFAULT,
  OVERRIDE_USING_MARKUP_DISCOUNT_VALUES:
    EngagementRateMethodEnum.OVERRIDE_USING_MARKUP_DISCOUNT_VALUES,
  OVERRIDE_USING_CUSTOM_VALUES:
    EngagementRateMethodEnum.OVERRIDE_USING_CUSTOM_VALUES
}

export const getRateMethodOptions = (includeLegacy: boolean) =>
  Object.entries(engagementRateMethodOptions)
    .map(([key, value]) => ({
      text: i18n.t(
        `commitment:changeModal.form.fields.rateMethod.options.${
          camelCase(key) as EnumKeysToCamelCase<typeof EngagementRateMethodEnum>
        }` as const
      ),
      value
    }))
    .filter(option => includeLegacy || option.value !== 'LEGACY')
