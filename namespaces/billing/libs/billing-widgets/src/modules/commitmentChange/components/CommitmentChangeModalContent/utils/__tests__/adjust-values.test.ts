import { omit } from 'lodash-es'

import { adjustValues } from '../adjust-values'

const mockedChangeCommitmentFormValues = {
  canBeDiscounted: false,
  changeDate: '2020-01-01',
  commitment: 'FULL_TIME',
  companyFullTimeRate: '180',
  companyHourlyRate: '115',
  companyPartTimeRate: '65',
  defaultDiscount: 0.02,
  defaultFullTimeDiscount: 0.1,
  defaultPartTimeDiscount: '0.05',
  discountMultiplier: 0.97,
  engagementId: '123456789',
  notifyCompany: false,
  notifyTalent: false,
  talentFullTimeRate: '150',
  talentHourlyRate: '75',
  talentPartTimeRate: '35'
}

describe('#adjustValues', () => {
  it('returns filtered payload', () => {
    expect(adjustValues(mockedChangeCommitmentFormValues)).toEqual(
      omit(mockedChangeCommitmentFormValues, [
        'canBeDiscounted',
        'defaultDiscount',
        'defaultFullTimeDiscount',
        'discountMultiplier',
        'defaultPartTimeDiscount'
      ])
    )
  })
})
