import { getTaskCardInitialValues } from './getTaskCardInitialValues'

describe('#getTaskCardInitialValues', () => {
  it('returns parsed amount and balance type', () => {
    expect(
      getTaskCardInitialValues({
        description:
          'Review the changes of the billing cycle and issue a credit memo for the amount of $3540.0 if needed',
        id: 'VjEtVGFzay00MTA0MTUz'
      })
    ).toEqual({
      amount: '3540.00',
      balanceType: 'CREDIT'
    })
  })

  it('returns zero amount and empty balance type on empty description', () => {
    expect(
      getTaskCardInitialValues({
        description: '',
        id: 'VjEtVGFzay00MTA0MTUz'
      })
    ).toEqual({
      amount: '0.00',
      balanceType: ''
    })
  })
})
