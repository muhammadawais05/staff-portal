import * as paymentListHeaderUtils from './'

describe('paymentListUpdateEvents', () => {
  it('return the following list', () => {
    expect(paymentListHeaderUtils.paymentListUpdateEvents).toEqual([
      { metaData: 'payment:create-group' },
      { metaData: 'payment:multiple-pay' },
      { metaData: 'payment:list-download-payments-from-search' }
    ])
  })
})
