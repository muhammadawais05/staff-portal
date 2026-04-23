type FieldName =
  | 'talentHourlyRate'
  | 'talentPartTimeRate'
  | 'talentFullTimeRate'
  | 'companyHourlyRate'
  | 'companyPartTimeRate'
  | 'companyFullTimeRate'
  | 'partTimeDiscount'
  | 'fullTimeDiscount'

const discountFieldsNames: FieldName[] = [
  'partTimeDiscount',
  'fullTimeDiscount'
]

const ratesFieldsNames: FieldName[] = [
  'talentHourlyRate',
  'talentPartTimeRate',
  'talentFullTimeRate',
  'companyHourlyRate',
  'companyPartTimeRate',
  'companyFullTimeRate',
  'partTimeDiscount',
  'fullTimeDiscount'
]

interface PaymentsRatesTableValues {
  rateMethod?: string
  rateOverrideReason?: string
  talentHourlyRate?: string
  companyHourlyRate?: string
  talentPartTimeRate?: string
  companyPartTimeRate?: string
  talentFullTimeRate?: string
  companyFullTimeRate?: string
  partTimeDiscount?: string
  fullTimeDiscount?: string
  markup?: string
}

export { ratesFieldsNames, discountFieldsNames }
export type { FieldName, PaymentsRatesTableValues }
