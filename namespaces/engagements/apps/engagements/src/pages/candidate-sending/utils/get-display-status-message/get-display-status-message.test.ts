import getDisplayStatusMessage from './get-display-status-message'

describe('getDisplayStatusMessage', () => {
  describe('when `hasUnpaidDepositInvoices` is `false`', () => {
    it('returns `false`', () => {
      expect(
        getDisplayStatusMessage({ hasUnpaidDepositInvoices: false })
      ).toBeFalsy()
    })
  })

  describe('when `hasUnpaidDepositInvoices` is `true``', () => {
    it('returns proper text', () => {
      expect(
        getDisplayStatusMessage({ hasUnpaidDepositInvoices: true })
      ).toBeFalsy()
    })
  })

  it.each([
    [{ hasUnpaidDepositInvoices: false }, false],
    [{ hasUnpaidDepositInvoices: true }, false],
    [
      {
        hasUnpaidDepositInvoices: true,
        availablePrepaymentBalanceNullable: '100',
        minimumClientCreditRequired: '80'
      },
      false
    ],
    [
      {
        hasUnpaidDepositInvoices: true,
        availablePrepaymentBalanceNullable: '100',
        minimumClientCreditRequired: '120'
      },
      true
    ]
  ])('returns correct value', (options, result) => {
    expect(getDisplayStatusMessage(options)).toBe(result)
  })
})
