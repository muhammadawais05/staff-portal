import adjustValues from './adjustValues'

jest.mock('../../../../components/ApplyUnallocatedMemorandumsForm')

describe('ApplyUnallocatedMemorandumsContent', () => {
  describe('#adjustValues', () => {
    it('remove `creditMemorandums` and `debitMemorandums` props', () => {
      const formValues = {
        creditMemorandums: [],
        debitMemorandums: [],
        paymentGroupId: 'id',
        memorandumIdsToAllocate: []
      }

      expect(adjustValues(formValues)).toEqual({
        paymentGroupId: 'id',
        memorandumIdsToAllocate: []
      })
    })

    it('concatenates `creditMemorandums` and `debitMemorandums` to `memorandumIdsToAllocate`', () => {
      const formValues = {
        creditMemorandums: ['creditMemo1'],
        debitMemorandums: ['debitMemo1', 'debitMemo2'],
        paymentGroupId: 'id',
        memorandumIdsToAllocate: []
      }

      expect(adjustValues(formValues)).toEqual({
        paymentGroupId: 'id',
        memorandumIdsToAllocate: ['creditMemo1', 'debitMemo1', 'debitMemo2']
      })
    })
  })
})
