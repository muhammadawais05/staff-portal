import { MemorandumBalance } from '@staff-portal/graphql/staff'

import { getMemorandumCommentTemplates } from './getMemorandumCommentTemplates'

describe('getMemorandumCommentTemplates', () => {
  it('returns a respective map of comment templates based on template id', () => {
    expect(getMemorandumCommentTemplates([])).toEqual({})
    expect(
      getMemorandumCommentTemplates([
        {
          credit: 'credit',
          debit: 'debit',
          name: 'name',
          id: 'test'
        }
      ])
    ).toEqual({
      test: {
        [MemorandumBalance.CREDIT]: 'credit',
        [MemorandumBalance.DEBIT]: 'debit'
      }
    })
  })
})
