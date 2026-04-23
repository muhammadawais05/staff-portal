type FieldName =
  | 'talentHourlyRate'
  | 'talentPartTimeRate'
  | 'talentFullTimeRate'
  | 'companyHourlyRate'
  | 'companyPartTimeRate'
  | 'companyFullTimeRate'
  | 'partTimeDiscount'
  | 'fullTimeDiscount'

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

export { FieldName, ratesFieldsNames }
