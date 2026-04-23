import { getRecipientRole } from './getRecipientRole'

describe('#getRecipientRole', () => {
  it('getRecipientRole', () => {
    expect(getRecipientRole()).toBeUndefined()
    expect(getRecipientRole({})).toBe('Company')
    expect(getRecipientRole({ roleType: 'Staff' })).toBe('Staff')
  })
})
