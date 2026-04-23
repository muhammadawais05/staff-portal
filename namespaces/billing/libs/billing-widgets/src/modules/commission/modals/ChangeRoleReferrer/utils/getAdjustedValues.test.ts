import getAdjustedValues from './getAdjustedValues'

const formValidInput = {
  clientMutationId: 'exampleClientMutationId',
  comment: 'example string',
  referrerId: 'dfg456',
  roleOrClientId: 'exampleRoleOrClientId'
}

describe('#getAdjustedValues', () => {
  it('returns clean form payload', () => {
    expect(
      getAdjustedValues({ ...formValidInput, referrerId__fake: 'abc123' })
    ).toEqual(formValidInput)
  })
})
