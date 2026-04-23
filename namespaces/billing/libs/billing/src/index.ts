import { ApolloContextEvents } from './@types/types'

export {
  useBillingBaseProps,
  shouldDisplayDiscountTierRateFields,
  RatesCalculator,
  recalculateFormRates,
  ratesFieldsNames,
  useLastField,
  isDefaultRateMethod,
  isLegacyRateMethod,
  isRateMethodOverride,
  getCommitmentOptions,
  getBillCycleOptions,
  getSortedBillCycles
} from './utils'
export { DEFAULT_DISCOUNT_MULTIPLIER } from './utils/payments-rates-table/RatesCalculator'
export type { PaymentsRatesTableValues } from './utils/payments-rates-table/types'
export {
  RateFieldOnChange,
  MarkupFieldOnChange,
  RateMethodFieldOnChange,
  FormBaseErrorContainer,
  FormInputCheckbox,
  FormInputDatePicker,
  FormInputSelect,
  FormInput,
  ModalFooter,
  BillingNotesField,
  WebResourceLinkWrapper
} from './components'
export { useExternalIntegratorContext } from './_lib'

export const PublicMessages = <const>{
  unappliedCashRecord: ApolloContextEvents.unappliedCashRecord,
  commitmentChange: ApolloContextEvents.commitmentChange
}

export type { StaffPortalRelatedTasks } from './@types/types'
export { useFormStateHandlerForPOLines } from './_lib/customHooks/purchase-order'
export { decodeId } from './_lib/helpers/apollo'
