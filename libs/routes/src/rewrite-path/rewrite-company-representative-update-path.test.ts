import rewriteCompanyRepresentativeUpdatePath from './rewrite-company-representative-update-path'

describe('rewriteCompanyRepresentativeUpdatePath', () => {
  it('rewrites "/company_representatives/:id/edit" path correctly', () => {
    expect(
      rewriteCompanyRepresentativeUpdatePath({
        pathname: '/company_representatives/123/edit',
        search: '?asd=abc',
        hash: ''
      })
    ).toBe('/../company_representatives/update_profile?asd=abc&role_id=123')
  })

  it('does not rewrite other paths', () => {
    expect(
      rewriteCompanyRepresentativeUpdatePath({
        pathname: '/company_representatives/123/update',
        search: '',
        hash: ''
      })
    ).toBeUndefined()
  })
})
