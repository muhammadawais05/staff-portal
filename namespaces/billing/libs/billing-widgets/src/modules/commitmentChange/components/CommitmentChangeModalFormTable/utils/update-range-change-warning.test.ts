import { EngagementCommitmentEnum } from '@staff-portal/graphql/staff'

import { CommitmentChangeModalFormValues } from '../../CommitmentChangeModalForm/CommitmentChangeModalForm'
import { updateRateChangeWarning } from './update-range-change-warning'

const initialValues: CommitmentChangeModalFormValues = {
  canBeDiscounted: false,
  changeDate: '2022-04-28',
  commitment: EngagementCommitmentEnum.HOURLY,
  companyFullTimeRate: '4600.00',
  companyHourlyRate: '115.00',
  companyPartTimeRate: '2300.00',
  defaultFullTimeDiscount: '0',
  defaultMarkup: '25.0',
  defaultPartTimeDiscount: '0',
  defaultUpcharge: '0',
  discountMultiplier: '1',
  engagementId: 'VjEtRW5nYWdlbWVudC00ODM4',
  fullTimeDiscount: '0',
  markup: '25',
  notifyCompany: true,
  notifyTalent: true,
  partTimeDiscount: '0',
  rateMethod: 'DEFAULT',
  rateOverrideReason: '',
  talentFullTimeRate: '3600.00',
  talentHourlyRate: '90.00',
  talentPartTimeRate: '1800.00'
}
const setRateValueChangedMock = jest.fn()

describe('updateRateChangeWarning', () => {
  it('detects when values have changed', () => {
    let newValues = { ...initialValues }

    updateRateChangeWarning(newValues, initialValues, setRateValueChangedMock)

    expect(setRateValueChangedMock).toHaveBeenCalledWith(false)

    newValues = { ...initialValues, talentHourlyRate: '80.00' }
    updateRateChangeWarning(newValues, initialValues, setRateValueChangedMock)

    expect(setRateValueChangedMock).toHaveBeenCalledWith(true)

    newValues = { ...initialValues, markup: '24' }
    updateRateChangeWarning(newValues, initialValues, setRateValueChangedMock)

    expect(setRateValueChangedMock).toHaveBeenCalledWith(true)
  })
})
