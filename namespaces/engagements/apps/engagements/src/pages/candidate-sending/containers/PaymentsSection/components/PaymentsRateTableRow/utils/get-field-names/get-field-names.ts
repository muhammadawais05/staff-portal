import { EngagementCommitmentEnum } from '@staff-portal/graphql/staff'

const talentMap = {
  [EngagementCommitmentEnum.FULL_TIME]: 'talentFullTimeRate',
  [EngagementCommitmentEnum.PART_TIME]: 'talentPartTimeRate',
  [EngagementCommitmentEnum.HOURLY]: 'talentHourlyRate'
}
const companyMap = {
  [EngagementCommitmentEnum.FULL_TIME]: 'companyFullTimeRate',
  [EngagementCommitmentEnum.PART_TIME]: 'companyPartTimeRate',
  [EngagementCommitmentEnum.HOURLY]: 'companyHourlyRate'
}
const discountMap = {
  [EngagementCommitmentEnum.FULL_TIME]: 'fullTimeDiscount',
  [EngagementCommitmentEnum.PART_TIME]: 'partTimeDiscount',
  [EngagementCommitmentEnum.HOURLY]: ''
}

const getFieldNames = (type: EngagementCommitmentEnum) => {
  return {
    talentFieldName: talentMap[type],
    companyFieldName: companyMap[type],
    discountFieldName: discountMap[type]
  }
}

export default getFieldNames
