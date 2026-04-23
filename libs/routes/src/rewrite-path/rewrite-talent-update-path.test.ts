import rewriteTalentUpdatePath from './rewrite-talent-update-path'

describe('rewriteTalentUpdatePath', () => {
  it('rewrites "/talents/:id/edit" path correctly', () => {
    expect(
      rewriteTalentUpdatePath({
        pathname: '/talents/123/edit',
        search: '?asd=abc',
        hash: ''
      })
    ).toBe('/../talents/update_profile?asd=abc&role_id=123')
  })

  it('does not rewrite other paths', () => {
    expect(
      rewriteTalentUpdatePath({
        pathname: '/talents/123/update',
        search: '',
        hash: ''
      })
    ).toBeUndefined()
  })
})
