import rewriteCallRequestClaimPath from './rewrite-call-request-claim-path'

describe('rewriteCallRequestClaimPath', () => {
  it('rewrites "/callback_requests" path correctly', () => {
    expect(
      rewriteCallRequestClaimPath({
        pathname: '/callback_requests/123',
        search: '?modal=claim',
        hash: ''
      })
    ).toBe(
      '/callback_requests?id=123#modal=/platform/staff/callback_requests/123/claim'
    )

    expect(
      rewriteCallRequestClaimPath({
        pathname: '/callback_requests/123',
        search: '?modal=claim_other',
        hash: ''
      })
    ).toBeUndefined()
  })

  it('does not rewrite other paths', () => {
    expect(
      rewriteCallRequestClaimPath({
        pathname: '/callback/123',
        search: '?modal=claim',
        hash: ''
      })
    ).toBeUndefined()
  })
})
