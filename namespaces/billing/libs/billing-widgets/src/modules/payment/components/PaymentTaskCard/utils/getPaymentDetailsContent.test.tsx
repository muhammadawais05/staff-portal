import fixtures from '@staff-portal/billing/src/_fixtures'

import getPaymentDetailsContent from './getPaymentDetailsContent'

describe('getPaymentDetailsContent', () => {
  it('content returned properly', () => {
    // @ts-expect-error: DocumentStatus string/enum warning
    const result = getPaymentDetailsContent(fixtures.MockPayment)

    expect(result).toMatchSnapshot()
  })

  it('empty states returned properly', () => {
    const result = getPaymentDetailsContent({
      ...fixtures.MockPayment,
      // @ts-expect-error: subjectObject not matched with the predefined type
      subjectObject: undefined,
      client: undefined,
      job: undefined,
      paymentMethod: undefined,
      paymentGroup: undefined,
      createdOn: '',
      dueDate: undefined
    })

    expect(result).toMatchSnapshot()
  })

  it('paymentOnHold returned properly', () => {
    const result = getPaymentDetailsContent({
      ...fixtures.MockPayment,
      // @ts-expect-error: subjectObject not matched with the predefined type
      subjectObject: {
        activePaymentHold: {}
      }
    })

    expect(result).toMatchSnapshot()
  })
})
