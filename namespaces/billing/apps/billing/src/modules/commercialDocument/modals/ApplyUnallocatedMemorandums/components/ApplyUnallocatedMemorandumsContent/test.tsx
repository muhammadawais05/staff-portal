import adjustValues from './adjustValues'
import validator from './validator'

jest.mock('../../../../components/ApplyUnallocatedMemorandumsForm')

describe('ApplyUnallocatedMemorandumsContent', () => {
  describe('#adjustValues', () => {
    it('remove `creditMemorandums` and `debitMemorandums` props', () => {
      const formValues = {
        applyPrepayments: false,
        creditMemorandums: [],
        debitMemorandums: [],
        invoiceId: 'id',
        memorandumIdsToAllocate: []
      }

      expect(adjustValues(formValues)).toEqual({
        applyPrepayments: false,
        invoiceId: 'id',
        memorandumIdsToAllocate: []
      })
    })

    it('concatenates `creditMemorandums` and `debitMemorandums` to `memorandumIdsToAllocate`', () => {
      const formValues = {
        applyPrepayments: false,
        creditMemorandums: ['creditMemo1'],
        debitMemorandums: ['debitMemo1', 'debitMemo2'],
        invoiceId: 'id',
        memorandumIdsToAllocate: []
      }

      expect(adjustValues(formValues)).toEqual({
        applyPrepayments: false,
        invoiceId: 'id',
        memorandumIdsToAllocate: ['creditMemo1', 'debitMemo1', 'debitMemo2']
      })
    })
  })

  describe.each([
    [
      { applyPrepayments: false, memorandumIdsToAllocate: [] },
      {
        'FINAL_FORM/form-error': 'At least one item must be selected.'
      }
    ],
    [{ applyPrepayments: true, memorandumIdsToAllocate: [] }, {}],
    [{ applyPrepayments: false, memorandumIdsToAllocate: ['abc123'] }, {}],
    [{ applyPrepayments: true, memorandumIdsToAllocate: ['abc123'] }, {}]
  ])('#validator', (values, error) => {
    describe(`when values are ${JSON.stringify(values)}`, () => {
      it('renders error', () => {
        expect(validator(values)).toEqual(error)
      })
    })
  })
})
