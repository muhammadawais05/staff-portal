import { PaymentHoldAutomaticExpiration } from '@staff-portal/graphql/staff'

import { buildPaymentHoldInput } from './build-payment-hold-input'
import { TabType } from '../types'

const TEST_DATE = '2021-03-03'

describe('buildPaymentHoldInput', () => {
  it('gives right params for Tab: Automatic, Expiration: by date', () => {
    const mutationParams = buildPaymentHoldInput(
      'talentId1',
      TabType.AUTOMATIC,
      {
        expirationType: PaymentHoldAutomaticExpiration.BY_DATE,
        expireAtThreshold: '1000',
        expireOn: TEST_DATE,
        comment: 'Test comment'
      }
    )

    expect(mutationParams).toEqual({
      talentId: 'talentId1',
      holdType: 'AUTOMATIC',
      expirationType: 'BY_DATE',
      expireOn: '2021-03-03',
      comment: 'Test comment'
    })
  })

  it('gives right params for Tab: Automatic, Expiration: by amount', () => {
    const mutationParams = buildPaymentHoldInput(
      'talentId1',
      TabType.AUTOMATIC,
      {
        expirationType: PaymentHoldAutomaticExpiration.BY_AMOUNT,
        expireAtThreshold: '1000',
        expireOn: TEST_DATE,
        comment: 'Test comment'
      }
    )

    expect(mutationParams).toEqual({
      talentId: 'talentId1',
      holdType: 'AUTOMATIC',
      expirationType: 'BY_AMOUNT',
      expireAtThreshold: '1000',
      comment: 'Test comment'
    })
  })

  it('gives right params for Tab: Manual', () => {
    const mutationParams = buildPaymentHoldInput('talentId1', TabType.MANUAL, {
      expirationType: PaymentHoldAutomaticExpiration.BY_AMOUNT,
      expireAtThreshold: '1000',
      expireOn: TEST_DATE,
      comment: 'Test comment'
    })

    expect(mutationParams).toEqual({
      talentId: 'talentId1',
      holdType: 'MANUAL',
      comment: 'Test comment'
    })
  })
})
