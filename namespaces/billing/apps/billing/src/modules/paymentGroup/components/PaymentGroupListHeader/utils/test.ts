import * as paymentGroupListHeaderUtils from './'

describe('paymentListUpdateEvents', () => {
  it('return the following list', () => {
    expect(paymentGroupListHeaderUtils.paymentGroupListUpdateEvents).toEqual([
      { metaData: 'paymentGroups:multiple-pay' }
    ])
  })
})
