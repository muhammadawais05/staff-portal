import { getRoleTypeText } from './get-role-type-text'

describe('getRoleTypeText', () => {
  it('returns formatted role type text for type with a single CamelCase part', () => {
    const type = 'Finance'

    expect(getRoleTypeText(type)).toBe('Finance')
  })

  it('returns formatted role type text for type with a few CamelCase parts', () => {
    const type = 'FinanceExpert'

    expect(getRoleTypeText(type)).toBe('Finance Expert')
  })

  it('returns formatted role type text for type with a single lowercase part', () => {
    const type = 'finance'

    expect(getRoleTypeText(type)).toBe('Finance')
  })

  it('returns formatted role type text for type with a few lowercase parts', () => {
    const type = 'finance expert'

    expect(getRoleTypeText(type)).toBe('Finance Expert')
  })

  it('returns formatted role type text for type with a lower snake case', () => {
    const type = 'finance_expert'

    expect(getRoleTypeText(type)).toBe('Finance Expert')
  })

  it('returns formatted role title', () => {
    const roleTitle = 'TopScreen'

    expect(getRoleTypeText(null, { roleTitle })).toBe('TopScreen')
  })

  it('returns empty string when type blank', () => {
    expect(getRoleTypeText('')).toBe('')
    expect(getRoleTypeText(null)).toBe('')
    expect(getRoleTypeText(undefined)).toBe('')
  })
})
