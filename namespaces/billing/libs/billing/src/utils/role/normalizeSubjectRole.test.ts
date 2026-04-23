import { normalizeSubjectRole } from './normalizeSubjectRole'

describe('#normalizeSubjectRole', () => {
  it('returns empty role as a Company', () => {
    expect(normalizeSubjectRole()).toBe('Company')
  })

  it('returns valid transformation for known role', () => {
    expect(normalizeSubjectRole({ roleType: 'talent' })).toBe('Talent')
  })
})
