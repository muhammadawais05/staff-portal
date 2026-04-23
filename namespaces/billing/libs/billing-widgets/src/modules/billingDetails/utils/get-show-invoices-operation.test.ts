import { OperationCallableTypes } from '@staff-portal/graphql/staff'

import getShowInvoicesOperation from './get-show-invoices-operation'

describe('getShowInvoicesOperation', () => {
  describe('when `totalCount` is `undefined`', () => {
    it('returns Hidden operation object', () => {
      expect(getShowInvoicesOperation()).toEqual({
        callable: OperationCallableTypes.HIDDEN,
        messages: []
      })
    })
  })

  describe('when `totalCount` is `0`', () => {
    it('returns Disabled operation object', () => {
      expect(getShowInvoicesOperation(0)).toEqual({
        callable: OperationCallableTypes.DISABLED,
        messages: ['This company does not have any invoices.']
      })
    })
  })

  describe('when `totalCount` is larger then `0`', () => {
    it('returns Enabled operation object', () => {
      expect(getShowInvoicesOperation(15)).toEqual({
        callable: OperationCallableTypes.ENABLED,
        messages: []
      })
    })
  })
})
